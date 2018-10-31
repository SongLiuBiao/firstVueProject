export default [
  {
    path: "/activity01",
    name: "activity01",
    meta: {
      title: "活动01"
    },
    component: () =>
      import(/* webpackChunkName: "activity01" */ "./activity01.vue")
  },
  {
    path: "/select02",
    name: "select02",
    meta: {
      title: "微智享"
    },
    component: () =>
      import(/* webpackChunkName: "activity01" */ "../../components/select02.vue")
  },
  {
    path: "/midAutumn",
    name: "midAutumn",
    meta: {
      title: "情满中秋，月圆金石"
    },
    component: () =>
      import(/* webpackChunkName: "activity01" */ "./midAutumn.vue")
  },
  {
    path: "/midAutumn2",
    name: "midAutumn2",
    meta: {
      title: "情满中秋，月圆金石"
    },
    component: () =>
      import(/* webpackChunkName: "activity01" */ "./midAutumn2.vue")
  },
  {
    path: "/National",
    name: "National",
    meta: {
      title: "十一狂欢"
    },
    component: () =>
    import( /* webpackChunkName: "activity01" */ "./National.vue")
  },
    {
        path: "/singIn",
        name: "singIn",
        meta: { title: "签到" },
        component: () =>
            import("./singIn/home.vue")
    },
    {
        path: "/supplement",
        name: "supplement",
        meta: { title: "补签" },
        component: () =>
            import("./singIn/supplement.vue")
    },
    {
        path: "/singInResult",
        name: "singInResult",
        meta: { title: "签到" },
        component: () =>
            import("./singIn/singInResult.vue")
    },
    {
        path: "/platform",
        name: "platform",
        meta: { title: "平台简介" },
        component: () =>
            import("./singIn/platform.vue")
    },
    {
        path: "/singinShare",
        name: "singinShare",
        meta: { title: "打卡三十天，领取三十元" },
        component: () =>
            import("./singIn/singinShare.vue")
    },
    {
        path: "/singinRule",
        name: "singinRule",
        meta: { title: "活动规则" },
        component: () =>
            import("./singIn/singinRule.vue")
    },
    {
        path: "/activityVip",
        name: "activityVip",
        meta: { title: "vip专属福利" },
        component: () =>
            import("./activityVip.vue")
    }

];
