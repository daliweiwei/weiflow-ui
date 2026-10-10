/**
 * Created by liweiliang 406320591@QQ.com on 2026/10/10 14:05.
 */

import { GET, POST } from "../utils/fetch";

// myId自动登录-获取token
export const getTokenForMyId = (params) =>
    POST("/idp/token/getTokenForMyId", params);

// myId自动登录-获取当前登录用户数据
export const getLoginByMyId = (params) =>
    POST("/auth/login/loginByMyId", params);

// 获取Token方法
export const idpToken = (params) => POST("/idp/token/getToken", params);

// 登录方法
export const login = (params) => POST("/auth/login/login", params);

// 退出方法
export const logout = (params) => POST("/idp/token/clearToken", params);

export const productList = (params) => POST("/customerserviceplatform/product/list", params);
