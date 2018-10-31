<template>
    <div class="box">
        <div class="box-banner"></div>
        <div class="box-content">
                  <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                                <swiper-slide v-for="(i,index) in Images" :key="index">
                                    <template v-if="index==todayCardIndex-1"> 
                                          <img :src="SelectImg[index]">
                                      </template>
                                     <template v-else>
                                          <img :src="i" > 
                                     </template>
                                 
                                </swiper-slide>
                                  <!-- <swiper-slide>
                                    <img src="https://f.weijinshi.com/myoss/data/A5A79F6E899C6831B17EB078803CBA01.jpg" alt="">
                                  </swiper-slide>
                                  <swiper-slide>
                                    <img src="https://f.weijinshi.com/myoss/data/783EBF8D2E50C2EA0B734A1280E0713B.png" alt="">
                                  </swiper-slide>
                                  <swiper-slide>
                                    <img src="https://f.weijinshi.com/myoss/data/4C5EC8008D52F36AFE8C8C2885B97509.png" alt="">
                                  </swiper-slide> -->
                    <!-- Optional controls -->
                </swiper>
                <div class="box-content-title">
                        <template v-if="appInfo">
                                <template v-if="isTime">
                                      <h1>{{DialogText}}</h1>
                                </template>
                                <template v-else>
                                  <h1>今日卡片:{{todayCardName}}</h1>
                                  <h2>今日仅剩:{{todayCardNum}}张</h2>
                                  <p>今日累计出借额满{{todayCardRule}}元即可领取卡片</p>
                                </template>
                              <a href="javascript:;" @click="getCard"></a>
                        </template>
                         <template v-else>
                              <a style="margin-top:50px" href="javascript:;" @click="OpenApp"></a>
                         </template>
                </div>
                <div class="box-content-get">
                       <h1>我已领取的卡片</h1>
                         <ul>
                            <template v-if="myCardList.length > 0">
                               <li v-for="item,index in myCardList" :key="index">
                                <span> {{item.cardName}}</span>
                                <span>{{item.obtainTime}}获得</span>
                              </li>
                            </template>
                            <template v-else>
                                  <div>暂无卡片哦~</div>
                            </template>
                         </ul>
                </div>
                <div class="box-content-footer">
                     <h1>活动规则</h1>
                      <div></div>
                </div>
        </div>
        <div class="Dialog"  v-show="isDialog">
                <div class="Dialog-title">
                   {{DialogText}}
                  <template v-if="ButtonToggle">
                    <span @click="DialogHideen"></span>
                    <a  class="GoLend" href="javascript:;" @click="GoLendList"></a>
                  </template>
                  <template v-else>
                    <a  class="Esc" href="javascript:;" @click="DialogHideen"></a>
                  </template>
                </div>
               
        </div>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getNational, getcard } from "@/api/app";
