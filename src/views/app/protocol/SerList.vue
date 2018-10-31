<template>
    <div class="info-container">
        <div class="desc-wrap">
            <ul class="desc-list">
                <li v-for="(item) in investList" :key="item.id">
                    <a :href="item.url">{{item.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getWzsInvestdealList } from "@/api/app";
export default {
  name: "ser-list",
  data() {
    return {
      investList: ""
    };
  },
  created() {
    let params = this.$getUrlArrayObj();
    if (Object.keys(params).indexOf("template") === -1) {
      Object.assign(params, {
        template: "winvest_agreement_template",
        scene: 1
      });
    }
    getWzsInvestdealList(params).then(res => {
      if (res.code === 1) {
        this.investList = res.data.protocols;
      }
    });
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background: #f5f5f5");
  },
  beforeDestroy() {
    document.querySelector("body").setAttribute("style", "");
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.info-container {
  padding: 32px 0px 0px 0px;
  font-size: 28px;
  line-height: 48px;
  a {
    color: @black;
  }
  .desc-wrap {
    background-color: @white;
  }
  .desc-list {
    margin-left: 32px;
    li {
      height: 88px;
      line-height: 88px;
      //border-bottom: 1px solid @graye8;
      box-shadow: inset 0px -1px 1px -1px @graye8;
      position: relative;
      a {
        display: inline-block;
        width: 100%;
      }
      &:after {
        content: " ";
        display: inline-block;
        height: 14px;
        width: 14px;
        border-width: 0px 2px 2px 0px;
        border-color: #999999;
        border-style: solid;
        transform: matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0);
        position: absolute;
        top: 38px;
        right: 32px;
      }
    }
  }
}
</style>
