/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/27 14:15.
 */
import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: (state) => ({
        user: state.user,
      })
    })
  ]
});

export default store;
