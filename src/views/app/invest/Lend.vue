<template>
    <div class="lend-container" ref="content" v-show="showContent">
        <template v-if="lendList">
            <div class="header">
                <div>出借人</div>
                <div>出借金额（元）</div>
                <div>出借时间</div>
            </div>
            <ul class="lend-list" v-infinite-scroll="loadMores"
                infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                    <li class="item" v-for="item in lendList" :key="item.id">
                        <div>{{item.mobile}}</div>
                        <div>{{item.amount}} 元</div>
                        <div>{{formatDate(item.time)}}</div>
                    </li>
                    <li v-if="loadMore" class="load-more" @click="loadData">
                        <p style="text-align: center">
                            <inline-loading></inline-loading> 加载中
                        </p>
                    </li>
                    <li v-if="!loadMore" class="load-more">
                        <span v-if="pageNum > 5">只显示最近100条出借记录~</span>
                        <span v-else>没有更多了</span>
                    </li>
            </ul>
        </template>
        <template v-else>
            <div class="lend-none">
                <span>暂无记录</span>
            </div>
        </template>
    </div>
</template>
  
<script>
/* eslint-disable */
  import {getInvestBidRecords} from '@/api/app'
import InlineLoading from "@/components/inline-loading.vue";
import { mBrowser } from "jrmf-utils";
  import moment from 'moment'
  export default {
    name: "lend",
    data() {
      return {
        lendList: [],
        showContent: false,
        busy: false,
        loadMore: false,
        pageNum: 0,
        pageSize: 20,
        pageCount: 1,
      }
    },
    beforeCreate() {
      document.querySelector("body").setAttribute("style", "background: #f5f5f7");
    },
    beforeDestroy() {
      document.querySelector("body").setAttribute("style", "");
    },
    created() {
      this.loadData();
      this.callApp();
    },
    methods: {
      formatDate(date) {
        return moment(date).format("MM.DD HH:mm")
      },
      getClientHeight() {
        console.log(this.$refs.content.clientHeight)
        let height = this.$refs.content.clientHeight
        if (mBrowser.versions.android) {
          window.js_java_android.setClientHeight(height);
        } else {
          this.$bridge.callhandler(
            "setClientHeight",
            height
          );
        }
      },
      currPage() {
        return ++this.pageNum;
      },
      callApp() {
        // ios 分页临时处理
        this.$bridge.registerhandler(
          "loadMores",
          () => {
            this.loadMores();
          }
        );
      },
      loadMores() {
        this.busy = true;
        setTimeout(() => {
          if (this.pageNum < this.pageCount) {
            this.loadData();
            this.busy = false;
          }
        }, 1000);
      },
      loadData() {
        this.currPage();
        let _appInfo = this.$getUrlParams("_appInfo");
        let bidIdSign = this.$getUrlParams('bidIdSign');
        console.log("_appInfo", _appInfo);
        getInvestBidRecords({
          _appInfo: _appInfo,
          bidIdSign: bidIdSign,
          pageSize: this.pageSize,
          currPage: this.pageNum
        }).then(res => {
          if (res.code == 1) {
            this.showContent = true;
            if (res.data.page.length > 0) {
              this.lendList = this.lendList.concat(res.data.page);
            }
            this.pageCount = res.data.totalPageCount;
            if (this.pageNum < res.data.totalPageCount) {
              this.loadMore = true;
            } else {
              this.loadMore = false;
            }
            this.$nextTick(function () {
              this.getClientHeight()
            })
          }
        });
      }
    },
    components: {
      InlineLoading
    }
  }
</script>

<style scoped lang="less">
    @import "~@/styles/color";
    .load-more {
        color: @gray9;
        text-align: center;
        font-size: 28px;
        padding: 20px;
    }
    .lend-container {
        min-height: 100%;
        background: @grayf5;
        .header {
            padding: 32px 32px 0px 32px;
            display: flex;
            color: @gray9;
            font-size: 28px;
            background: @white;
            div {
                flex: 1;
                text-align: center;
                &:nth-child(1) {
                    text-align: left;
                }
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
        .lend-list {
            font-size: 28px;
            background: @white;
            padding: 0px 32px 32px 32px;
            .item {
                display: flex;
                padding-top: 48px;
                div {
                    flex: 1;
                    text-align: center;
                    &:nth-child(1) {
                        text-align: left;
                    }
                    &:nth-child(3) {
                        text-align: right;
                    }
                }
            }
        }
        .lend-none {
            color: @gray9;
            text-align: center;
            font-size: 28px;
            margin: 32px auto;
            position: relative;
        }
    }
</style>