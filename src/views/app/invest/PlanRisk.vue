<template>
    <div class="planRisk" ref="content">
        <p class="pr_des">
            微金石通过“知网大数据风控”建立起完整高效的端对端风险管理流程。“知网大数据风控”依托海量数据和强大的技术团队，独家打造“风控闭环”新模式。利用大数据技术和变量因素复杂化，建立起高度精确的风险控制模型。在贷前审批、贷中监管、贷后管理等所有场景消费金融的流程环节，均通过收集数据后的风控闭环模型介入来实现。
        </p>
        <div class="pr_step">
            <div class="pr_stepTitle"><span>知网“风控闭环”模式</span><i></i></div>
            <img src="../../../assets/img/invest/planrisk1.png" alt="">
        </div>
        <div class="pr_step">
            <div class="pr_stepTitle"><span>风控模型</span><i></i></div>
            <img src="../../../assets/img/invest/planrisk2.png" alt="">
        </div>
        <div class="pr_step">
            <div class="pr_stepTitle"><span>风险管理流程</span><i></i></div>
            <img class="pr_otherImg" src="../../../assets/img/invest/planrisk3.jpg" alt="">
        </div>
    </div>
</template>

<script>
import { mBrowser } from "jrmf-utils";
export default {
  name: "plan-risk",
  mounted() {
    setTimeout(() => {
      this.getClientHeight();
    }, 200);
  },
  methods: {
    getClientHeight() {
      console.log(this.$refs.content.clientHeight);
      let height = this.$refs.content.clientHeight;
      if (mBrowser.versions.android) {
        window.js_java_android.setClientHeight(height);
      } else {
        this.$bridge.callhandler("setClientHeight", height);
      }
    }
  }
};
</script>

<style scoped lang="less">
.planRisk {
  padding: 32px 32px 50px;
  .pr_des {
    font-size: 28px;
    line-height: 48px;
    color: #555555;
  }
  .pr_step {
    margin-top: 64px;
    .pr_stepTitle {
      margin-bottom: 32px;
      position: relative;
      height: 32px;
      & > span {
        font-size: 32px;
        line-height: 32px;
        color: #333333;
        font-weight: bold;
        position: absolute;
        padding: 0 20px;
        top: 0;
        left: 50%;
        z-index: 2;
        background: #ffffff;
        transform: translate(-50%, 0);
      }
      & > i {
        height: 1px;
        background: #e8e8e8;
        position: absolute;
        width: 100%;
        top: 15px;
        left: 0;
      }
    }
    & > img {
      width: 100%;
    }
    .pr_otherImg {
      width: 523px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
