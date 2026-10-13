/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/6 11:29.
 */
import {setConfig} from "./config/index";

import {GET, POST, PUT, DELETE} from "./utils/fetch";
import {calcTableHeightByData} from "./utils/table";

import pkg from "../package.json";

const version = pkg.version;
import "./styles/wl-ui.scss";


import WlAmountInput from './common/wl-amount-input'
import WlBarCode from './common/wl-barcode'
import WlButton from './common/wl-button'
import WlCard from './common/wl-card'
import WlDbClickEdit from './common/wl-dbClick-edit'
import WlDictTag from './common/wl-dict-tag'
import WlMultipleChoice from './common/wl-multiple-choice'
import WlPagination from './common/wl-pagination'
import WlQrCode from './common/wl-qrcode'
import WlSelect from './common/wl-select'
import WlSelectTable from './common/wl-select-table'
import WlVirtualSelect from './common/wl-virtual-select'

const components = [
    WlAmountInput,
    WlBarCode,
    WlButton,
    WlCard,
    WlDbClickEdit,
    WlDictTag,
    WlMultipleChoice,
    WlPagination,
    WlQrCode,
    WlSelect,
    WlSelectTable,
    WlVirtualSelect,
]
// WeiFlowUI
const install = function (Vue, opts = {}) {
    if (opts.size || opts.zIndex) {
        Vue.prototype.$ELEMENT = {
            size: opts.size || '',
            zIndex: opts.zIndex || 2000,
        }
    }
    // 注入 i18n 翻译方法
    if (opts.i18n && typeof opts.i18n.t === "function") {
        Vue.prototype.$t = opts.i18n.t.bind(opts.i18n);
        if (typeof opts.i18n.te === "function") {
            Vue.prototype.$te = opts.i18n.te.bind(opts.i18n);
        }
    } else {
        // 提供默认的 $t 方法，直接返回 key
        Vue.prototype.$t = (key) => key;
    }

    setConfig({
        baseURL: opts.baseURL || "",
        accessPath: opts.accessPath || "",
        version: opts.version || "",
        logout: opts.logout || null,
        clearLocal: opts.clearLocal || null,
        getToken: opts.getToken || null,
        getUserInfo: opts.getUserInfo || null,
        store: opts.store || null,
        methods: opts.methods || {}
    });

    components.forEach((component) => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$http = {GET, POST, PUT, DELETE};
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {WlButton, WlSelect,}

export {GET, POST, PUT, DELETE, calcTableHeightByData};

export {getConfig, getConfigItem} from "./config/index";

export default {
    version,
    install,
    // 组件
    WlAmountInput,
    WlBarCode,
    WlButton,
    WlCard,
    WlDbClickEdit,
    WlDictTag,
    WlMultipleChoice,
    WlPagination,
    WlQrCode,
    WlSelect,
    WlSelectTable,
    WlVirtualSelect,
    // 请求方法
    GET,
    POST,
    PUT,
    DELETE,
    calcTableHeightByData
}
