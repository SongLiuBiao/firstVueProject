<template>
        <div class="box">
             <!-- 头部阿 -->
              <div class="header">
                  <p class="header-text">
                      拥有<b>{{numChance}}</b>次补卡机会
                  </p>

                  <div class="header-btn" @click="suppLementCard">
                      一键补卡
                  </div>
                  <p class="header-text header-text2">
                      <b>{{numDeficiency}}</b>次缺卡
                  </p>
              </div>
              <!-- 内容阿 -->
              <div class="content">
                   <!-- 开通每日打开提醒 -->
                    <div class="remind">
                        <div class="left">
                            打卡提醒
                        </div>
                        <div class="right">
                            开通每日打卡提醒
                            <template v-if="isRemind">
                                 <img  @click="closeRemind" src="https://f.weijinshi.com/myoss/data/3DCA6A9283F0E13C2D49009752D88526.png" >
                            </template>
                            <template v-else>
                                 <img @click="openRemind" src="https://f.weijinshi.com/myoss/data/B55350ECF25EB69D00A64E52918C5883.png">
                            </template>
                        </div>
                    </div>
                   
                    <!-- 获取打卡机会  -->
                    <ul class="getOpportunity">
                        <li class="getOpportunity-list">
                             <div class="left">
                                 <p class="title">
                                     开户绑卡
                                 </p>
                                 <p class="text">
                                   开户绑卡可获得一次补卡机会
                                 </p>
                             </div>
                             <template v-if="realNameValue">
                                    <div class="right activity">
                                          已获取
                                    </div>
                             </template>
                             <template v-else>
                                   <div class="right" ref="get" @click="TiedCard">
                                          获取
                                    </div>
                             </template>
                            
                        </li>
                        <li class="getOpportunity-list">
                             <div class="left">
                                 <p class="title">
                                     了解微金石
                                 </p>
                                 <p class="text">
                                    阅读微金石介绍60秒可获得一<br>次补卡机会
                                 </p>
                             </div>
                             <template v-if="readValue">
                                    <div class="right activity">
                                          已获取
                                    </div>
                             </template>
                             <template v-else>
                                   <div class="right" @click="knowWJS">
                                          获取
                                    </div>
                             </template>
                        </li>
                         <li class="getOpportunity-list">
                             <div class="left">
                                 <p class="title">
                                     首投微智享
                                 </p>
                                 <p class="text">
                                    仅首次投资微智享可活动一次<br>补卡机会
                                 </p>
                             </div>
                          <template v-if="investValue">
                                    <div class="right activity">
                                          已获取
                                    </div>
                             </template>
                             <template v-else>
                                   <div class="right" @click="StWjx">
                                          获取
                                    </div>
                             </template>
                        </li>
                         <li class="getOpportunity-list">
                             <div class="left">
                                 <p class="title">
                                     邀请好友注册
                                 </p>
                                 <p class="text">
                                    在参加活动期间内，每邀请一<br>个好友
                                    注册可获得一次补卡机会
                                 </p>
                             </div>
                             <div class="right" @click="inviteFriend">
                                 获取
                             </div>
                        </li>
                         <li class="getOpportunity-list">
                             <div class="left">
                                 <p class="title">
                                     邀请好友注册并投资
                                 </p>
                                 <p class="text">
                                    在参加活动期间内，每邀请一<br>个好友
                                     注册并投资可获得两次机会
                                 </p>
                             </div>
                             <div class="right" @click="inviteFriend">
                                 获取
                             </div>
                        </li>
                    </ul>
              </div>
              <!-- 弹窗阿 -->
              <div class="box-Dialog" v-show="isDialog">
                    <div class="Dialog">
                        <p class="Dialog-text"> 
                            点击“我的”---"账户"---银行卡设置，<br>
                            进行实名，设置密码以及绑卡~
                        </p>
                         <span class="Dialog-btn" @click="TiedCard">我知道了</span>
                    </div>
              </div>
              <!-- 提示更新弹窗阿 -->
               <Dialog  v-show="isUpdateDialog" :text="text"  @Hidden="hidden" @hidden="copy"></Dialog>
        </div>
</template>

