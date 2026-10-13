const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    css: {
        extract: true,
        loaderOptions: {
            sass: {
                api: "modern",
            },
            scss: {
                api: "modern",
            },
        },
    },
    productionSourceMap: false,
    configureWebpack: {
        output: {
            libraryTarget: "umd",
            libraryExport: "default",
            umdNamedDefine: true
        },
        externals: {
            vue: {
                commonjs: "vue",
                commonjs2: "vue",
                amd: "Vue",
                root: "Vue"
            },
            vuex: {
                commonjs: "vuex",
                commonjs2: "vuex",
                amd: "Vuex",
                root: "Vuex"
            },
            "element-ui": {
                commonjs: "element-ui",
                commonjs2: "element-ui",
                amd: "ELEMENT",
                root: "ELEMENT"
            },
            axios: {
                commonjs: "axios",
                commonjs2: "axios",
                amd: "axios",
                root: "axios"
            },
            "js-cookie": {
                commonjs: "js-cookie",
                commonjs2: "js-cookie",
                amd: "Cookies",
                root: "Cookies"
            },
            "vue-i18n": {
                commonjs: "vue-i18n",
                commonjs2: "vue-i18n",
                amd: "VueI18n",
                root: "VueI18n"
            },
            "vue-virtual-scroller": {
                commonjs: "vue-virtual-scroller",
                commonjs2: "vue-virtual-scroller",
                amd: "VueVirtualScroller",
                root: "VueVirtualScroller"
            },
            jsbarcode: {
                commonjs: "jsbarcode",
                commonjs2: "jsbarcode",
                amd: "JsBarcode",
                root: "JsBarcode"
            },
            qrcode: {
                commonjs: "qrcode",
                commonjs2: "qrcode",
                amd: "QRCode",
                root: "QRCode"
            }
        }
    }
});
