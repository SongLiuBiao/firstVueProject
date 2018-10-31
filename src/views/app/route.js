import {
  Project,
  LoanRecord,
  LoanDetail,
  Safety,
  Lend
} from "@/routers/common";

export default [
  {
    path: "/app/bid-project",
    name: "bid-project",
    meta: { title: "项目详情" },
    component: Project
  },
  {
    path: "/app/safety",
    name: "safety",
    meta: { title: "安全保障" },
    component: Safety
  },
  {
    path: "/app/lend",
    name: "lend",
    meta: {
      title: "出借人"
    },
    component: Lend
  },
  {
    path: "/app/loan-record",
    name: "loan-record",
    meta: {
      title: "借款人列表"
    },
    component: LoanRecord
  },
  {
    path: "/app/loan-detail",
    name: "loan-detail",
    meta: { title: "借款详情" },
    component: LoanDetail
  },
  {
    path: "/app/risk",
    name: "app-risk",
    meta: {
      title: "风险提示"
    },
    component: () =>
      import(/* webpackChunkName: "app-risk" */ "./invest/Rask.vue")
  },
  {
    path: "/app/protocol/register",
    name: "app-protocol-register",
    meta: {
      title: "微金石用户服务协议"
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-register" */ "./protocol/Register.vue")
  },
  {
    path: "/app/protocol/ser-list",
    name: "app-protocol-ser-list",
    meta: {
      title: "服务协议"
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-ser-list" */ "./protocol/SerList.vue")
  },
  {
    path: "/app/protocol/investdeal",
    name: "app-protocol-investdeal",
    meta: {
      title: ""
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-investdeal" */ "./protocol/Investdeal.vue")
  },
  {
    path: "/app/protocol/lend-deal",
    name: "app-protocol-lend-deal",
    meta: {
      title: "借款服务协议"
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-investdeal" */ "./protocol/LendDeal.vue")
  },
  {
    path: "/app/protocol/entrust",
    name: "app-protocol-entrust",
    meta: {
      title: "授权委托书"
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-investdeal" */ "./protocol/Entrust.vue")
  },
  {
    path: "/app/protocol/apple-privacy",
    name: "app-protocol-apple-privacy",
    meta: {
      title: "微金石用户隐私协议"
    },
    component: () =>
      import(/* webpackChunkName: "app-protocol-apple-privacy" */ "./protocol/ApplePrivacy.vue")
  },
  {
    path: "/app/faq",
    name: "app-faq",
    meta: {
      title: "常见问题"
    },
    component: () =>
      import(/* webpackChunkName: "app-faq" */ "./invest/Faq.vue")
  },
  {
    path: "/app/winfo",
    name: "app-winfo",
    meta: {
      title: "计划介绍"
    },
    component: () =>
      import(/* webpackChunkName: "app-winfo" */ "./invest/Plan.vue")
  },
  {
    path: "/app/plan-risk",
    name: "app-plan-risk",
    meta: {
      title: "计划介绍"
    },
    component: () =>
      import(/* webpackChunkName: "app-plan-risk" */ "./invest/PlanRisk.vue")
  },
  {
    path: "/app/account/auth",
    name: "app-account-auth",
    meta: {
      title: "开通授权"
    },
    component: () =>
      import(/* webpackChunkName: "app-account-auth" */ "./account/Auth.vue")
  },
  {
    path: "/app/notice",
    name: "notice",
    meta: { title: "官方公告" },
    component: () =>
      import(/* webpackChunkName: "notice" */ "./message/NoticeList.vue")
  },
  {
    path: "/app/news",
    name: "news",
    meta: {
      title: "公司动态"
    },
    component: () => import(/* webpackChunkName: "news" */ "./message/News.vue")
  },
  {
    path: "/app/news-detail",
    name: "news-detail",
    meta: { title: "公司动态详情" },
    component: () =>
      import(/* webpackChunkName: "news-detail" */ "./message/NewsDetail.vue")
  },
  {
    path: "/app/activity",
    name: "activity",
    meta: { title: "精彩活动" },
    component: () =>
      import(/* webpackChunkName: "activity" */ "./message/Activity.vue")
  },
  {
    path: "/app/activity-default",
    name: "activity-default",
    meta: { title: "页面找不到了" },
    component: () =>
      import(/* webpackChunkName: "activity-default" */ "./message/ActivityDefault.vue")
  }
];
