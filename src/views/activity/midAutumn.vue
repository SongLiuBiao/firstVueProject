<template>
    <div class="midAutumn">
        <div class="banner" >
            <img src="https://f.weijinshi.com/myoss/data/384905430C303209A5AB5C2DB086460E.png" alt="">
            <div class="luckNum">
                <p>幸运值：{{luckValue}}</p>
                <p class="tip" @click="alertType='luck';alertShow=true" ><img src="./img/question.png" alt="">如何获得幸运值</p>
            </div>
        </div>
        <div class="wheelBox">
            <div class="wheelBg">
                <div class="wheel" :style="{transform:rotateAngle,transition:rotateTransition}"></div>
                <div class="pointer"></div>
            </div>
            <div class="btn">
                <div class="firstBtn"  @click="clickBtn(1)" ></div>
                <div class="lastBtn"  @click="clickBtn(2)" ></div>
            </div>
        </div>
        <div class="reward">
            <div class="title"><span></span> 已得奖励 <span></span></div>
            <ul class="reward_list">
                <li>
                    <div>奖品</div>
                    <div>数量</div>
                </li>
                <li v-if="rewardLists.length>0" v-for="item in rewardLists">
                    <div>{{item.award_name}}</div>
                    <div>{{item.award_num}}</div>
                </li>
                <li v-if="rewardLists.length==0">您暂未获得奖励～</li>
            </ul>
        </div>
        <div class="rule">
            <div class="title"><span></span> 活动规则 <span></span></div>
            <div class="ruleTxt">
                <p class="line">1.消耗幸运值即可参与大转盘抽奖，抽奖时消耗50幸运值中大奖的概率远远高于消耗5幸运值中大奖的概率；</p>
                <p class="line">2.请在活动时间内抽奖，若活动时间结束时幸运值未消耗完，将会清零；</p>
                <p class="line">3.活动时间：2018年9月22日-2018年9月24日；</p>
                <p>4.奖品发放：</p>
                <p class="txtIndent"> 红包券、加息券：抽中时，即时发放至账户中，红包券、加息券的具体使用规则请至【我的账户】-【我的奖励】中查看。</p>
                <p class="txtIndent"> 微信红包：活动结束后，2个工作日内由客服统一联系发放；</p>
                <p class="txtIndent line"> 实物奖励：活动结束后，2个工作日内由客服统一联系发放，具体收货时间以快递送达时为准，若用户留的地址不对或天气等不可抗力因素导致实物奖品无法正常送达，相应损失应由用户自行承担；</p>
                <p class="line"> 5.本活动最终解释权归微金石所有，严禁一切刷奖行为，若发现刷奖，微金石有权不予发放奖品。</p>
                <p class="line"> 若有疑问，请联系客服电话：4008-690-611。</p>
            </div>
        </div>
        <div class="tabbar">
            <a href="javaScript:void (0);"></a>
            <router-link :to="linkUrl"></router-link>
        </div>
        <div class="alert" v-show="alertShow">
            <div class="tipAlert" v-show="alertType=='tip'">
                <p>恭喜喜提{{rewardName}}</p>
                <img :src="hasReward" alt="">
                <span>{{tipMessage}}</span>
                <div class="btnok" @click="alertShow=false"></div>
            </div>
            <div class="luckAlert" v-show="alertType=='luck'">
                <div>如何获得幸运值</div>
                <p>每日登录获得1个幸运值；</p>
                <p>邀新好友助力可获得1个幸运值（每日仅限一次）：通过微信分享活动页给好友，好友通过链接打开活动页，即可获得1个幸运值；</p>
                <p>活动期间累计出借每1000可获得1个幸运值，上不封顶（如：累计出借2001元则可获得2个幸运值）；</p>
                <p>若邀请的好友在活动期间首投满1000元邀请人可获得3个幸运值，上不封顶。</p>
                <span @click="alertShow=false"></span>
            </div>
            <div class="errAlert" v-show="alertType=='error'">
                <span @click="alertShow=false"></span>
            </div>
            <div class="shareAlert" v-show="alertType=='share'">
                <span class="shareClose" @click="alertShow=false"></span>
                <img src="https://f.weijinshi.com/myoss/data/7A59D8241950945DB479BB6D5569736D.png" alt="">
                <div class="shareBtn">
                    <a href="http://www.weijinshi.com/app/download"></a>
                    <a :href="registerURl"></a>
                </div>
            </div>
            <div class="waitAlert" v-show="alertType=='waitAlert'">
               <h1>{{waitAlert}}</h1>
               <h2 @click="alertShow=false">确定</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { getActivityShareInfo } from "@/api/app";
