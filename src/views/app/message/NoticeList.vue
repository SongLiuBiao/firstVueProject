<template>
    <div class="notice-container" v-show="showContent">
        <div class="notice-panel">
            <ul class="plat-content" v-infinite-scroll="loadMores" infinite-scroll-disabled="busy">
                <li class="item" v-for="(item, index) in dataList" :key="index">
                    <div class="date">{{formatDate(item.show_time,"YYYY-MM-DD HH:mm")}}</div>
                    <div class="box">
                        <p class="tit">{{item.title}}</p>
                        <div class="con" v-html="item.content">
                        </div>
                        <div class="det">
                            <p class="author">{{item.source_from}}</p>
                            <p class="time">{{formatDate(item.show_time,"YYYY年MM月DD日")}}</p>
                        </div>
                    </div>
                </li>
                <li v-if="loadMore" class="load-more" @click="loadData">
                    <p style="text-align: center">
                        <inline-loading></inline-loading> 加载中
                    </p>
                </li>
                <li v-if="!loadMore" class="load-more">
                    没有更多了
                </li>
            </ul>
        </div>
        <go-top></go-top>
    </div>
</template>

<script>
import { getInformationList } from "@/api/app";
import GoTop from "@/components/GoTop.vue";
import InlineLoading from "@/components/inline-loading.vue";
import moment from "moment";
export default {
  name: "notice-list",
  data() {
    return {
      showContent: false,
      busy: false,
      dataList: [],
      loadMore: false,
      pageNum: 0,
      pageSize: 10,
      pageCount: 1,
      key: "info_bulletin_app"
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadMores() {
      this.busy = true;
      setTimeout(() => {
        if (this.pageNum < this.pageCount) {
          this.loadData();
          this.busy = false;
        }
      }, 500);
    },
    currPage() {
      return ++this.pageNum;
    },
    formatDate(date, format) {
      return moment(date).format(format);
    },
    loadData() {
      this.currPage();
      console.log("this.pageNum:", this.pageNum);
      let _appInfo = this.$getUrlParams("_appInfo");
      console.log("_appInfo", _appInfo);
      getInformationList({
        _appInfo: _appInfo,
        columnKey: this.key,
        pageSize: this.pageSize,
        currPage: this.pageNum
      }).then(res => {
        if (res.code == 1) {
          this.showContent = true;
          if (res.data.page.length > 0) {
            this.dataList = this.dataList.concat(res.data.page);
          }
          this.pageCount = res.data.totalPageCount;
          if (this.pageNum < res.data.totalPageCount) {
            this.loadMore = true;
          } else {
            this.loadMore = false;
          }
        }
      });
    }
  },
  components: {
    GoTop,
    InlineLoading
  }
};
</script>

<style lang="less">
@import "~@/styles/color";
.notice-container {
  background-color: @grayf5;
  min-height: 100%;
}
.plat-content {
  min-height: 100%;
  padding: 40px 0px;
  .item {
    padding-bottom: 40px;
  }
  .load-more {
    color: @gray9;
    text-align: center;
    font-size: 28px;
  }
  .date {
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 290px;
    height: 44px;
    background-color: @grayc;
    border-radius: 200px;
    text-align: center;
    line-height: 44px;
    color: @white;
    font-size: 28px;
    /*border用来解决安卓端字体偏上的问题*/
    border: 1px solid transparent;
  }
  .box {
    width: 690px;
    margin-left: auto;
    margin-right: auto;
    background-color: @white;
    border-radius: 6px;
    padding: 32px 0px 0px 0px;
    .tit {
      padding-left: 32px;
      font-size: 30px;
      color: @black;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .con {
      padding-left: 32px;
      padding-right: 30px;
      font-size: 26px;
      line-height: 40px;
      color: @gray3;
      padding-bottom: 8px;
      position: relative;
      img {
        width: 100%;
      }
      .btn-det {
        position: absolute;
        color: #175199;
        bottom: 8px;
        right: 30px;
        background: #fff;
        z-index: 0;
        height: 40px;
        line-height: 40px;
        font-size: inherit;
        &:before {
          content: "";
          display: block;
          position: absolute;
          height: 100%;
          left: -5em;
          right: 0;
          background: #fff;
          z-index: -1;
          transition: mask-size 0.22s cubic-bezier(0.95, 0.05, 0.795, 0.035),
            max-height 0.32s cubic-bezier(0.95, 0.05, 0.795, 0.035),
            -webkit-mask-size 0.22s cubic-bezier(0.95, 0.05, 0.795, 0.035);
          mask-image: linear-gradient(
            270deg,
            #1a1a1a calc(100% - 5em),
            transparent
          );
          mask-size: 100% 100%;
        }
      }
    }
    .det {
      padding: 25px 30px;
      margin-left: 32px;
      display: block;
      font-size: 28px;
      color: @black;
      position: relative;
      text-align: right;
      .author {
        font-weight: bold;
      }
      .time {
        padding-top: 5px;
        font-size: 24px;
        color: @gray8;
      }
    }
  }
}
</style>
