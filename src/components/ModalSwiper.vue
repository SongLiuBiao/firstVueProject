<template>
    <div>
        <transition name="v-fade">
            <div class="model-mask" @click="hide" v-show="showValue"></div>
        </transition>
        <transition name="v-dialog">
            <div v-show="showValue">
                <!--<div class="swiper-container model-swiper" @click="hide">-->
                    <!--<div class="swiper-wrapper">-->
                        <!--<div class="swiper-slide" v-for="(item, index) in imgList">-->
                            <!--<img width="100%" :src="item" alt="">-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <swiper :options="swiperOption" class="model-swiper" ref="mySwiper" @click="hide">
                    <swiper-slide v-for="(slide, index) in imgList" :key="index">
                        <img width="100%" :src="slide" alt="">
                    </swiper-slide>
                </swiper>
                <!-- Add Pagination -->
                <div class="swiper-pagination model-pagination"></div>
            </div>
        </transition>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "modal-swiper",
  data() {
    return {
      mySwiper: "",
      showValue: false,
      slideIndex: 0,
      swiperOption: {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".model-pagination"
        }
      },
      imgList: [],
      isActive: false
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    swiperIndex: {
      type: Number,
      default: 0
    },
    imgUrls: {
      type: Array
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    console.log("isShow:", this.value);
    this.NoScroll();
  },
  methods: {
    hide: function() {
      this.showValue = false;
      // this.$emit('update:show', false)
      this.$emit("change", false);
      this.NoScroll();
    },
    NoScroll() {
      console.log("slideIndex:", this.slideIndex);
      // this.mySwiper.slideTo(this.slideIndex);
      this.swiper.slideTo(this.slideIndex);
      if (this.showValue) {
        document.body.className = "no-scroll";
      } else {
        document.body.className = "";
      }
    }
  },
  watch: {
    value(val) {
      this.showValue = val;
    },
    imgUrls(val) {
      this.imgList = val;
    },
    swiperIndex(val) {
      this.slideIndex = val;
    },
    showValue(val) {
      // this.show = val
      this.$emit("input", val);
      this.NoScroll();
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less">
@import "~@/styles/transition";
.no-scroll {
  position: fixed;
  width: 100%;
  height: 100%;
}
.model-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 1;
}

.model-swiper {
  position: fixed;
  width: 100%;
  height: 928px !important;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
.model-pagination {
  position: fixed;
  bottom: 50px;
  &.swiper-pagination-bullets {
    width: 100%;
    /*bottom: -170px;*/
    .swiper-pagination-bullet {
      width: 14px;
      height: 14px;
      background-color: white;
      opacity: 0.5;
      margin: 0 4px;
      &.swiper-pagination-bullet-active {
        background-color: white;
        opacity: 1;
      }
    }
  }
}
.swiper-container {
  width: 100%;
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
