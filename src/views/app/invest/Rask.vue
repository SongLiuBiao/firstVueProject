<template>
    <div class="info-container">
        <ul class="que-list">
            <li>
                <p class="tit">信用风险</p>
                <p>微金石作为网络借贷信息中介机构，不提供增信服务，不承担借贷违约风险。如借款方因经营不善、资金周转不灵或主观故意而出现无法或未能正常还款的情况，出借方需自行承担借贷风险，接受本息损失。</p>
            </li>
            <li>
                <p class="tit">延期风险</p>
                <p>当借款方未按期足额还款时，微金石将根据出借方的授权采用适当的方式代表出借方对借款方进行追索（包括但不限于仲裁和诉讼），无论采取哪种方式，在此过程中，出借方均有可能延期收到出借本金和利息。</p>
            </li>
            <li>
                <p class="tit">操作风险</p>
                <p>不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借方造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据。</p>
            </li>
            <li>
                <p class="tit">经营风险</p>
                <p>微金石所发布的出借产品是针对当前的相关法规和政策设计的。如国家政策、市场、法律及其他因素等发生变化，可能影响出借产品的受理、出借、偿还等的正常进行，则可能会对出借方产生不利影响。</p>
            </li>
            <li>
                <p class="tit">特别提示</p>
                <p>前述风险提示不能穷尽全部风险及市场的全部情形。</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "rask"
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
