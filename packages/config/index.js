/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/14 13:31.
 */

const _config = {
  baseURL: "",
  accessPath: "",
  version: "",
  store: null,
  methods: {}
};

// 初始化配置;
export function setConfig(options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    console.warn("[SiUI] setConfig 参数必须是一个对象");
    return;
  }
  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (key === "methods") {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        _config.methods = { ..._config.methods, ...value };
      } else {
        console.warn("[SiUI] setConfig: methods 必须是一个对象");
      }
    } else {
      _config[key] = options[key];
    }
  });
}

// 获取完整配置;
export function getConfig() {
  return _config;
}

// 获取单个配置项;
export function getConfigItem(key) {
  if (!Object.prototype.hasOwnProperty.call(_config, key)) {
    console.warn(`[si-ui] ⚠️ 配置项 "${key}" 不存在`);
    return undefined;
  }
  return _config[key];
}

// 调用宿主自定义方法;
export function invokeMethod(methodName, ...args) {
  const method = _config.methods[methodName];
  if (typeof method === "function") {
    return method(...args);
  }
  console.warn(`[si-ui] ⚠️ 自定义方法 "${methodName}" 未注入`);
}

// 获取 store 实例，统一校验入口
function getStore(scene) {
  const store = _config.store;
  if (!store) {
    console.warn(`[si-ui] ⚠️ store 未注入，无法执行: ${scene}`);
    return null;
  }
  return store;
}

// 获取宿主 store.state 中的值（支持嵌套路径）
export function invokeStoreState(path) {
  if (typeof path !== "string" || !path.trim()) {
    console.warn("[si-ui] ⚠️ invokeStoreState: path 必须是非空字符串");
    return undefined;
  }
  const store = getStore(`state: ${path}`);
  if (!store) return undefined;

  return path.split(".").reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined;
  }, store.state);
}

// 调用宿主 store.commit
export function invokeStoreCommit(mutation, payload) {
  const store = getStore(`commit: ${mutation}`);
  if (!store) return;
  return store.commit(mutation, payload);
}

// 调用宿主 store.dispatch
export function invokeStoreDispatch(action, payload) {
  const store = getStore(`dispatch: ${action}`);
  if (!store) return;
  return store.dispatch(action, payload);
}

// 读取宿主 store.getters
export function invokeStoreGetters(getterKey) {
  const store = getStore(`getters: ${getterKey}`);
  if (!store) return undefined;
  return store.getters[getterKey];
}
