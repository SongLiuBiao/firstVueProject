export const wxHome = () =>
  import(/* webpackChunkName: "wx-home" */ "@/views/wx/home/Home.vue");

export const Project = () =>
  import(/* webpackChunkName: "project" */ "@/views/app/invest/Project.vue");

export const LoanRecord = () =>
  import(/* webpackChunkName: "loan-record" */ "@/views/app/invest/LoanRecord.vue");

export const LoanDetail = () =>
  import(/* webpackChunkName: "loan-detail" */ "@/views/app/invest/LoanDetail.vue");

export const Safety = () =>
  import(/* webpackChunkName: "safety" */ "@/views/app/invest/Safety.vue");

export const Lend = () =>
  import(/* webpackChunkName: "lend" */ "@/views/app/invest/Lend.vue");
