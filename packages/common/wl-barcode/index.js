/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/20 15:44.
 */
import WlBarCode from "./src/main.vue";

WlBarCode.install = function (Vue) {
  Vue.component(WlBarCode.name, WlBarCode);
};

export default WlBarCode;
