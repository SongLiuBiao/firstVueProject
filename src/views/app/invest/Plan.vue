<template>
    <div class="plan-container" ref="content">
        <div class="tip-info">
            微智享是微金石平台推出的优先自动投标工具，经由出借人授权，并由系统根据对应的出借金额，在可行的范围内为出借人实现自动分散式投标，匹配标的经由平台多层风控把关、严格筛选，以期尽可能降低出借人的出借风险，同时减少出借时的重复操作，提高出借效率。
        </div>
        <div class="desc-wrap">
            <div class="plan-tit">
                <hr class="befhr">
                <span class="tit">加入流程</span>
                <hr class="afthr">
            </div>
        </div>
        <div class="plan-w">
            <div class="item">
                <div class="icon-box">
                    <svg class="icon icon_01" aria-hidden="true">
                        <use xlink:href="#icon-ziyuan"></use>
                    </svg>
                </div>
                <p>加入微智享</p>
            </div>
            <div class="item">
                <div class="icon-box">
                    <svg class="icon icon_02" aria-hidden="true">
                        <use xlink:href="#icon-ziyuan1"></use>
                    </svg>
                </div>
                <p>自动匹配</p>
            </div>
            <div class="item">
                <div class="icon-box">
                    <svg class="icon icon_03" aria-hidden="true">
                        <use xlink:href="#icon-ziyuan3"></use>
                    </svg>
                </div>
                <p>满标计息</p>
            </div>
            <div class="item">
                <div class="icon-box">
                    <svg class="icon icon_04" aria-hidden="true">
                        <use xlink:href="#icon-ziyuan2"></use>
                    </svg>
                </div>
                <p>到期退出</p>
            </div>
        </div>
        <div class="desc-wrap">
            <ul class="desc-list">
                <li @click="goDetail('/app/faq')">
                    常见问题
                </li>
                <li @click="goDetail('/app/protocol/ser-list')">
                    服务协议
                </li>
                <li @click="goDetail('/app/risk')">
                    风险提示
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mBrowser } from "jrmf-utils";
export default {
  name: "plan",
  mounted() {
    this.getClientHeight();
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background: #f5f5f7");
  },
  beforeDestroy() {
    document.querySelector("body").setAttribute("style", "");
  },
  methods: {
    getClientHeight() {
      console.log("getClientHeight:" + this.$refs.content.clientHeight);
      let height = this.$refs.content.clientHeight;
      if (mBrowser.versions.android) {
        window.js_java_android.setClientHeight(height);
      } else {
        this.$bridge.callhandler("setClientHeight", height);
      }
    },
    goDetail(to) {
      let app = this.$getUrlParams("_appInfo");
      if (app) {
        let params = {
          url: `${location.protocol}//${location.host}/mystatic${to}`
        };
        console.log("url:>>>", params.url);
        var url =
          "/opennative?name=WEBVIEW" +
          "&params=" +
          encodeURIComponent(JSON.stringify(params));
        window.location.href = url;
      } else {
        this.$router.push({
          path: `${to}`
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.plan-container {
  min-height: 100%;
  background-color: @grayf5;
  overflow-x: hidden;
  .tip-info {
    font-size: 28px;
    line-height: 48px;
    padding: 32px;
    background-color: @white;
  }
  .space {
    height: 32px;
    background-color: @grayf5;
  }
  .desc-wrap {
    background-color: @white;
  }
  .befhr,
  .afthr {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    width: 260px;
    border: 0.5px dashed #dde2ff;
    color: #dde2ff;
  }
  .befhr {
    left: 0px;
  }
  .afthr {
    right: 0px;
  }
  .plan-tit {
    margin: 0 32px;
    text-align: center;
    display: block;
    position: relative;
    .tit {
      display: inline-block;
      font-size: 28px;
      color: @blue;
    }
  }
  .plan-w {
    display: flex;
    font-size: 24px;
    padding: 32px 0px;
    text-align: center;
    background-color: @white;
    .icon-box {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      border-radius: 50%;
      background: @white;
      box-shadow: 0 2px 8px 0 rgba(86, 111, 255, 0.26);
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 40px;
        height: 40px;
      }
      .icon_01 {
        width: 40px;
        height: 32px;
      }
      .icon_03 {
        width: 42px;
      }
    }
    .item:last-child {
      &:after {
        content: "";
        background: none;
      }
    }
    .item {
      flex: 1;
      position: relative;
      &:after {
        top: 28px;
        right: -20px;
        position: absolute;
        content: " ";
        display: inline-block;
        width: 32px;
        height: 18px;
        background: url("../../../assets/img/invest/5.svg") no-repeat;
        background-size: 100%;
      }
    }
    p {
      color: @gray8;
      padding-top: 14px;
    }
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
