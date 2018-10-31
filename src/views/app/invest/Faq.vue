<template>
    <div class="info-container">
        <ul class="que-list">
            <li>
                <p class="tit">微智享安全吗？</p>
                <p>微金石以严谨负责的态度对每笔借款进行严格筛选，出借项目真实可控，出借成功后可查看标的匹配情况。</p>
            </li>
            <li>
                <p class="tit">如何匹配借款标的？</p>
                <p>系统将按照小额分散的原则为您匹配借款标的。</p>
            </li>
            <li>
                <p class="tit">加入微智享后何时开始计息？</p>
                <p>当天匹配成功的资金在放款成功后开始计息。</p>
            </li>
            <li>
                <p class="tit">为什么我一笔出借后回款账单会有多条？</p>
                <p>这种情况有2种原因：</p>
                <p>1）出借的产品是3个月期限的，由于是每月付息到期还本，所以会有3条回款记录；</p>
                <p>2）出借的产品到期还本付息，但是出借的金额较大，比如出借的资金几十万元，系统会分配到不同的借款人中，由于借款日期不同，最多可能会相差一到两天，所以也会出现一笔出借有多笔回款账单情况。</p>
            </li>
            <li>
                <p class="tit">加入后可以取消吗？</p>
                <p>加入微智享后的资金已开始智能匹配借款标的，无法取消。超过24小时，如无后续借款人系统会解冻未匹配成功的资金。</p>
            </li>
            <li>
                <p class="tit">出借的标的是否可以转让？</p>
                <p>不支持转让，标的到期后回款结束。</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "faq"
};
</script>

<style scoped lang="less">
.info-container {
  font-size: 28px;
  padding: 0px 32px;
  line-height: 48px;
  .tit {
    padding: 32px 0px 0px;
    font-weight: bold;
  }
}
</style>