import { mBrowser } from "jrmf-utils";

export default {
  name: "midAutumn",
  data() {
    return {
      search: window.location.search,
      linkUrl: "", //返现乐不停路由
      pid: this.$route.query.pid,
      appInfo: this.$route.query._appInfo,
      userId: this.$route.query.userId, //用户ID
      recommendCode: this.$route.query.recommendCode, //邀请码（手机号）
      registerURl: "", //渠道注册链接
      timer: null, //定时器
      luckValue: 0, //幸运值
      alertShow: false, //弹窗是否开启
      alertType: "error", //弹框类型 tip:中奖提示 luck：获取辛运值弹框  share：提示注册&登录
      startAngle: 0, //开始旋转的角度
      rotateAngle: 0, //旋转的度数
      rotateTransition: "transform 5s ease-in-out", //css transition 属性定义
      index: 0, //抽中的奖品编号
      click_flag: true, //是否可以点击抽奖
      hasReward: "", //中将物品图片
      rewardLists: [], //已得奖励列表
      rewardName: "", //获得奖励名称
      tipMessage: "", //获得奖励提示
      waitAlert: "活动未开始", //活动未开始提升弹窗
      rewards: [
        {
          isgood: true,
          name: "99元微信红包一个",
          src:
            "https://f.weijinshi.com/myoss/data/F3005B68FDA2DCD1D109EDBC7DB99A35.png"
        },
        {
          isgood: true,
          name: "9元微信红包一个",
          src:
            "https://f.weijinshi.com/myoss/data/A5272CBC3ED6258FC699935D8ADAFD66.png"
        },
        {
          isgood: true,
          name: "1000元携程礼品卡一张",
          src:
            "https://f.weijinshi.com/myoss/data/0EA07C18DFEB8649200F33E8D1C24CD5.png"
        },
        {
          isgood: true,
          name: "500元携程礼品卡一张",
          src:
            "https://f.weijinshi.com/myoss/data/0EA07C18DFEB8649200F33E8D1C24CD5.png"
        },
        {
          isgood: false,
          name: "9元红包券一张",
          src:
            "https://f.weijinshi.com/myoss/data/A365E36B7F5977D10119F6344AC591AE.png"
        },
        {
          isgood: false,
          name: "1元红包券一张",
          src:
            "https://f.weijinshi.com/myoss/data/2042B933236641C0980EB2A61721D82F.png"
        },
        {
          isgood: false,
          name: "加息券一张",
          src:
            "https://f.weijinshi.com/myoss/data/92314084C21C345E02421BCF9E6C6916.png"
        },
        {
          isgood: true,
          name: "月饼一盒",
          src:
            "https://f.weijinshi.com/myoss/data/4DC31D0733BB2CF3BFB6D3E3D592006C.png"
        },
        {
          isgood: true,
          name: "桂花酒一瓶",
          src:
            "https://f.weijinshi.com/myoss/data/A657B51ABBEAB137E98DEF0D850F7957.png"
        }
      ],
      message: {
        title: "情满中秋，月圆金石",
        icon_url:
          "https://f.weijinshi.com/myoss/data/BD14E6F3B933B09313DD1B3296C13A93.jpg",
        synopsis: "出借享双倍收益 最高得万元红包",
        link_url: "/midAutumn?IsDownload=1&recommendCode=" + this.recommendCode
      }
    };
  },
  created() {
    //url存缓存，保存参数
    window.localStorage.search = this.search;
    //如果是活动页获取幸运值与已得奖励
    if (this.userId) {
      this.getData();
      this.getShareInfo();
    } else if (this.recommendCode) {
      //若为分享出去的页面，调用方法（用于后端判断是否打开此页面）
      this.clickShare();
    }
  },
  mounted() {
    console.log(this.userId);
    this.linkUrl = "/midAutumn2" + this.search;
  },
  methods: {
    //抽奖点击按钮
    clickBtn(type) {
      if (this.userId) {
        //活动页面
        this.luckDraw(type);
      } else if (this.appInfo && !this.userId) {
        window.location.href = "/opennative?name=APP_LOGIN" + "&params=";
      } else {
        //分享出去的页面
        this.registerURl =
          "/wx/loginAndRegiste/relaxedFBRegister.html?channelName=WJS&IsDownload=1&recommendCode=" +
          this.recommendCode;
        this.alertType = "share";
        this.alertShow = true;
      }
    },
    //转动转盘
    rotating() {
      this.timer = null;
      this.alertType = "tip";
      this.hasReward = this.rewards[this.index].src;
      this.rewardName = this.rewards[this.index].name;
      let angel =
        this.startAngle +
        360 * 6 +
        (this.index + 1) * 40 -
        20 -
        (this.startAngle % 360); //计算旋转角度
      this.startAngle = angel;
      this.rotateAngle = "rotate(" + angel + "deg)";
      this.timer = setTimeout(() => {
        this.click_flag = true;
        this.alertShow = true;
        this.getData();
      }, 5100);
    },
    //抽奖
    luckDraw(type) {
      if (!this.click_flag) return false;
      this.click_flag = false;
      this.$http
        .POST("/app/midAutumnActivity", { type: type, userId: this.userId })
        .then(res => {
          if (res.code == 1) {
            if (!res.data) {
              alert("服务器开小差了，请稍后再试～");
              this.click_flag = true;
            } else {
              this.index = res.data.winNum;
              this.tipMessage = res.data.message;
              this.rotating();
            }
          } else if (res.code == -2) {
            this.alertType = "error";
            this.alertShow = true;
            this.click_flag = true;
          } else {
            this.alertShow = true;
            this.alertType = "waitAlert";
            this.click_flag = true;
            this.waitAlert = res.msg;
          }
        });
    },
    //获取辛运值和获奖记录
    getData() {
      this.$http
        .POST("/app/findAwardList", { userId: this.userId })
        .then(res => {
          if (res.code == 1) {
            this.rewardLists = res.data.recordList || [];
            this.luckValue = res.data.luckyNum || 0;
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
    },
    //统计页面是否打开
    clickShare() {
      this.$http
        .POST("/app/clickShare", { recommendCode: this.recommendCode })
        .then(res => {});
    }
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
      position: absolute;
      text-align: center;
      bottom: -72px;
      left: 50%;
      margin-left: -230px;
      p {
        height: 80px;
        line-height: 80px;
        background: url("https://f.weijinshi.com/myoss/data/D080FE9884391AF16689E4E1DB355325.png")
          no-repeat;
        background-size: 100% 100%;
        color: #ffe327;
        font-size: 34px;
      }
      .tip {
        background: none;
        line-height: 80px;
        font-size: 30px;
        img {
          width: 30px;
          height: 30px;
          margin-top: 22px;
          margin-right: 14px;
        }
      }
    }
  }
  //转盘
  .wheelBox {
    .wheelBg {
      width: 610px;
      height: 713px;
      margin: 105px auto 48px;
      background: url("https://f.weijinshi.com/myoss/data/71E00378A3B891EDD07B394CA1F84928.png")
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      .wheel {
        background: url("https://f.weijinshi.com/myoss/data/CBE74BCD4F19E24AE3304EBA571BED3F.png")
          no-repeat;
        background-size: 100% 100%;
        width: 540px;
        height: 540px;
        position: absolute;
        top: 35px;
        left: 35px;
      }
      .pointer {
        width: 120px;
        height: 140px;
        background: url("https://f.weijinshi.com/myoss/data/F53FB043319B111FF6AA116ED872CAEF.png")
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 230px;
        left: 243px;
      }
    }
    .btn {
      width: 92%;
      height: 90px;
      margin: 0 auto;
      & > div {
        width: 47%;
        height: 90px;
      }
      .firstBtn {
        background: url("https://f.weijinshi.com/myoss/data/46B2C4D252F8249E42888C584F009353.png")
          no-repeat;
        background-size: 100% 100%;
        float: left;
      }
      .lastBtn {
        background: url("https://f.weijinshi.com/myoss/data/5F4035DFAA4867D466B7D8C588EFD358.png")
          no-repeat;
        background-size: 100% 100%;
        float: right;
      }
    }
  }
  //已得奖励
  .reward {
    margin-top: 64px;
    .reward_list {
      width: 92%;
      margin: 42px auto 0;
      color: #ffffff;
      border: 1px solid #5f6fe8;
      li {
        height: 80px;
        line-height: 80px;
        background: #2b4a9e;
        text-align: center;
        div {
          font-size: 30px;
          width: 40%;
          float: left;
          text-align: center;
        }
        div:last-of-type {
          width: 50%;
          margin-left: 10%;
        }
      }
      li:nth-child(2n) {
        background: #1d3b8e;
      }
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
  //弹框样式
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.65);
    .tipAlert {
      position: absolute;
      top: 20%;
      left: 50%;
      margin-left: -312px;
      width: 625px;
      height: 678px;
      background: url("https://f.weijinshi.com/myoss/data/6EB07E9C817FA5CA2989B4FADA28BDDA.png")
        no-repeat;
      background-size: 100% 100%;
      p {
        margin-top: 48px;
        color: #d1311c;
        font-size: 36px;
        text-align: center;
        font-weight: bold;
      }
      img {
        display: block;
        width: 280px;
        margin: 0 auto;
      }
      span {
        text-align: center;
        color: #333333;
        font-size: 30px;
        display: block;
      }
      .btnok {
        background: url("https://f.weijinshi.com/myoss/data/DDDAF7BC68728581A4888FAFBBF8998B.png")
          no-repeat;
        background-size: 100% 100%;
        width: 280px;
        height: 80px;
        position: absolute;
        left: 50%;
        bottom: 50px;
        margin-left: -140px;
      }
    }
    .luckAlert {
      position: absolute;
      top: 10%;
      left: 50%;
      margin-left: -310px;
      width: 620px;
      height: 818px;
      background: url("https://f.weijinshi.com/myoss/data/26B820A463FA4D6A3784BE5F9D5F3E20.png")
        no-repeat;
      background-size: 100% 100%;
      & > div {
        text-align: center;
        color: #ffffff;
        font-size: 36px;
        line-height: 140px;
      }
      & > p {
        width: 517px;
        margin: 40px auto;
        color: #ffffff;
        line-height: 35px;
        font-size: 30px;
      }
      & > span {
        background: url("https://f.weijinshi.com/myoss/data/A0130AF3EE449368941CD0204000CB22.png")
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: 110px;
        height: 110px;
        left: 50%;
        bottom: -110px;
        margin-left: -55px;
      }
    }
    .errAlert {
      position: absolute;
      top: 5%;
      left: 50%;
      margin-left: -310px;
      width: 620px;
      height: 961px;
      background: url("https://f.weijinshi.com/myoss/data/2B397EA28B2559469F466D639A697E9B.png")
        no-repeat;
      background-size: 100% 100%;
      & > span {
        background: url("https://f.weijinshi.com/myoss/data/A0130AF3EE449368941CD0204000CB22.png")
          no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: 110px;
        height: 110px;
        left: 50%;
        bottom: -110px;
        margin-left: -55px;
      }
    }
    .shareAlert {
      width: 620px;
      height: 820px;
      position: absolute;
      top: 15%;
      left: 50%;
      margin-left: -310px;
      .shareClose {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 30px;
        right: 30px;
        background: url("https://f.weijinshi.com/myoss/data/77DBF885177D1BCDCD2D848150A47373.png")
          no-repeat;
        background-size: 100% 100%;
      }
      & > img {
        width: 100%;
        margin-top: 130px;
        margin-bottom: 20px;
      }
      .shareBtn {
        padding: 0 10px;
        & > a {
          width: 290px;
          height: 94px;
        }
        & > a:first-of-type {
          float: left;
          background: url("https://f.weijinshi.com/myoss/data/8908DE9D036ED06C59851273D97B7063.png")
            no-repeat;
          background-size: 100% 100%;
        }
        & > a:last-of-type {
          float: right;
          background: url("https://f.weijinshi.com/myoss/data/52083DF7A85B1DBD69E4ACFF2C52CB8D.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
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
      background-size: 100% 100%;
      width: 186px;
      height: 26px;
      margin-top: 7px;
      float: left;
    }
    span:last-of-type {
      float: right;
    }
  }
  //活动未开始弹窗
  .waitAlert {
    width: 600px;
    height: 358px;
    background: #ffffff;
    border-radius: 12px;
    position: fixed;
    top: 488px;
    left: 50%;
    transform: translateX(-50%);
    h1 {
      text-align: center;
      line-height: 200px;
      font-size: 40px;
    }
    h2 {
      height: 100px;
      border-top: 1px solid #ccc;
      color: blue;
      text-align: center;
      line-height: 100px;
      font-size: 40px;
    }
  }
}
</style>
