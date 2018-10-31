<template>
    <div class="midAutumn">
        <div class="banner" >
            <img src="https://f.weijinshi.com/myoss/data/384905430C303209A5AB5C2DB086460E.png" alt="">
            <div v-if="isShow" class="luckNum">今日返现出借额仅剩：{{totalBackMoney}} 万</div>
        </div>
        <ul class="backRate_list">
            <li>9月22日返现额度 <span>{{backMoney22}}</span></li>
            <li>9月23日返现额度 <span>{{backMoney23}}</span></li>
            <li>9月24日返现额度 <span>{{backMoney24}}</span></li>
        </ul>
        <div class="rule">
            <div class="title"><span></span>中秋神秘返现福利<span></span></div>
            <div class="ruleTxt">
                <p class="line">每日限前150万出借额，均可享神秘返现，返现金额=？*出借金额*出借期限（天）/360，？将在当日剩余返现出借额为0时或当日24:00点公布。</p>
                <p class="line">？为随机值，范围1%~4%。</p>
                <p class="line">小提示：当日150万出借额满的越快，？值会越高哦。</p>
            </div>
        </div>
        <div class="rule">
            <div class="title"><span></span> 活动规则 <span></span></div>
            <div class="ruleTxt">
                <p class="line">1.	活动期间，每日限前150万出借额，均可享神秘返现；</p>
                <p class="line">2.	返现金额=？*出借金额*出借期限（天）/360；</p>
                <p class="line">3.	？将在当日剩余返现出借额为0时或当日24:00点公布。</p>
                <p class="line">4.	神秘返现活动奖励将于活动结束后，通过微信红包发放。请参与活动的用户添加微金石小微（微信号：weijinshi01）领取返现红包，返现奖励领取截止于2018年9月27日 24:00，若未在该时间前领取奖励后续奖励将不予发放。</p>
            </div>
        </div>
        <div class="tabbar">
            <!--<router-link :to="linkUrl"></router-link>-->
            <a href="javaScript:window.history.go(-1);"></a>
            <a href="javaScript:void (0);"></a>
        </div>
    </div>
</template>

<script>
import { getActivityShareInfo } from "@/api/app";
import { mBrowser } from "jrmf-utils";
import moment from "moment";
export default {
  name: "midAutumn2",
  data() {
    return {
      // linkUrl:'',
      pid: this.$route.query.pid,
      appInfo: this.$route.query._appInfo,
      userId: this.$route.query.userId, //用户ID
      recommendCode: this.$route.query.recommendCode, //邀请码（手机号）
      totalBackMoney: 100, //返现出借额度
      backMoney22: "？", //22日返现出借额度
      backMoney23: "？", //23日返现出借额度
      backMoney24: "？", //24日返现出借额度
      isShow: false //今日返现额度是否显示
    };
  },
  created() {
    this.getData();
    //如果是活动页获取分享参数
    if (!this.recommendCode && this.userId) {
      this.getShareInfo();
    }
    this.isTime();
  },
  mounted() {
    // this.linkUrl = '/midAutumn'+ window.location.search;
  },
  methods: {
    //判断今日返现出借额仅剩是否显示
    isTime() {
      if (
        moment() > moment("2018-09-22 00:00:00") &&
        moment() < moment("2018-09-25 00:00:00")
      ) {
        this.isShow = true;
      }
    },
    //获取数据
    getData() {
      this.$http.POST("/app/zhongqiuWisdom").then(res => {
        if (res.code == 1) {
          this.backMoney22 = res.isShow922 ? "1.6%" : "?";
          this.backMoney23 = res.isShow923 ? "2.3%" : "?";
          this.backMoney24 = res.isShow924 ? "1.99%" : "?";
          this.totalBackMoney = res.canAmount;
        }
      });
    },
    //获取分享参数
    getShareInfo() {
      getActivityShareInfo({ pid: this.pid, _appInfo: this.appInfo }).then(
        res => {
          if (res.code == 1) {
            this.message = res.data;
            this.clickApp(JSON.stringify(this.message));
          }
        }
      );
    },
    //分享参数传递给App
    clickApp(data) {
      if (mBrowser.versions.android) {
        window.js_java_android.setShareData(data);
      } else {
        this.$bridge.callhandler(
          "setShareData",
          data,
          function responseCallback(responseData) {
            // console.log("JS received response:", responseData);
          }
        );
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  }
};
</script>

<style scoped lang="less">
.midAutumn {
  background: #010335;
  padding-bottom: 160px;
  //banner
  .banner {
    position: relative;
    img {
      width: 100%;
    }
    .luckNum {
      width: 460px;
      height: 80px;
      position: absolute;
      line-height: 80px;
      text-align: center;
      bottom: 0;
      left: 50%;
      margin-left: -230px;
      background: url("https://f.weijinshi.com/myoss/data/D080FE9884391AF16689E4E1DB355325.png")
        no-repeat;
      background-size: 100% 100%;
      color: #ffe327;
      font-size: 30px;
      img {
        width: 30px;
        height: 30px;
        margin-top: 22px;
        margin-right: 14px;
      }
    }
  }
  //返现额度
  .backRate_list {
    width: 92%;
    margin: 42px auto 0;
    color: #ffffff;
    border: 1px solid #5f6fe8;
    li {
      height: 80px;
      font-size: 30px;
      line-height: 80px;
      background: #2b4a9e;
      text-align: center;
      span {
        color: #ffd600;
        font-size: 36px;
        font-weight: bold;
      }
    }
    li:nth-child(2n) {
      background: #1d3b8e;
    }
  }
  //活动规则
  .rule {
    width: 100%;
    margin-top: 62px;
    .ruleTxt {
      background: #1d3b8d;
      width: 92%;
      padding: 40px 30px 5px;
      margin: 40px auto 0px;
      color: #ffffff;
      font-size: 28px;
      p {
        line-height: 40px;
      }
      .line {
        margin-bottom: 40px;
      }
      .txtIndent {
        text-indent: 80px;
      }
    }
  }
  .tabbar {
    position: fixed;
    bottom: -4px;
    left: 0;
    right: 0;
    a {
      width: 50%;
      height: 100px;
      float: left;
    }
    a:first-of-type {
      background: url("https://f.weijinshi.com/myoss/data/294C2F62F5C66DAC02ECBA6934D2E135.png")
        no-repeat;
      background-size: 100% 100%;
    }
    a:last-of-type {
      background: url("https://f.weijinshi.com/myoss/data/9646F67F2E699714008B099AAB13EB11.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }
  //公共标题
  .title {
    text-align: center;
    padding: 0 5%;
    font-size: 40px;
    color: #ffffff;
    font-weight: bold;
    span {
      background: url("https://f.weijinshi.com/myoss/data/0217E79F7080AB8CA6841F33C608B842.png")
        no-repeat;
      background-size: cover;
      width: 165px;
      height: 26px;
      margin-top: 7px;
      float: left;
    }
    span:last-of-type {
      float: right;
    }
  }
}
</style>
