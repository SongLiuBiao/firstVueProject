<template>
    <div class="news-container" v-show="showContent">
        <div class="notice-panel">
            <ul class="news-content" v-infinite-scroll="loadMores"
                infinite-scroll-disabled="busy">
                <li class="item" v-for="(item, index) in dataList" :key="index" @click="goDetail(item.id)">
                    <div class="date">{{formatDate(item.show_time)}}</div>
                    <div class="box" @click="goDetail(item.id)">
                        <p class="tit">{{item.title}}</p>
                        <div class="con">
                            <img v-if="item.image_url" width="100%" :src="item.image_url" alt="">
                            <img v-else width="100%" src="../../../assets/default.png" alt="">
                        </div>
                        <p class="det">
                            查看详情
                        </p>
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
    </div>
</template>

<script>
import { getInformationList } from "@/api/app";
import InlineLoading from "@/components/inline-loading.vue";
import { mScroll } from "jrmf-utils";
import moment from "moment";
export default {
  name: "news",
  data() {
    return {
      showContent: false,
      busy: false,
      dataList: [],
      loadMore: false,
      pageNum: 0,
      pageCount: 1,
      pageSize: 10,
      key: "info_app_company"
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
    scrollMore() {
      let scrollTop = mScroll.getScrollTop();
      console.log("document.body.scrollTop:", scrollTop);
      console.log("window.body.clientHeight:", document.body.clientHeight);
      console.log("document.body.scrollHeight:", document.body.scrollHeight);
      if (
        scrollTop + document.body.clientHeight ==
        document.body.scrollHeight
      ) {
        console.log("滚动到底部了~~");
        if (this.pageNum < this.pageCount) {
          setTimeout(() => {
            this.loadData();
          }, 500);
        }
      }
    },
    goDetail(pid) {
      this.$router.push({
        path: "/app/news-detail",
        query: {
          pid: pid
        }
      });
    },
    currPage() {
      return ++this.pageNum;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    loadData() {
      this.currPage();
      let _appInfo = this.$getUrlParams("_appInfo");
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
    InlineLoading
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.news-container {
  background-color: @grayf5;
  min-height: 100%;
}
.news-content {
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
    margin-bottom: 25px;
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
      font-size: 32px;
      color: @black;
      margin-bottom: 8px;
    }
    .con {
      font-size: 26px;
      line-height: 40px;
      color: @gray9;
      padding: 32px 24px;
      overflow: hidden;
      position: relative;
    }
    .omit {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .det {
      padding: 26px 0px 24px 32px;
      display: block;
      font-size: 28px;
      color: @black;
      border-top: 1px solid #e8e8e8;
      position: relative;
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
        top: 35px;
        right: 32px;
      }
    }
  }
}
</style>
