<template>
      <view-box class="invest-container">
          <w-header slot="header"></w-header>
            <nav class="detail-menu">
               <a :href="redirctUrl('/wx/invest/investwechat.html')">标的详情</a>
               <router-link :to="'/wx/invest/bid-project?bidIdSign='+bidIdSign+'&btype='+btype">项目详情</router-link>
               <a :class="{active: isActive}" href="javascript:;" @click="goLoanInfo">借款信息</a>
               <router-link :to="'/wx/invest/safety?bidIdSign='+bidIdSign+'&btype='+btype">安全保障</router-link>
               <router-link :to="'/wx/invest/lend?bidIdSign='+bidIdSign+'&btype='+btype">出借记录</router-link>
            </nav>
            <div class="box-center">
                <router-view></router-view>
            </div>
            <w-footer></w-footer>
      </view-box>
    
</template>

<script>
import WHeader from "@/components/Header.vue";
import ViewBox from "@/components/ViewBox.vue";
import WFooter from "@/components/Footer.vue";
export default {
  data() {
    return {
      bidIdSign: "",
      btype: "",
      bidId: "",
      isActive: false
    };
  },
  created() {
    this.bidIdSign = this.$getUrlParams("bidIdSign");
    this.btype = this.$getUrlParams("btype");
    this.bidId = this.$getUrlParams("bidId");
    let token = this.$getUrlParams("token");
    let bid = this.$getUrlParams("bidId");
    if (token) {
      this.$store.commit("setLoginStatus", token);
    }
    if (bid) {
      localStorage.setItem("bidId", bid);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (
        to.name === "invest/loan-detail" ||
        to.name === "invest/loan-record"
      ) {
        vm.isActive = true;
      } else {
        vm.isActive = false;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === "invest/loan-detail" || to.name === "invest/loan-record") {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
    next();
  },
  methods: {
    redirctUrl(url) {
      let bidId = localStorage.getItem("bidId");
      return `${process.env.VUE_APP_WX_URL}${url}?bidId=${bidId}`;
    },
    goLoanInfo() {
      let path = "";
      if (this.btype == 0) {
        path = "/wx/invest/loan-record"; // 自然人
      } else {
        path = "/wx/invest/loan-detail"; // 个体户和企业
      }
      this.$router.push({
        path: path,
        query: {
          btype: this.btype,
          bidIdSign: this.bidIdSign
        }
      });
    }
  },
  components: {
    ViewBox,
    WHeader,
    WFooter
  }
};
</script>
<style scoped lang="less">
@import "~@/styles/color";
.box-center {
  min-height: 970px;
}
.invest-container {
  .detail-menu {
    height: 94px;
    box-sizing: border-box;
    padding: 0 38px;
    line-height: 94px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    .router-link-active,
    .active {
      border-bottom: 6px solid #5b71f9;
      color: #5b71f9;
      text-decoration: none;
    }

    a {
      font-size: 28px;
      color: #888888;
    }
  }
}
</style>
