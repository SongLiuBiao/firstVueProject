<template>
    <div class="loaner-info" v-show="showContent">
        <div class="loaner-box">
            <div class="loaner-info-item" v-if="investType == 1">
                <h3>借款项目信息</h3>
                <div class="flex">
                    <div class="left">
                        <p>借款编号</p>
                        <p>借款类型</p>
                        <p>借款期限</p>
                        <p>借款金额</p>
                        <p>还款方式</p>
                    </div>
                    <div class="right" style="text-align: left">
                        <p>{{loanDetail.orderNo}}</p>
                        <p>{{loanDetail.loanUse}}</p>
                        <p>{{loanDetail.peroid}}</p>
                        <p>{{loanDetail.amount}}元</p>
                        <p>{{loanDetail.repayStyle}}</p>
                    </div>
                </div>
            </div>
            <div class="loaner-info-item" v-if="ptype == 1">
                <h3>还款计划</h3>
                <ul class="plan-list">
                    <li class="plan-top">
                        <div>
                            <p class="header">回款日期</p>
                        </div>
                        <div>
                            <p class="header">应回本金</p>
                        </div>
                        <div>
                            <p class="header">应回利息</p>
                        </div>
                        <div style="text-align: right;">
                            <p class="header">状态</p>
                        </div>
                    </li>
                    <li v-for="item in loanDetail.repayPlans" :key="item.id">
                        <div>
                            {{item.repayTime}}
                        </div>
                        <div>
                            {{item.needCorpus}}
                        </div>
                        <div>
                            {{item.needInterest}}
                        </div>
                        <div :class="{gray: item.status}">
                            {{payS(item.status)}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loaner-info-item" v-if="bidType == '0' || bidType == '1'">
                <h3>借款人信息</h3>
                <div class="flex">
                    <div class="left">
                        <p>借款人</p>
                        <p>证件号码</p>
                        <p>年龄</p>
                        <p v-if="bidType == '0'">性别</p>
                        <!--<p>婚姻</p>-->
                        <p>借款金额</p>
                        <p v-if="bidType == '0'">联系方式</p>
                        <!--<p>学历</p>-->
                        <p v-if="bidType == '0'">籍贯</p>
                        <p v-if="bidType == '1'">个人征信情况</p>
                        <p>借款用途</p>
                        <p v-if="bidType == '1'">所属行业</p>
                    </div>
                    <div class="right">
                        <p>{{resultMap.showName}}</p>
                        <p>{{resultMap.idNum}}</p>
                        <p>{{resultMap.age}}</p>
                        <p v-if="bidType == '0'">{{Sex}}</p>
                        <!--<p>{{Marital}}</p>-->
                        <p>
                            {{resultMap.amount}} 元
                        </p>
                        <p v-if="bidType == '0'">{{Mobile}}</p>
                        <!--<p>{{Education}}</p>-->
                        <p v-if="bidType == '0'">{{resultMap.native_place}}</p>
                        <p v-if="bidType == '1'">{{resultMap.credit_information}}</p>
                        <p>{{resultMap.loan_use}}</p>
                        <p v-if="bidType == '1'">{{resultMap.industry}}</p>
                    </div>
                </div>
            </div>
            <div class="loaner-info-item" v-if="bidType == '2'">
                <h3>企业信息</h3>
                <div class="flex">
                    <div class="left">
                        <p>企业名称</p>
                        <p>营业执照号</p>
                        <p>执照过期日</p>
                        <p>注册资本</p>
                        <p>开户行</p>
                        <p>开户行账号</p>
                    </div>
                    <div class="right">
                        <p>{{FormatStr(entMap.enterprise_name)}}</p>
                        <p>{{FormatStr(entMap.business_license_number)}}</p>
                        <p>{{formatDate(entMap.expireTime, 'YYYY-MM-DD')}}</p>
                        <p>{{entMap.registered_capital}} 元</p>
                        <p>{{cardMap.bank_name}}</p>
                        <p>{{FormatStr(cardMap.account)}}</p>
                    </div>
                </div>
            </div>
            <div class="loaner-info-item" v-if="bidType == '2'">
                <h3>法人信息</h3>
                <div class="flex">
                    <div class="left">
                        <p>法人姓名</p>
                        <p>证件号码</p>
                        <p>年龄</p>
                    </div>
                    <div class="right" style="text-align: left">
                        <p>{{entMap.legalPerson}}</p>
                        <p>{{entMap.idNum}}</p>
                        <p>{{entMap.age}}周岁</p>
                    </div>
                </div>
            </div>
            <!-- <div class="loaner-info-item" v-if="bidType == '0' && investType == 0">
                <h3>工作信息</h3>
                <div class="flex">
                    <div class="left">
                        <p>工作城市</p>
                        <p>公司行业</p>
                        <p>岗位职位</p>
                        <p>工作年限</p>
                    </div>
                    <div class="right" style="text-align: left">
                        <p>{{resultMap.city}}</p>
                        <p>{{resultMap.company_industry}}</p>
                        <p>{{resultMap.position}}</p>
                        <p>{{resultMap.work_year}}</p>
                    </div>
                </div>
            </div> -->
            <div class="loaner-info-item" v-if="bidType == '1' || bidType == '2'">
                <h3>借款数据</h3>
                <div class="flex">
                    <div class="left">
                        <p>历史借款次数</p>
                        <p>待还本金</p>
                        <p>逾期总金额</p>
                        <p>在本平台逾期次数</p>
                    </div>
                    <div class="right" style="text-align: left">
                        <p>{{resultMap.count}}</p>
                        <p>{{resultMap.repayment}}</p>
                        <p>{{resultMap.overTotalAmount}}</p>
                        <p>{{resultMap.overdue_count}}</p>
                    </div>
                </div>
            </div>
            <div class="loaner-info-item">
                <h3>信用信息</h3>
                <div class="flex credit">
                    <div class="left">
                        <p>借款人经营及财务情况</p>
                        <p>借款人受行政处罚情况</p>
                        <p>借款人还款能力变化情况</p>
                        <p>借款人涉诉情况</p>
                        <p>借款人负债情况</p>
                        <p>借款人征信报告逾期情况</p>
                    </div>
                    <div class="right" style="text-align: right">
                        <p>{{Status(resultMap.manage_financial)}}</p>
                        <p>{{Status(resultMap.punish)}}</p>
                        <p>{{Status(resultMap.repayment_ability)}}</p>
                        <p>{{Status(resultMap.lawsuit)}}</p>
                        <p>{{Status(resultMap.debt_situation)}}</p>
                        <p>{{Status(resultMap.credit_overdue)}}</p>
                    </div>
                </div>
            </div>
            <div class="loaner-info-item">
                <h3>风控认证</h3>
                <div class="flex flex-fk wind">
                    <div class="icon" v-for="(item, index) in resultMap.approveList" :key="index">
                        <img src="https://f.weijinshi.com/myoss/data/429AA8C4F15544D235AF655266C9663D.png" alt=""> {{item}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLoanRecordDetail, getoanRecord } from "@/api/app";
import moment from "moment";
export default {
  name: "loan-detail",
  data() {
    return {
      showContent: false,
      investType: 0,
      resultMap: {},
      entMap: {},
      cardMap: {},
      loanDetail: {},
      ptype: 0,
      bidType: "0"
    };
  },
  computed: {
    Sex() {
      return this.resultMap.sex === 1 ? "男" : "女";
    },
    Education() {
      let value = "";
      switch (this.resultMap.education) {
        case 0:
          value = "借款人未提供";
          break;
        case 1:
          value = "高中及以下";
          break;
        case 2:
          value = "专科";
          break;
        case 3:
          value = "本科";
          break;
        case 4:
          value = "研究生及以上";
          break;
        default:
          value = "暂无";
      }
      return value;
    },

    Marital() {
      let value = "";
      let val = "";
      if (this.bidType == "0") {
        val = this.resultMap.marital_status;
      } else {
        val = this.resultMap.marriage_certificate;
      }
      switch (val) {
        case 0:
          value = "借款人未提供";
          break;
        case 1:
          value = "已婚";
          break;
        case 2:
          value = "未婚";
          break;
        default:
          value = "借款人未提供";
      }
      return value;
    },
    Mobile() {
      if (this.resultMap.contact_info) {
        let phone = this.resultMap.contact_info + "";
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
      return "";
    }
  },
  created() {
    let recordId = this.$route.query.recordId;
    this.bidType = this.$route.query.btype;
    let bidIdSign = this.$route.query.bidIdSign;
    this.ptype = this.$route.query.ptype;
    let wInvestId = this.$getUrlParams("wInvestId");
    let params = { id: recordId };
    if (wInvestId) {
      Object.assign(params, { wInvestId: wInvestId });
    }
    if (recordId) {
      // 自然人
      getLoanRecordDetail(params).then(res => {
        if (res.code === 1) {
          this.showContent = true;
          this.resultMap = res.data.userLoan;
          this.loanDetail = res.data.loanDetail;
          this.investType = res.data.investType;
        }
      });
    } else {
      // 个体户和企业
      getoanRecord({ bidIdSign: bidIdSign }).then(res => {
        if (res.code === 1) {
          this.showContent = true;
          this.resultMap = res.data.loanInfo;
          this.entMap = res.data.enterpriseInfo;
          this.cardMap = res.data.bankCardInfo;
        }
      });
    }
  },
  methods: {
    payS(val) {
      return val === 0 ? "计息中" : "已结清";
    },
    Status(val) {
      return val === 0 ? "无" : "正常";
    },
    formatDate(date, format) {
      return moment(date).format(format);
    },
    FormatStr(str) {
      if (!str) return;
      console.log(str);
      str += "";
      let leg = str.length;
      if (leg > 8) {
        let nums = leg - 8,
          nstr = "";
        for (let i = 0; i < nums; i++) {
          nstr += "*";
        }
        return str.substr(0, 4) + nstr + str.substr(4 + nums);
      }
      return str;
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.loaner-info {
  padding: 0px 30px;
  .loaner-box {
    .loaner-info-item {
      margin-top: 64px;
      h3 {
        color: #030303;
        border-left: 6px solid @blue;
        padding-left: 16px;
      }
      .plan-list {
        padding-top: 30px;
        .plan-top {
          display: flex;
        }
        .header {
          font-size: 28px;
          color: @gray8;
        }
        .gray {
          color: @gray8;
        }
        li {
          padding-top: 24px;
          display: flex;
          div {
            flex: 1;
            font-size: 24px;
            &:nth-child(2) {
              text-align: center;
            }
            &:nth-child(3) {
              text-align: center;
            }
            &:nth-child(4) {
              flex: none;
              width: 120px;
              text-align: right;
            }
          }
        }
      }
      .flex {
        font-size: 28px;
        display: flex;
        padding-top: 30px;

        p {
          min-height: 56px;
          padding-bottom: 24px;
        }
        .left {
          width: 280px;
          color: @gray8;
        }
        .right {
          flex: 1;
        }
        &.credit {
          color: @gray8;
          p {
            padding: 20px 0px;
            border-bottom: 1px solid @graye8;
          }
          .left {
            flex: 1;
          }
        }
      }

      .wind {
        display: flex;
        flex-wrap: wrap;
        .icon {
          flex: 0 0 33.3%;
          margin-bottom: 30px;
          img {
            width: 28px;
          }
        }
      }
    }
  }
}
</style>
