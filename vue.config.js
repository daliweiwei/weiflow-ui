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
});