<script>
import { suppLement, mendCard } from "@/api/app";
import { mBrowser } from "jrmf-utils";
import Dialog from "@/components/Dialog.vue";
import moment from "moment";
export default {
  name: "supplement",
  data() {
    return {
      appinfo: this.$route.query.appInfo, // 用户app信息
      isRemind: false,
      RecommendCode: 0,
      userId: this.$route.query.userId, //用户ID
      numChance: 0, //补卡机会次数
      numDeficiency: 0, //缺卡次数
      realNameValue: false, //用户是否开户,
      readValue: false, //用户是否了解微金石,
      investValue: false, //用户是否首次投资微智享
      isDialog: false, //弹窗是否显示
      isUpdateDialog: false, //更新弹窗是否显示
      Time: this.$route.query.time, //打开提醒开始时间,
      message: {
        title: "打卡三十天，领取30元!", //分享title
        content: "妈妈在也不用担心我买买买被剁手了！一般人我不告诉他", //分享内容
        url: "http://twjs1.weijinshi.com/mystatic/singinShare?recommendCode=" //分享链接
      },
      text: ""
    };
  },
  created() {
    this.getRemind();
    this.suppLementCardMessage();
  },
  methods: {
    //判断用户手机版本
    isAppInfo: function() {},
    //更新弹窗关闭
    hidden: function(e) {
      console.log(e);
      this.isUpdateDialog = e;
    },
    //更新弹窗复制下载地址
    copy: function(e) {
      this.isUpdateDialog = e[0];
      this.$toast({ message: "复制成功" });
    },
    // 补卡用户信息
    suppLementCardMessage: function() {
      suppLement({ userId: this.userId }).then(res => {
        console.log(res);
        this.numChance = res.data.supplementValue; //补卡机会次数
        this.realNameValue = res.data.realNameValue; //用户是否开户,
        this.readValue = res.data.readValue; //用户是否了解微金石
        this.investValue = res.data.investValue; //用户是否首次投资微智享
        this.numDeficiency = res.data.unclockDate; //缺卡次数
        this.RecommendCode = res.data.mobile; //用户手机号
        this.message.url = this.message.url + res.data.mobile;
      });
    },
    // 一键补卡
    suppLementCard: function() {
      mendCard({ userId: this.userId }).then(res => {
        if (res.code == 1) {
          this.suppLementCardMessage();
          this.$toast({ message: res.msg, delay: 1500 });
        } else {
          return;
        }
      });
    },
    //开户绑卡
    TiedCard: function() {
      this.isDialog = !this.isDialog;
    },

    //阅读微金石
    knowWJS: function() {
      window.location.href = `platform?userId=${this.userId}`;
    },
    //首投微智享
    StWjx: function() {
      window.location.href = "/opennative?name=APP_INVEST&investType=1";
    },
    //邀请好友
    inviteFriend: function() {
      this.clickApp(this.message);
    },
    // 获取打开通知状态
    getRemind: function() {
      let data = JSON.stringify({
        title: "连续打卡三十天，领取现金三十元",
        description: "行百里者半九十，微金石喊你过来打卡啦"
      });

      if (mBrowser.versions.android) {
        var response = window.js_java_android.queryPushState(data);
        if (response == 1) {
          this.isRemind = true;
        } else {
          this.isRemind = false;
        }
      } else {
        this.$bridge.callhandler("queryPushState", data, response => {
          if (response == 1) {
            this.isRemind = true;
          } else {
            this.isRemind = false;
          }
        });
      }
    },
    //开启打开通知
    openRemind: function() {
      var startTime = moment(moment(this.Time).add(10, "hours")).valueOf();
      var endTime = moment(moment(startTime).add(29, "days")).valueOf();
      //  alert(startTime);
      //  alert(endTime);
      let data = JSON.stringify({
        title: "连续打卡三十天，领取现金三十元",
        description: "行百里者半九十，微金石喊你过来打卡啦",
        beginTime: startTime,
        endTime: endTime,
        url: "https://twjs1.weijinshi.com/mystatic/singIn"
      });
      if (mBrowser.versions.android) {
        this.text = "复制";
      } else {
        this.text = "下载";
      }
      let AppInfo = JSON.parse(this.appinfo);
      // 如果版本低于2.2 就去弹窗更新
      if (AppInfo.appVersion / 100 < 2.2) {
        this.isUpdateDialog = true;
      } else {
        if (mBrowser.versions.android) {
          var response = window.js_java_android.openPush(data);
          if (response == 1) {
            this.isRemind = true;
            this.$toast({
              message: "开启成功",
              padding: "10px 40px",
              delay: 800
            });
          }
        } else {
          this.$bridge.callhandler("openPush", data, response => {
            if (response == 1) {
              this.isRemind = true;
              this.$toast({
                message: "开启成功",
                padding: "10px 40px",
                delay: 800
              });
            }
          });
        }
      }
    },
    // 关闭打卡通知
    closeRemind: function() {
      let data = JSON.stringify({
        title: "连续打卡三十天，领取现金三十元",
        description: "行百里者半九十，微金石喊你过来打卡啦"
      });
      if (mBrowser.versions.android) {
        var response = window.js_java_android.closePush(data);
        if (response == 1) {
          this.isRemind = false;
          this.$toast({
            message: "关闭成功",
            padding: "10px 40px",
            delay: 800
          });
        }
      } else {
        this.$bridge.callhandler(
          "closePush",

          data,
          response => {
            if (response == 1) {
              this.isRemind = false;
              this.$toast({
                message: "关闭成功",
                padding: "10px 40px",
                delay: 800
              });
            }
          }
        );
      }
    },

    //打开App分享
    clickApp(data) {
      window.location.href =
        "/opennative?name=APP_SHARE" +
        "&params=" +
        encodeURIComponent(encodeURIComponent(JSON.stringify(data)));
    }
  },
  components: {
    Dialog: Dialog
  }
};
</script>

