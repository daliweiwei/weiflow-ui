/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/14 9:31.
 */

import service from "./request";

// GET 请求
export const GET = (url, params, config = {}) =>
  service.get(url, { params, ...config });

// POST 请求
export const POST = (url, data, config = {}) => service.post(url, data, config);

// POST Blob 请求
export const blobPOST = (url, params = {}) =>
  service.post(url, params, { responseType: "blob" });

// PUT 请求
export const PUT = (url, data) => service.put(url, data);

// DELETE 请求
export const DELETE = (url, params) => service.delete(url, { params });
