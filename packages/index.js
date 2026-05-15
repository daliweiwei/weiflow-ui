/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/6 11:29.
 */
import WlButton from './wl-button'
import WlSelect from './wl-select'

const components = [
    WlButton,
    WlSelect,
]
// WeiFlowUI
const install = function (Vue, opts = {}) {
    if (opts.size || opts.zIndex) {
        Vue.prototype.$ELEMENT = {
            size: opts.size || '',
            zIndex: opts.zIndex || 2000,
        }
    }

    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {WlButton, WlSelect,}

export default {
    version: '1.0.1',
    install,
    WlButton,
    WlSelect,
}