<style lang="less" scoped>
.box {
  //头部
  .header {
    height: 434px;
    width: 100%;
    background: url("https://f.weijinshi.com/myoss/data/C70AD094B598B13EB27521678D8BA02F.jpg")
      no-repeat;
    background-size: 100% 100%;
    position: relative;
    .header-text {
      position: absolute;
      font-size: 36px;
      color: #fff;
      top: 147px;
      left: 50%;
      transform: translateX(-50%);
      b {
        color: #ffd81b;
        font-size: 48px;
      }
    }
    & > .header-text2 {
      font-size: 30px;
      top: 330px;
      left: 50%;
      transform: translateX(-50%);
    }
    .header-btn {
      width: 405px;
      height: 100px;
      background: url("https://f.weijinshi.com/myoss/data/A5810DF433AE2C33590952F810747571.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 108px;
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-size: 36px;
    }
  }
  // 内容
  .content {
    background: #fefbf6;
    // 每日打开提醒
    .remind {
      overflow: hidden;
      padding: 37px 49px 33px 49px;
      border-bottom: 1px solid #dcdcdc;
      .left {
        font-size: 30px;
        color: #333333;
        font-weight: 700;
      }
      .right {
        font-size: 26px;
        color: #888888;
        img {
          width: 113px;
          height: 40px;
          vertical-align: middle;
          margin-left: 19px;
        }
      }
    }
    // 获取打开机会
    .getOpportunity {
      padding: 0px 50px 88px 49px;
      & > li:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .getOpportunity-list {
        border-bottom: 1px solid #d8d8d8;
        overflow: hidden;
        padding: 39px 0 40px 0;
        .left {
          .title {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #333333;
          }
          .text {
            color: #888888;
            font-size: 26px;
          }
        }
        .right {
          width: 140px;
          height: 56px;
          background: #f5470a;
          font-size: 30px;
          color: #ffffff;
          text-align: center;
          line-height: 56px;
          border-radius: 28px;
          margin-top: 6px;
        }
        & > .activity {
          background: #ccc;
        }
      }
    }
  }
  // 弹窗
  .box-Dialog {
    width: 100%;
    height: 100%;
    background: red;
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.65);
    .Dialog {
      width: 652px;
      height: 349px;
      background: url("https://f.weijinshi.com/myoss/data/EAC34FEC90BB3E2EEF9C0A5008C56078.png")
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .Dialog-text {
        text-align: center;
        color: #633577;
        margin-top: 70px;
        font-size: 28px;
        line-height: 50px;
      }
      .Dialog-btn {
        display: block;
        width: 320px;
        height: 70px;
        background: url("https://f.weijinshi.com/myoss/data/42B08459742AE84A4E9055E508BE9188.png")
          no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 70px;
        color: #ffffff;
        margin: 50px auto;
      }
    }
  }
}
</style>
