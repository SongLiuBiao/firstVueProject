<template>
    <div class="contract-box">
        <div class="contract">
            <div class="contract-title">授权委托书</div>
            <div class="contract-serial">编号:{{resMap.orderNo}}</div>
            <div class="deal">
                <div class="">
                    <p>委托人（出借人）:{{resMap.realName}}</p>
                    <p>证件类型：身份证</p>
                    <p>证件号码：{{resMap.idNumber}}</p>
                    <p>受托人：杭州金石互联网金融服务有限公司</p>
                </div>
            </div>
            <div class="contr-text">
                <div class="tit">一、委托事项：</div>
                <p>1.委托人为实现资金出借之目的，同意并授权杭州金石互联网金融服务有限公司按照相关法律、法规和监管要求，在微金石平台【包括网站(www.weijinshi.com)，“微金石”微信公众号、“微金石”移动APP】上为其寻找合适的借款项目，授权受托人基于委托人所认可的微金石平台有关协议及其自身独立判断、根据委托人选择的出借策略与交易规则在微金石平台所发布的借款项目中为委托人实时搜索、匹配相应借款项目，<span class="tit">为保障委托人委托出借的资金能第一时间完成出借并开始计息，委托人委托出借的部分资金可能会在不同的时间完成出借，从而造成委托人出借的部分资金在不同的时间回款，委托人对此已完全知悉并理解，并不得提出异议。</span>
                </p>
                <p>2.委托人同意并授权受托人以委托人名义在受托人合作的存管系统申请网络交易资金存管账户，并代为递交有关申请文件；授权受托人有权代表委托人就有关交易向存管机构发出相关交易指令，办理资金交易冻结、解冻、回款等操作。该账户仅限用于本授权书项下借款相关事宜。委托人有权根据该存管机构或受托人平台规则，享有该存管机构或受托人平台提供的服务，同时遵守该存管机构或受托人平台公示的规则。
                </p>
                <p>3.委托人授权受托人代委托人申请、注册、使用其电子签名认证证书（以下简称CA证书）。委托人就其通过微金石平台进行网络借贷所涉及的所有应签署的电子文件（包括但不限于《借款服务协议》，授权受托人使用委托人的CA证书进行电子文件的签署事宜，并认可相关有效电子文件对委托人发生法律效力。 合作平台名称将借款人的借款信息通过系统传输给受托人平台后，由系统自动生成《借款服务协议》及其他协议，借款发放成功后，该《借款服务协议》及其他协议即对委托人发生法律效力。委托人依约享有并履行《借款服务协议》及该等协议的相关权利及义务。
                </p>
                <p>4.委托人确认并同意，受托人（或合作平台名称）委托的第三方机构或其存管机构有权从委托人在《借款服务协议》中指定的账户内划扣其应付的服务费、违约金等相关费用，并授权受托人（或合作平台名称）委托的第三方机构或其存管机构根据《借款服务协议》约定的出借金额从其账户中划扣至借款人指定账户以履行放款义务。
                </p>
                <p>5. 委托人签订本授权书后，则视为已经充分阅读、理解和同意本合同全部条款、内容及各类规则。
                </p>
                <div class="tit">二、委托期限：
                </div>
                <p>自本授权委托书签署之日起至委托人履行完毕全部《借款服务协议》及其他相关协议的义务之日止。授权期间本授权不可撤销。</p>
            </div>
            <div class="fot">
                <p>委托人（签章）：</p>
                <p>签署日期： {{resMap.date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getEntrust } from "@/api/app";
import { mBrowser } from "jrmf-utils";
export default {
  name: "entrust",
  data() {
    return {
      resMap: {}
    };
  },
  created() {
    let params = this.$getUrlArrayObj();
    getEntrust(params).then(res => {
      if (res.code === 1) {
        this.resMap = res.data.borrowProtocolInfo;
        this.CallApp();
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
table {
  width: 100%;
}
.deal > div {
  padding-top: 30px;
}
.contr-text {
  .tit {
    font-weight: bold;
  }
  p {
    padding-bottom: 32px;
  }
  div {
    padding: 32px 0px;
  }
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
.fot {
  margin-top: 30px;
}
.contract-serial {
  font-size: 24px;
  line-height: 35px;
  color: #555555;
  text-align: right;
  height: 35px;
  width: 100%;
  position: relative;
}
</style>
