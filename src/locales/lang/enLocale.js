/**
 * Created by liweiliang 406320591@QQ.com on 2022/10/17 14:08.
 */

const enModulesFiles = require.context("./en", true, /\.js$/);

const enLang = enModulesFiles.keys().reduce((modules, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = enModulesFiles(modulePath);
  // modules[moduleName] = value.default
  modules = { ...modules, ...value.default };
  return modules;
}, {});

export default enLang;
