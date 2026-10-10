/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/14 9:32.
 */
import axios from "axios";
import Cookies from "js-cookie";
import { Notification, Message } from "element-ui";
import { tansParams } from "./loong";

import store from "../store";
import { baseURL, accessPath, subsystemCode } from "../environment";
let isRefreshing = false; // 标记是否正在刷新 token
let requests = []; // 存储待重发请求的数组

// 创建axios实例
const service = axios.create({
  timeout: 600000
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.baseURL = baseURL;
    if (!config.url.includes("getToken")) {
      config.headers["token"] = Cookies.get("Admin-Token");
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.resultCode || 200;

    // 获取错误信息
    let errMsg = "";
    let language = store.getters.language || "zh";
    if (language == "zh") {
      errMsg = res.data.resultDesc;
    } else {
      errMsg = res.data.resultDescEn || res.data.resultDesc;
    }

    // 二进制数据则直接返回
    // console.log(res.request.responseType, "responseType");
    if (["blob", "arraybuffer"].includes(res.request.responseType)) {
      return res;
    }

    if (
      code === 400401 &&
      !res.config.url.includes("/idp/token/refreshToken")
    ) {
      const { config } = res;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const status = await refreshToken();
          if (status) {
            let access_token = Cookies.get("Admin-Token");
            config.headers.token = access_token;
            requests.forEach((cb) => cb(access_token));
            requests = [];
            return service(config);
          } else {
            return Promise.reject(res);
          }
        } finally {
          isRefreshing = false;
        }
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token) => {
            config.headers.token = token;
            resolve(service(config));
          });
        });
      }
    } else if (code !== 200) {
      if (res.config.url.includes("/idp/token/refreshToken")) {
        setTimeout(() => {
          store.dispatch("LogOut").then(() => {
            location.href = `${accessPath}login`;
          });
        }, 600);
      } else if (res.config.url.includes("/idp/token/clearToken")) {
        setTimeout(() => {
          store.dispatch("clearLocal"); //清除本地存储
        }, 600);
      }
      Notification.error({
        title: errMsg,
        customClass: "notifyTips"
      });
      return Promise.reject(new Error(errMsg || "请求失败"));
      // return Promise.reject(new Error(errMsg))
    } else {
      return res.data;
      // return res
    }
  },
  async (error) => {
    if (!error.response) {
      let { message } = error;
      let language = store.getters.language;
      if (message == "Network Error" && language == "zh") {
        message = "后端接口连接异常";
      } else if (message.includes("timeout") && language == "zh") {
        message = "系统接口请求超时";
      }
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
    // 失败重新发送请求
    if (error.config.url.includes("/idp/token/refreshToken")) {
      store.dispatch("LogOut").then(() => {
        location.href = `${accessPath}login`;
      });
    } else if (error.config.url.includes("/idp/token/clearToken")) {
      store.dispatch("clearLocal");
    } else {
      let { message } = error.response.data;
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
  }
);

// 刷新接口
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    service
      .post(
        "/idp/token/refreshToken",
        { refresh_token: Cookies.get("refreshToken") },
        {}
      )
      .then((res) => {
        if (res.resultCode == 200) {
          let { access_token, refresh_token } = res.result;
          // Cookies.set("Admin-Token", access_token);
          // Cookies.set("refreshToken", refresh_token);
          store.commit("SET_TOKEN", access_token);
          store.commit("SET_REFRESH_TOKEN", refresh_token);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
        Message.error("抱歉，您的登录状态已失效，请重新登录！");
        setTimeout(() => {
          store.dispatch("LogOut").then(() => {
            location.href = `${accessPath}login`;
          });
        }, 600);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
};

export default service;
