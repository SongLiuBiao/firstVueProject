import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    user: null
  },
  getters: {
    isLogin: state => {
      console.log("getters:", state.login);
      console.log("getters-token:", localStorage.getItem("token"));
      if (state.login || localStorage.getItem("token")) {
        return true;
      }
      return false;
    }
  },
  mutations: {
    setLoginStatus(state, value) {
      state.user = value;
      state.login = true;
      localStorage.setItem("token", value);
    },
    removeLoginStatus(state) {
      state.user = null;
      state.login = false;
      localStorage.removeItem("token");
    }
  },
  actions: {}
});
