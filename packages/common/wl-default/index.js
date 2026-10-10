/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/20 15:44.
 */
import WlDefault from "./src/main.vue";

WlDefault.install = function (Vue) {
  Vue.component(WlDefault.name, WlDefault);
};

export default WlDefault;
