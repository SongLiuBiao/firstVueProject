<template>
    <div class="loan-container" v-show="showContent" ref="content">
        <div class="plan-tip" v-if="investType == 1">
            <div>
                为了保护借款人信息，仅展示部分撮合中和过往的持有债权信息记录，出借成功后可查看标的匹配情况。
            </div>
        </div>
        <ul class="loan-list" v-infinite-scroll="loadMores"
            infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            <li class="item" v-for="(item, index) in loanList" :key="index" @click="goDetail(item.id)">
                <div class="flex">
                    <div>{{item.showName}}
                        <p class="tit-desc">借款人</p>
                    </div>
                    <div>{{item.idNum}}
                        <p class="tit-desc">身份证号</p>
                    </div>
                    <div>{{item.amount}}
                        <p class="tit-desc">借款金额(元)</p>
                    </div>
                </div>
            </li>
            <li v-if="loadMore" class="load-more">
                <p style="text-align: center">
                    <inline-loading></inline-loading> 加载中
                </p>
            </li>
            <li v-if="!loadMore && loanList.length > 0" class="load-more">
                只展示部分借款信息
            </li>
        </ul>
        <div class="none-wrap" v-if="loanList.length == 0">
            <div class="lend-none"></div>
            <div v-if="investType == 1">
                暂无借款信息
            </div>
            <div v-else>
                <p v-if="enterprise">企业信息详见项目详情</p>
                <p v-else>个人借款信息详见项目详情</p>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
  import { getoanRecord } from '@/api/app'
import InlineLoading from "@/components/inline-loading.vue";
import { mBrowser } from "jrmf-utils";
  import moment from 'moment'
  export default {
    name: "loan-record",
    data(){
      return {
        showContent: false,
        busy: false,
        investType: 0,
        versionCode:'',
        bidIdSign: '',
        bidType: '0',
        loanList: [],
        loadMore: false,
        enterprise: false,
        pageNum: 0,
        pageSize: 10,
        pageCount: 1
      }
    },
    methods: {
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
        }, 500);
      },
      currPage() {
        return ++this.pageNum;
      },
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
      loadData() {
        let oldVersion = this.$getUrlParams('oldVersion')
        this.currPage()
        getoanRecord({bidIdSign: this.bidIdSign,pageSize: this.pageSize, currPage: this.pageNum}).then(res => {
          this.showContent = true
          if(res.code === 1) {
            this.versionCode = res.data.versionCode
            this.investType = res.data.investType
            this.bidType = res.data.type
            if(oldVersion == 'true') this.checkBidType()
            if(res.data.page && res.data.page.length > 0) {
              this.loanList = this.loanList.concat(res.data.page)
            } else if(res.data.loanInfo && res.data.loanInfo.type === 2){
              this.enterprise = true
            }
            this.pageCount = res.data.totalPageCount;
            if(this.pageNum < res.data.totalPageCount) {
              this.loadMore = true
            } else {
              this.loadMore = false
            }
            this.$nextTick(function () {
              this.getClientHeight()
            })
          }
        })
      },
      checkBidType() {
        let path = ''
        let app = this.$getUrlParams('_appInfo') || this.$getUrlParams('oldVersion')
        if(this.bidType == 1 || this.bidType == 2) {
          if(app) {
            path = '/app/loan-detail'
          } else {
            path = '/wx/invest/loan-detail'
          }
          this.$router.push({ // 个体户和企业
            path: path,
            query: {
              btype: this.bidType,
              bidIdSign: this.bidIdSign
            }
          })
        }
      },
      goDetail(recordId) {
        let btype = this.bidType
        let oldVersion = this.$getUrlParams('oldVersion')
        let app = this.$getUrlParams('_appInfo') || this.$getUrlParams('oldVersion')
        if(this.versionCode === 0) return false; // 老标
        if(app){
          if(oldVersion == 'true') {
            this.$router.push({
              path: '/app/loan-detail',
              query: {
                recordId: recordId,
                btype: btype
              }
            })
          }else {
            let params = {
              url: `${location.protocol}//${location.host}/mystatic/app/loan-detail?recordId=${recordId}&btype=${btype}`
            }
            var url = "/opennative?name=WEBVIEW" + "&params=" + encodeURIComponent(JSON.stringify(params))
            window.location.href = url
          }
        } else {
            this.$router.push({
                path: '/wx/invest/loan-detail',
                query: {
                    recordId: recordId,
                    btype: btype
                }
            })
        }
      }
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background: #f5f5f5');
      let btype = this.$getUrlParams('btype')
      this.bidIdSign = this.$getUrlParams('bidIdSign')
      console.log('this.bidIdSign:', this.bidIdSign)
      let app = this.$getUrlParams('_appInfo') || this.$getUrlParams('oldVersion')
      let path = ''
      if(!btype) return;
      if(btype == 1 || btype == 2) {
        if(app) {
          path = '/app/loan-detail'
        }else {
          path = '/wx/invest/loan-detail'
        }
        this.$router.push({ // 个体户和企业
          path: path,
          query: {
            btype: btype,
            bidIdSign: this.bidIdSign
          }
        })
      }
    },
    created() {
      this.bidIdSign = this.$getUrlParams('bidIdSign')
      this.loadData()
      this.callApp()
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '');
    },
    components: {
      InlineLoading
    }
  }
