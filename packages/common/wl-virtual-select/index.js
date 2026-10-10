/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/13 11:14.
 */
import WlVirtualSelect from "./src/main.vue";

WlVirtualSelect.install = function (Vue) {
  Vue.component(WlVirtualSelect.name, WlVirtualSelect);
};

export default WlVirtualSelect;