import AppOpen from "@/lib/AppOpen";
export default {
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        spaceBetween: 20,
        // loop: true,
        slidesPerView: 1.3,
        centeredSlides: true
        // indexNum:1,
        // on: {
        //     slideChange: function () {
        //         // 获取当前活动下标
        //         var index = this.realIndex;
        //         // 过滤重复动作
        //         if (index == 0 && this.indexNum == 0) {
        //             return false;
        //         }
        //         // 当下标为0时
        //         if (index == 0) {
        //             this.indexNum = 0;
        //         } else {
        //             this.indexNum = 1;
        //         }
        //           if (index == 6) {
        //             this.indexNum = 0;
        //         } else {
        //             this.indexNum = 1;
        //         }
        //         console.log(index);
        //     }
        // }
      },
      Images: [
        "https://f.weijinshi.com/myoss/data/2D189FAAD731BA8B257B3A2BB5C3D265.png",
        "https://f.weijinshi.com/myoss/data/28322FCF7B3C3F47423374C47CE1036F.png",
        "https://f.weijinshi.com/myoss/data/F530E4AD0E6EB9F420864BE62A932728.png",
        "https://f.weijinshi.com/myoss/data/EC067D17CCB08AC3D0F9AF7506F961BA.png", //未选中的卡片
        "https://f.weijinshi.com/myoss/data/3DB5C64C1CE74CA3C662F0151A5B4F42.png",
        "https://f.weijinshi.com/myoss/data/74951DF76C4A7861808976B42BB21AAF.png",
        "https://f.weijinshi.com/myoss/data/B04A217A519706DB6602D70B05ECFEEC.png"
      ],
      SelectImg: [
        "https://f.weijinshi.com/myoss/data/A9A43D94B386E6DADBE66435E5FBA69B.png",
        "https://f.weijinshi.com/myoss/data/2D0F4FDB7A3A3A10F9638CB5D92E56B2.png",
        "https://f.weijinshi.com/myoss/data/B7B2B3EBF0F0100D89D783403D0A323F.png",
        "https://f.weijinshi.com/myoss/data/DFAD63ADDB3427CC1BDCA24880E07F9B.png", //选中的卡片样式
        "https://f.weijinshi.com/myoss/data/7AFB48652C61858141B45B2E4D2D2D16.png",
        "https://f.weijinshi.com/myoss/data/2DDDAA7A4F3D32C1072E12656ACC7D58.png",
        "https://f.weijinshi.com/myoss/data/6ACC36CA4C1D2860DE64F69EAA500E3C.png"
      ],
      appInfo: this.$route.query._appInfo, //获取App用户信息
      userId: this.$route.query.userId, //用户ID
      todayCardIndex: null, //卡片索引值
      todayCardName: "", //卡片名称
      todayCardNum: 0, //卡片剩余数量
      todayCardRule: 0, //每天领取卡片的条件
      myCardList: [], //已领取的卡片
      isDialog: false, //弹窗是否显示
      DialogText: "", //弹窗文案
      ButtonToggle: false, // 知道了和去出借按钮的切换
      isTime: false //活动未开始和活动已结束提示
    };
  },
  methods: {
    //领取卡片
    getCard() {
      getcard({ userId: this.userId }).then(res => {
        if (this.appInfo && !this.userId) {
          window.location.href = "/opennative?name=APP_LOGIN" + "&params=";
        } else {
          if (res.code == -3) {
            this.DialogText = res.msg;
            this.isDialog = true;
            this.ButtonToggle = true;
          } else {
            this.getUser(this.userId);
            this.DialogText = res.msg;
            this.isDialog = true;
            this.ButtonToggle = false;
          }
        }
      });
    },
    //点击知道了 隐藏弹窗
    DialogHideen() {
      this.isDialog = false;
    },
    //点击去出借  跳微智享出借列表
    GoLendList() {
      this.isDialog = false;
      window.location.href = "/opennative?name=APP_INVEST&investType=1";
    },
    //打开APP
    OpenApp() {
      AppOpen();
    },

    getUser(USEID) {
      getNational({ userId: USEID }).then(res => {
        if (res.code == 1) {
          this.todayCardIndex = res.data.todayCardIndex;
          this.todayCardName = res.data.todayCardName;
          this.todayCardNum = res.data.todayCardNum;
          this.todayCardRule = res.data.todayCardRule;
          this.myCardList = res.data.myCardList;
          this.swiper.slideTo(this.todayCardIndex - 1, 1000, false);
        } else if (res.code == -1) {
          this.DialogText = res.msg;
          this.isTime = true;
        }
      });
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.appInfo);
    if (this.appInfo) {
      this.getUser(this.userId);
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style scoped lang="less">
.box {
  //banner图片
  .box-banner {
    background: url("https://f.weijinshi.com/myoss/data/2F0FF9E31A730DC3ECCAF0EE2D43D0EE.jpg")
      no-repeat;
    height: 813px;
    background-size: 100% 100%;
  }
  // 页面内容
  .box-content {
    background: rgba(0, 58, 131, 1);
    padding: 50px 0 100px 0;

    //轮播图
    .swiper-container {
      padding-top: 40px;
      .swiper-slide {
        width: 504px;
        height: 717px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .swiper-slide-active {
        height: 797px;
        width: 560px;
        margin-top: -40px;
      }
    }

    //点击领取
    .box-content-title {
      color: white;
      text-align: center;
      & > h1 {
        margin: 40px 0 30px 0;
        font-size: 42px;
        font-weight: 600;
      }
      & > h2 {
        font-size: 36px;
      }
      & > p {
        font-size: 28px;
        color: #fcdc6b;
        margin: 27px 0 30px 0;
      }
      & > a {
        margin: 0 auto;
        display: block;
        width: 460px;
        height: 90px;
        background: url("https://f.weijinshi.com/myoss/data/0BC68EF489311AAEC7C77124FE267A51.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    //我已领取的卡片
    .box-content-get {
      margin: 80px auto 82px auto;
      width: 610px;

      & > h1 {
        background: #e42a2a;
        color: white;
        border-radius: 20px 20px 0 0;
        text-align: center;
        line-height: 80px;
        font-size: 36px;
        margin: 0;
      }
      & > ul {
        border-radius: 0 0 20px 20px;
        overflow: hidden;
        color: white;
        & > li {
          height: 70px;
          width: 100%;
          background: #1a76ea;
          float: left;
          line-height: 70px;
          display: flex;
          justify-content: space-between;
          padding: 0 60px;
        }
        & > :nth-child(2n) {
          background: #005fd6;
        }
        & > div {
          height: 200px;
          background: #1a76ea;
          text-align: center;
          line-height: 200px;
        }
      }
    }
    //活动规则
    .box-content-footer {
      & > h1 {
        width: 612px;
        background: url("https://f.weijinshi.com/myoss/data/DA683BCC92B774D92A146035B66F9760.png")
          no-repeat center;
        background-size: 612px 33px;
        margin: 0 auto;
        text-align: center;
        color: white;
        font-size: 45px;
      }
      & > div {
        height: 1613px;
        width: 100%;
        background: url("https://f.weijinshi.com/myoss/data/6B2490598855CDEE896B048A578E3C85.jpg")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  // 弹窗提示
  .Dialog {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .Dialog-title {
      width: 654px;
      height: 378px;
      background: url("https://f.weijinshi.com/myoss/data/9615FAA2127E79BFC6CB7D6D26D7CA95.png")
        no-repeat;
      background-size: 100% 100%;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 36px;
      text-align: center;
      line-height: 350px;
      & > a {
        position: absolute;
        width: 360px;
        height: 80px;

        bottom: -140px;
        left: 50%;
        transform: translateX(-50%);
      }
      & > span {
        position: absolute;
        width: 78px;
        height: 78px;
        background: url("https://f.weijinshi.com/myoss/data/94FBCFFEB685074B4DDCA3F03ADE25CD.png")
          no-repeat;
        background-size: 100% 100%;
        top: -88px;
        right: 0px;
      }
      .GoLend {
        background: url(https://f.weijinshi.com/myoss/data/218AB4AEACEC46979AF0C73B2E8EA7CF.png)
          no-repeat;
        background-size: 100% 100%;
      }
      .Esc {
        background: url("https://f.weijinshi.com/myoss/data/CC0602009DFAD972AC101963C76D9443.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
