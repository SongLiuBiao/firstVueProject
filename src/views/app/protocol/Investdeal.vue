<template>
    <div class="contract-box">
        <div class="contract">
            <div class="contract-title">{{investDeal.title}}</div>
            <!--开始 合同编号-->
            <div class="contract-serial"></div>
            <div v-html="investDeal.content"></div>
            <!--结束 合同编号-->
        </div>
    </div>
</template>

<script>
import { getInvestdeal } from "@/api/app";
import { mBrowser } from "jrmf-utils";

export default {
  name: "investdeal",
  data() {
    return {
      investDeal: {}
    };
  },
  created() {
    let params = this.$getUrlArrayObj();
    getInvestdeal(params).then(res => {
      if (res.code === 1) {
        this.investDeal = res.data.information;
        this.UpdateTitle();
      }
    });
  },
  methods: {
    UpdateTitle() {
      let title = this.investDeal.title + "";
      if (title.indexOf("《") > -1) {
        console.log(title.length);
        title = title.substr(1, title.length - 2);
      }
      document.title = title;
      this.CallApp();
    },
    CallApp() {
      if (mBrowser.versions.android) {
        window.js_java_android.asyncDone();
      } else {
        this.$bridge.callhandler("asyncDone");
      }
    }
  }
};
</script>

<style scoped lang="less">
.contract-box {
  background-color: #fff;
  height: auto;
  min-height: 300px;
  width: 100%;
  padding: 24px;
  position: relative;
  margin: 0px auto 0;
}
.contract {
  height: auto;
  line-height: 48px;
  width: 100%;
  position: relative;
  font-size: 28px;
}
.contract-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  height: 60px;
  width: 100%;
  position: relative;
}
.contract-serial {
  font-size: 24px;
  line-height: 35px;
  color: #999;
  text-align: right;
  height: 35px;
  width: 100%;
  position: relative;
}
</style>
