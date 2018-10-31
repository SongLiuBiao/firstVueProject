<template>
    <div class="activity-container" v-show="showContent">
        <div class="notice-panel">
            <ul class="news-content" v-infinite-scroll="loadMores"
                infinite-scroll-disabled="busy">
                <li class="item " :class="{end: !item.is_use}" v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
                    <div class="date">{{formatDate(item.show_time)}}</div>
                    <div class="box" @click="goDetail(item.id)">
                        <p class="tit">{{item.title}}</p>
                        <div class="con">
                            <div class="img-wrap">
                                <img v-if="item.image_url" width="100%" :src="item.image_url" alt="">
                                <img v-else width="100%" src="../../../assets/default.png" alt="">
                            </div>
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
import moment from "moment";
export default {
  name: "activity",
  data() {
    return {
      showContent: false,
      busy: false,
      dataList: [],
      loadMore: false,
      pageNum: 0,
      pageSize: 10,
      pageCount: 1,
      key: "app_activity"
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
      }, 1000);
    },
    goDetail(obj) {
      if (obj.is_use) {
        window.location.href = obj.content;
      }
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
      let userId = this.$getUrlParams("userId");
      let source = this.$getUrlParams("source");
      console.log("_appInfo", _appInfo);
      getInformationList({
        _appInfo: _appInfo,
        userId: userId,
        source: source,
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
.activity-container {
  background-color: @grayf5;
  min-height: 100%;
}
.news-content {
  /*min-height: 100%;*/
  padding: 40px 0px;
  .item {
    padding-bottom: 40px;
    &.end {
      .img-wrap {
        position: relative;
        &:after {
          content: "活动已结束";
          font-size: 36px;
          color: @white;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.7);
        }
      }
      .det {
        color: @grayc;
      }
    }
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
      font-size: 30px;
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
      border-top: 1px solid @graye8;
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
