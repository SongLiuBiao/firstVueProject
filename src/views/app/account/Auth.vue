<template>
    <div class="info-container">
        <img width="100%" src="//f.weijinshi.com/myoss/data/91EC43CE4CD56F2ADB1F88A1C81DC309.png" alt="">
        <div class="q-info">
            <p class="tit">为什么要开通新浪支付委托扣款功能?</p>
            <p>微金石APP2.0版“微智享”产品需要开通新浪支付委托扣款功能，开通后可享受“微智享”带来的安全便捷。</p>
        </div>
        <div class="you-box">
            <h2 class="title">“微智享”三大优点</h2>
            <div class="txt">
                <p class="tit">更多安全:</p>
                <p>严格筛选每笔借款，按照小而分散的原则匹配优质资产;</p>
            </div>
            <div class="txt">
                <p class="tit">更高效率:</p>
                <p>免去出借时的重复投标操作，提高出借效率，节省出借时间;</p>
            </div>
            <div class="txt">
                <p class="tit">更好体验:</p>
                <p>不忘初心，从产品设计到产品流程各方面的优化，只为给用户最好的体验。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "auth"
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.info-container {
  padding: 32px;
  .q-info {
    padding-top: 32px;
    font-size: 28px;
    color: #252525;
    line-height: 48px;
    .tit {
      font-weight: bold;
    }
  }
  .you-box {
    margin-top: 24px;
    padding: 24px 32px 32px 32px;
    background-color: @grayf5;
    .title {
      font-size: 28px;
      text-align: center;
      font-weight: bold;
    }
    .txt {
      padding-top: 22px;
      font-size: 24px;
      line-height: 33px;
    }
    .tit {
      font-weight: bold;
    }
  }
}
</style>
