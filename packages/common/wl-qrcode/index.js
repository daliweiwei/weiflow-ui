/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/20 15:44.
 */
import WlQrCode from "./src/main.vue";

WlQrCode.install = function (Vue) {
  Vue.component(WlQrCode.name, WlQrCode);
};

export default WlQrCode;
