import Vue from "vue";
import App from "./App.vue";
import router from "./routers/index";
import "normalize.css";
import AlloyLever from "alloylever";
import Axios from "./lib/http";
import { getUrlParams, getUrlArrayObj,Toast } from "./lib/utils";
import Bridge from "./lib/bridge";
import InfiniteScroll from "./plugins/infinite-scroll";
import "./lib/iconfont";
import "./views/activity/css/schedule.css"
import store from "./store";

Vue.use(InfiniteScroll);
Vue.prototype.$toast = Toast;
Vue.prototype.$bridge = Bridge;
Vue.prototype.$getUrlParams = getUrlParams;
Vue.prototype.$getUrlArrayObj = getUrlArrayObj;
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

AlloyLever.config({
  cdn: "//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js",
  reportUrl: "//www.weijinshi.com/jsError", //错误上报地址
  reportPrefix: "wjs-app",
  reportKey: "js-error-msg"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
