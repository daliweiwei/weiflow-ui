/**
 * Created by liweiliang 406320591@QQ.com on 2022/10/14 15:16.
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import enLocale from "./lang/enLocale";
import zhLocale from "./lang/zhLocale";

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
};

/**
 * i18n 配置
 * @param locale 本地化语言
 * @param fallback 回退语言
 * @returns {VueI18n}
 */
function initI18n(locale, fallback) {
  Vue.use(VueI18n);
  let i18nOptions = {
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: true,
    messages,
  };
  return new VueI18n(i18nOptions);
}

export { initI18n };
