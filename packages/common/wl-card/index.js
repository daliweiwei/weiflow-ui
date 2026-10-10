/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/20 15:44.
 */
import WlCard from "./src/main.vue";

WlCard.install = function (Vue) {
  Vue.component(WlCard.name, WlCard);
};

export default WlCard;
