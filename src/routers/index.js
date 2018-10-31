import Vue from "vue";
import Router from "vue-router";
import wxRoute from "../views/wx/route";
import appRoute from "../views/app/route";
import activity from "../views/activity/route";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...wxRoute, ...appRoute, ...activity]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
