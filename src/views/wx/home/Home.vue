<template>
    <view-box>
        <w-header slot="header"></w-header>
        <div class="box-center">
            <!-- slides -->
                  <swiper :options="swiperOption" ref="mySwiper" class="some-swiper" v-if="bannerList.length>1">
                  <swiper-slide v-for="(item,index) in bannerList" :key="index">
                     <a :href="item.url"><img :src="item.image_url" ></a>
                  </swiper-slide>
                  <!-- <swiper-slide>
                    <img src="https://f.weijinshi.com/myoss/data/4C5EC8008D52F36AFE8C8C2885B97509.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="https://f.weijinshi.com/myoss/data/A5A79F6E899C6831B17EB078803CBA01.jpg" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="https://f.weijinshi.com/myoss/data/783EBF8D2E50C2EA0B734A1280E0713B.png" alt="">
                  </swiper-slide>
                  <swiper-slide>
                    <img src="https://f.weijinshi.com/myoss/data/4C5EC8008D52F36AFE8C8C2885B97509.png" alt="">
                  </swiper-slide> -->
                  <div class="swiper-pagination" slot="pagination" ></div> 
          </swiper>
              <div class="box-nav">
                   <a  :href="redirctUrl('/wx/info/showinfosexposenew.html?id=6&columnkey=security')" class="left">
                      <img src="https://f.weijinshi.com/myoss/data/479476BE2E608884A14480641E7A6FAF.png">
                      <div>
                        <b>安全保障</b>
                        <p>实力雄厚 值得信赖</p>
                      </div>
                   </a>
                   <a href="javascript:;" class="right"  @click="OpenApp">
                      <div>
                        <b>App下载</b>
                        <p>收益不停 福利多多</p>
                      </div>
                       <img src="https://f.weijinshi.com/myoss/data/B2A6D6C43F4B8159BECAD102A0A9104C.png">
                   </a>
              </div> 
              <div class="box-lend">
                    <p class="p1">微智享-新手专享</p>
                    <div>
                      15.0<span>%</span>
                    </div>
                    <p class="p2">预期年化利率</p>
                    <p class="p3">
                      <span>起投 <i>1000元</i></span>
                      <span>期限 <i>14天</i></span>
                    </p>
                    <router-link to="/select02">立即出借</router-link>
              </div>
              <div class="box-Wplan">
                  <router-link to="/select02" class="left comment">
                       <h1>微智享</h1>
                        <p>智能出借 小额分散</p>
                        <img src="https://f.weijinshi.com/myoss/data/C305D5AE2BED80FE34303918778BBB25.png">
                  </router-link>
                   
                    <div class="middle-line"></div>
                    <a :href="redirctUrl('/wx/invest/towechatinvest.html')" class="right comment">
                        <h1>散标专区</h1>
                        <p>优质项目 直接选择</p>
                        <img src="https://f.weijinshi.com/myoss/data/C4A1EF2124DBAC1FD93A3FA5CF5E9F21.png">
                    </a>
              </div>
        </div>
        
        <w-footer></w-footer>
    </view-box>
</template>

<script>
import { getActivityShareInfo, getBanner } from "@/api/app";
import WHeader from "@/components/Header.vue";
import WFooter from "@/components/Footer.vue";
import ViewBox from "@/components/ViewBox.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import AppOpen from "@/lib/AppOpen";
export default {
  name: "home",
  data() {
    return {
      bannerList: "",
      swiperOption: {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      }
    };
  },
  created() {
    getBanner().then(res => {
      if (res.code == 1) {
        this.bannerList = res.data.banners;
      }
    });
    let token = this.$getUrlParams("token");
    if (token) {
      this.$store.commit("setLoginStatus", token);
    }

    let pid = this.$getUrlParams("pid");
    console.log("pid", pid);
    getActivityShareInfo({ pid: pid }).then(res => {
      if (res.code === 1) {
        this.message = res.data;
      } else if (res.code === 100) {
        this.$router.push({
          path: "/activity-default",
          query: {
            type: "activity"
          }
        });
      }
    });
  },
  methods: {
    redirctUrl(url) {
      return `${process.env.VUE_APP_WX_URL}${url}`;
    },
    OpenApp() {
      AppOpen();
    }
  },
  components: {
    WHeader,
    WFooter,
    ViewBox,
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>
<style scoped lang="less">
.box-center {
  min-height: 970px;
  background: #f5f5f5;
  .some-swiper {
    height: 370px;
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .box-nav {
    height: 136px;
    width: 100%;
    display: flex;
    padding: 30px 50px 26px 54px;
    box-sizing: border-box;
    background-color: #ffffff;

    .left {
      flex: 1;
      border-right: 1px solid #e8e8e8;
      img {
        width: 72px;
        height: 72px;
        float: left;
      }
      div {
        font-size: 22px;
        color: #888888;
        float: left;
        margin-left: 16px;
        b {
          font-size: 28px;
          color: #333333;
          margin: 6px 0 12px 0;
          display: block;
        }
      }
    }
    .right {
      flex: 1;
      img {
        width: 72px;
        height: 72px;
        float: right;
        margin-right: 14.5px;
      }
      div {
        font-size: 22px;
        color: #888888;
        float: right;

        b {
          font-size: 28px;
          color: #333333;
          margin: 6px 0 12px 0;
          display: block;
        }
      }
    }
  }
  .box-lend {
    width: 100%;
    height: 436px;
    background-color: #ffffff;
    box-sizing: border-box;
    margin: 24px 0;
    padding: 40px 0;
    text-align: center;
    .p1 {
      font-size: 32px;
      color: #333333;
      font-weight: 700;
    }
    div {
      margin: 31px 0 16px 0;
      font-size: 64px;
      color: #e55a51;
      font-weight: 700;
      span {
        font-size: 30px;
        font-weight: 400;
      }
    }
    .p2 {
      font-size: 28px;
      color: #888888;
    }
    .p3 {
      margin: 32px 0;
      font-size: 28px;
      color: #888888;
      span:nth-child(2) {
        margin-left: 32px;
      }
      span {
        i {
          font-style: normal;
          color: black;
        }
      }
    }
    a {
      margin: 0 auto;
      width: 686px;
      background: #5b71f9;
      border-radius: 12px;
      display: block;
      height: 80px;
      font-size: 28px;
      color: #ffffff;
      text-align: center;
      line-height: 80px;
    }
  }
  .box-Wplan {
    width: 100%;
    height: 272px;
    background-color: #ffffff;
    display: flex;
    padding-top: 32px;
    box-sizing: border-box;
    .left {
      flex: 1;
    }
    .middle-line {
      width: 1px;
      height: 165px;
      background-color: #e8e8e8;
      margin-top: 20px;
    }
    .right {
      display: block;
      flex: 1;
    }

    .comment {
      text-align: center;
      h1 {
        font-size: 28px;
        color: #333333;
        font-weight: 700;
        margin: 0;
      }
      p {
        font-size: 22px;
        color: #888888;
        margin: 16px 0 22px 0;
      }
      img {
        width: 160px;
        height: 120px;
      }
    }
  }
}
</style>
