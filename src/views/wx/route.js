import {
  wxHome,
  Project,
  LoanRecord,
  LoanDetail,
  Safety,
  Lend
} from "@/routers/common";

export default [
  {
    path: "/",
    name: "home",
    component: wxHome
  },
  {
    path: "/wx",
    name: "wx-home",
    meta: { title: "首页" },
    component: wxHome
  },
  {
    path: "/wx/invest",
    name: "wx/invest",
    meta: {
      title: "我要出借"
    },
    component: () =>
      import(/* webpackChunkName: "loan-record" */ "./invest/investwechat.vue"),
    children: [
      {
        path: "bid-project",
        name: "invest/bid-project",
        meta: {
          title: "项目详情"
        },
        component: Project
      },
      {
        path: "loan-record",
        name: "invest/loan-record",
        meta: {
          title: "借款信息"
        },
        component: LoanRecord
      },
      {
        path: "loan-detail",
        name: "invest/loan-detail",
        meta: { title: "借款详情" },
        component: LoanDetail
      },
      {
        path: "safety",
        name: "invest/Safety",
        meta: {
          title: "安全保障"
        },
        component: Safety
      },
      {
        path: "lend",
        name: "invest/lend",
        meta: {
          title: "出借记录"
        },
        component: Lend
      }
    ]
  }
];
