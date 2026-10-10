import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import { initI18n } from "@/locales/i18n";

const i18n = initI18n("zh", "zh");

import { baseURL, accessPath } from "./environment";
import WeiFlowUI from '../packages/index'
Vue.use(WeiFlowUI, {
  i18n,
  baseURL,
  accessPath,
  version:'lwl',
  store
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
