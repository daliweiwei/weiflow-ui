/**
 * Created by liweiliang 406320591@QQ.com on 2022/10/20 14:20.
 */

const env =
  process.env.NODE_ENV == "production"
    ? process.env.VUE_APP_ENV
    : process.env.NODE_ENV === "development"
      ? "dev"
      : process.env.NODE_ENV;
// console.log('envObject',process.env)
// console.log('VUE_APP_ENV',process.env.VUE_APP_ENV)
// console.log('NODE_ENV',process.env.NODE_ENV)

const serverObj = {
  // 开发环境
  dev: {
    baseURL: "https://www.baidu.com/bsceroot",
    accessPath: "/",
    subsystemCode: "lwl"
  },
  // 测试环境
  uat: {
    baseURL: "https://www.baidu.com/bsceroot",
    accessPath: "/",
    subsystemCode: "lwl"
  },
  // https生产环境
  productions: {
    baseURL: "https://www.baidu.com/bsceroot",
    accessPath: "/",
    subsystemCode: "lwl"
  }
};
module.exports = serverObj[env];
