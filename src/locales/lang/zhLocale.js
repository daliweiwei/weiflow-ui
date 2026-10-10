/**
 * Created by liweiliang 406320591@QQ.com on 2022/10/17 14:11.
 */

const zhModulesFiles = require.context("./zh", true, /\.js$/);

const zhLang = zhModulesFiles.keys().reduce((modules, modulePath) => {
  const value = zhModulesFiles(modulePath);
  modules = { ...modules, ...value.default };
  return modules;
}, {});

export default zhLang;
