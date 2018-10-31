<template lang="html">
    <div v-show="showContent">
        <div class="project" v-if="dataMap.version_code == 0">
            <div class="project-box" >
                <p class="title">项目背景</p>
                <div class="project-text" v-html="dataMap.description">
                </div>
            </div>
        </div>
        <template v-else>
            <div class="project">
                <div class="project-box">
                    <p class="title">项目背景</p>
                    <div class="project-text" v-html="dataMap.project_introduction">
                    </div>
                </div>
                <div class="project-box">
                    <p class="title">保障措施</p>
                    <div class="project-text">
                        <p>安全保障</p>
                        <p v-html="dataMap.safeguard"></p>
                        <p class="mt15">还款保障</p>
                        <p v-html="dataMap.repayment_guarantee"></p>
                    </div>
                </div>
                <div class="project-box">
                    <p class="title">风险管理说明</p>
                    <div class="project-text" v-html="dataMap.risk_manage_state">

                    </div>
                </div>
                <div class="project-box" v-if="dataMap.imgUrls">
                    <p class="title">项目资料</p>
                    <div class="project-text">
                        <swiper :options="swiperOption" class="small-swiper" ref="mySwiper" @click="swiperClick">
                            <swiper-slide v-for="(slide, index) in dataMap.imgUrls" :key="index">
                                <img width="100%" :src="slide" alt="">
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="project-box">
                    <p class="title">风险提示</p>
                    <div class="project-text" v-html="dataMap.risk_warning">

                    </div>
                </div>
                <div class="project-box">
                    <p class="title">风控审核</p>
                    <div class="project-text" v-html="dataMap.preaudit_suggest">
                    </div>
                </div>
            </div>
            <div class="tip-desc">
                <span class="tit">温馨提示：</span><br>
                平台将始终秉持客观公正的原则，严控风险，最大程度的尽力确保借入者信息的真实性，但不保证审核信息100%无误。
            </div>
            <modal-swiper v-model="showModal" :swiper-index="swiperIndex" :img-urls="dataMap.imgUrls"></modal-swiper>
        </template>
    </div>
</template>

<script>
import { getProject } from "@/api/app";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ModalSwiper from "@/components/ModalSwiper.vue";
import { mBrowser } from "jrmf-utils";
export default {
  name: "bid-project",
  data() {
    return {
      showContent: false,
      dataMap: {},
      bidIdSign: "",
      showModal: false,
      swiperIndex: 0,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true
      },
      show: true
    };
  },

  created() {
    let bidIdSign = this.$getUrlParams("bidIdSign");
    this.bidIdSign = bidIdSign;
    getProject({ bidIdSign: bidIdSign }).then(res => {
      this.showContent = true;
      if (res.code === 1) {
        this.dataMap = res.data.bid;
        this.$nextTick(function() {
          this.getClientHeight();
        });
      }
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    swiperClick() {
      this.swiperIndex = this.swiper.clickedIndex;
      this.showModal = true;
    },
    getClientHeight() {
      console.log("getClientHeight:" + this.$refs.content.clientHeight);
      let height = this.$refs.content.clientHeight;
      if (mBrowser.versions.android) {
        window.js_java_android.setClientHeight(height);
      } else {
        this.$bridge.callhandler("setClientHeight", height);
      }
    }
  },
  components: {
    ModalSwiper,
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less">
@import "~@/styles/color";
.mt15 {
  margin-top: 15px;
}
.project {
  background: #fff;
  padding: 0px 32px;
  font-size: 28px;
  .project-box {
    padding-top: 48px;
  }
  p.title {
    height: 33px;
    font-size: 32px;
    font-weight: bold;
    color: #030303;
    //border-left: 6px solid @blue;
    padding-left: 16px;
    position: relative;
    &:before {
      content: " ";
      display: inline-block;
      background-color: @blue;
      width: 6px;
      height: 30px;
      position: absolute;
      left: 0px;
      top: 0;
      //transform: translateY(-50%);
    }
  }
  .project-text {
    margin: 24px 0 0 0px;
    overflow: hidden;
    line-height: 48px;
    letter-spacing: -0.41px;
    text-align: justify;
    line-height: 48px;
    img {
      width: 100%;
    }
  }
}
.tip-desc {
  margin-top: 20px;
  padding: 32px 32px 36px 32px;
  font-size: 24px;
  color: @gray8;
  letter-spacing: 0;
  text-align: justify;
  line-height: 48px;
  background-color: @grayf5;
  .tit {
    font-weight: bold;
  }
}
.swiper-container {
  width: 100%;
  height: 180px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  /*background: #fff;*/
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
