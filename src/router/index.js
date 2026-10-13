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
    // {
    //   path: "/WeiFlowUI",
    //   name: "WeiFlowUI",
    //   component: () => import("../views/WeiFlowUIView.vue")
    // },
    // {
    //   path: "/form",
    //   name: "form",
    //   component: () => import("../views/FormView.vue")
    // },
    // {
    //   path: "/dialog",
    //   name: "dialog",
    //   component: () => import("../views/DialogView.vue")
    // },
    // {
    //   path: "/install",
    //   name: "install",
    //   component: () => import("../views/InstallView.vue")
    // },
    // {
    //   path: "/common",
    //   name: "common",
    //   component: () => import("../views/commonView.vue")
    // },
    // {
    //   path: "/bsceWorkFlow",
    //   name: "bsceWorkFlow",
    //   component: () => import("../views/bsceWorkFlowView.vue")
    // },
    // {
    //   path: "/decimal",
    //   name: "decimal",
    //   component: () => import("../views/DecimalView.vue")
    // },
    // {
    //   path: "/fault",
    //   name: "fault",
    //   component: () => import("../views/faultView.vue")
    // },
    // {
    //   path: "/demo",
    //   name: "demo",
    //   component: () => import("../views/DemoView.vue")
    // }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