</script>

<style scoped lang="less">
    @import "~@/styles/color";
    .loan-container {
        /*padding: 0px 0px 30px;*/
        min-height: 100%;
        /*min-height: 1148px;*/
        background: @grayf5;
        position: relative;
        .plan-tip {
            font-size: 28px;
            padding-left: 32px;
            background-color: @white;
            div {
                padding: 32px 32px 32px 0px;
                box-shadow: inset 0px -1px 1px -1px @graye8;
            }
        }
        .header {
            display: flex;
            box-shadow: inset 0 0 0 0 #E8E8E8;
            border-bottom: 1px solid #e8e8e8;
            padding-bottom: 30px;
            div {
                flex: 1;
                text-align: center;
                &:nth-child(1) {
                    flex: 1;
                    text-align: left;
                }
                &:nth-child(2) {
                    flex: 1;
                }

                &:last-child {
                    text-align: right;
                }
            }
        }
        .loan-list {
            .load-more {
                font-size: 28px;
                color: @gray9;
                text-align: center;
                padding: 30px 0;
            }
            li {
                &:nth-last-child(2) {
                    border-bottom: 0px;
                    .flex {
                        border-bottom: 0px;
                    }
                }
            }
            .item {
                background-color: @white;
                user-select:none;
                &:active {
                    background-clip: padding-box;
                    background-color: @graye8;
                }
                &:nth-last-child(2) {
                    .flex {
                        border-bottom: 0px;
                    }
                }
                .flex {
                    display: flex;
                    justify-content: center;
                    padding: 30px 30px 30px 0px;
                    margin-left: 30px;
                    font-size: 28px;
                    /*border-bottom: 1px solid #e8e8e8;*/
                    box-shadow: inset 0px -1px 1px -1px @graye8;

                    div {
                        text-align: center;
                        &:nth-child(1) {
                            width: 200px;
                            text-align: left;
                        }
                        &:nth-child(2) {
                            flex: 1;
                        }
                        &:nth-child(3) {
                            text-align: right;
                            flex: 1;
                        }
                    }
                }
                .tit-desc {
                    padding-top: 15px;
                    color: @gray8;
                    font-size: 24px;
                }
            }
        }
        .none-wrap {
            padding: 264px 0px;
            margin: 0 auto;
            text-align: center;
            color: @gray9;
            font-size: 28px;
        }
        .lend-none {
            display: inline-block;
            color: @gray9;
            text-align: center;
            width: 250px;
            height: 228px;
            background: url("https://f.weijinshi.com/test/274FDB8D16F3F09AA24F2AF2000B84C8.png") no-repeat center;
            background-size: 100% 100%;
            /*margin: 264px auto;*/
            /*line-height: 532px;*/
        }
    }
</style>