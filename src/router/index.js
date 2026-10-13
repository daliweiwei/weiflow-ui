import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/HomeView.vue")
    },
    {
        path: "/install",
        name: "install",
        component: () => import("../views/InstallView.vue")
    },
    {
        path: "/uiView",
        name: "uiView",
        component: () => import("../views/Uiview.vue")
    },
    {
        path: "/common",
        name: "common",
        component: () => import("../views/componentView.vue")
    },
    {
        path: "/barCode",
        name: "barCode",
        component: () => import("../views/BarCodeView.vue")
    },
    {
        path: "/qrCode",
        name: "qrCode",
        component: () => import("../views/QrCodeView.vue")
    },
    {
        path: "/virtualSelect",
        name: "virtualSelect",
        component: () => import("../views/VirtualSelectView.vue")
    },
    {
        path: "/fault",
        name: "fault",
        component: () => import("../views/FaultView.vue")
    },
    {
        path: "/form",
        name: "form",
        component: () => import("../views/FormView.vue")
    },
    {
        path: "/dialog",
        name: "dialog",
        component: () => import("../views/DialogView.vue")
    },


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
