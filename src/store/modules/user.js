/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/27 14:16.
 */
import {login, logout, idpToken, getTokenForMyId, getLoginByMyId} from "@/api/index";

import Cookies from "js-cookie";
// import router from "@/router";
import {accessPath, subsystemCode} from "./../../environment";

const user = {
    state: {
        token: Cookies.get("Admin-Token"),
        refreshToken: Cookies.get("refreshToken"),
        cachePermissions: Cookies.get("cachePermissions"),
        name: Cookies.get("name"),
        avatar: Cookies.get("avatar"),
        email: "",
        roles: [], //['admin']
        permissions: JSON.parse(localStorage.getItem("permissions")),
        permissionsCode: JSON.parse(localStorage.getItem("permissionsCode")),
        user: JSON.parse(Cookies.get("user-key") || '{}'),
        language: {
            [subsystemCode]: "zh"
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            Cookies.set("Admin-Token", token);
            state.token = token;
        },
        SET_CACHE_PERMISSIONS: (state, data) => {
            Cookies.set("cachePermissions", data);
            state.cachePermissions = data;
        },
        SET_REFRESH_TOKEN: (state, refreshToken) => {
            Cookies.set("refreshToken", refreshToken);
            state.refreshToken = refreshToken;
        },
        SET_USER: (state, user) => {
            Cookies.set("user-key", JSON.stringify(user));
            state.user = user;
            state.name = user.yhxm;
        },
        SET_PERMISSIONSCODE: (state, permissionsCode) => {
            state.permissionsCode = permissionsCode;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        }
    },

    actions: {
        // 获取token
        getIdpToken({commit}, params) {
            return new Promise((resolve, reject) => {
                idpToken(params)
                    .then((res) => {
                        commit("SET_TOKEN", res.result.access_token);
                        commit("SET_REFRESH_TOKEN", res.result.refresh_token);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        // 登录
        Login({commit}, userInfo) {
            let params = {
                userName: btoa(encodeURIComponent(userInfo.username.trim())),
                passWord: btoa(encodeURIComponent(userInfo.password))
            };
            return new Promise((resolve, reject) => {
                login(params)
                    .then((res) => {
                        commit("SET_CACHE_PERMISSIONS", res.result.refreshToken);
                        commit("SET_USER", res.result.user);
                        commit("SET_PERMISSIONS", res.result.permissions);
                        commit("SET_PERMISSIONSCODE", res.result.permissionsCode);
                        commit("SET_AVATAR", res.result.user.txlj);
                        Cookies.set("avatar", res.result.user.txlj);
                        Cookies.set("name", res.result.user.yhxm);
                        localStorage.setItem(
                            "permissions",
                            JSON.stringify(res.result.permissions)
                        );
                        localStorage.setItem(
                            "permissionsCode",
                            JSON.stringify(res.result.permissionsCode)
                        );
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getTokenForMyId({commit, dispatch}, token) {
            let params = {
                username: "BSCE,123",
                password: "123",
                access_token: token
            };
            getTokenForMyId(params).then((res) => {
                commit("SET_EMAIL", res.result.email);
                commit("SET_TOKEN", res.result.access_token);
                commit("SET_REFRESH_TOKEN", res.result.refresh_token);
                dispatch("getLoginByMyId");
            });
        },
        getLoginByMyId({commit, state}) {
            let params = {
                email: state.email,
                token: state.token
            };
            getLoginByMyId(params).then((res) => {
                commit("SET_CACHE_PERMISSIONS", res.result.refreshToken);
                commit("SET_USER", res.result.user);
                commit("SET_PERMISSIONS", res.result.permissions);
                commit("SET_PERMISSIONSCODE", res.result.permissionsCode);
                commit("SET_AVATAR", res.result.user.txlj);
                localStorage.setItem(
                    "permissions",
                    JSON.stringify(res.result.permissions)
                );
                localStorage.setItem(
                    "permissionsCode",
                    JSON.stringify(res.result.permissionsCode)
                );
                Cookies.set("avatar", res.result.user.txlj);
                Cookies.set("name", res.result.user.yhxm);
                // router.push("/");
            });
        },

        // 退出系统
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout({
                    access_token: state.token,
                    cachePermissions: state.cachePermissions
                })
                    .then(() => {
                        commit("SET_CACHE_PERMISSIONS", "");
                        commit("SET_TOKEN", "");
                        commit("SET_REFRESH_TOKEN", "");
                        commit("SET_ROLES", []);
                        commit("SET_PERMISSIONS", []);
                        Cookies.remove("Admin-Token");
                        Cookies.remove("user-key");
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        // 本地退出系统
        clearLocal({commit}) {
            commit("SET_CACHE_PERMISSIONS", "");
            commit("SET_TOKEN", "");
            commit("SET_REFRESH_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            Cookies.remove("Admin-Token");
            Cookies.remove("user-key");
            location.href = `${accessPath}index`;
            // Cookies.remove('Admin-Token')
        },
        getTokenForAad({commit, dispatch}, aadInfo) {
            console.info("getTokenForAad=========================");
            let info = decodeURIComponent(aadInfo);
            // let infoArr = info.split("_");
            //=====================================================================>start  2024-11-27 解决邮箱带下划线的问题
            let infoArr = info.split("_", 2); // 只分割前两次出现的下划线
            // 如果原字符串中有超过两次的下划线，则将剩余部分添加到数组末尾
            if (info.indexOf("_", infoArr[0].length + infoArr[1].length + 1) !== -1) {
                // 获取剩余部分并添加到parts数组中
                let remainingPart = info.substring(
                    infoArr[0].length + infoArr[1].length + 2
                );
                infoArr.push(remainingPart);
            }
            console.info(infoArr);
            //=====================================================================>end  2024-11-27 解决邮箱带下划线的问题

            commit("SET_EMAIL", infoArr[2]);
            commit("SET_TOKEN", infoArr[0]);
            commit("SET_REFRESH_TOKEN", infoArr[1]);
            dispatch("getLoginByMyId");
        }
    }
};

export default user;
