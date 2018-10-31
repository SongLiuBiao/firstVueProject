<template>
    <div class="terrace-container">
        <div class="terrace-title">
            <span class="tit">{{resultMap.title}}</span>
            <p><span>{{resultMap.signature}}</span><span></span><span class="date">{{formatDate(resultMap.show_time)}}</span></p>
        </div>
        <div class="terrace-text" v-html="resultMap.content">
        </div>
    </div>
</template>

<script>
import { getInformationDetail } from "@/api/app";
import moment from "moment";

export default {
  name: "news-detail",
  data() {
    return {
      resultMap: {}
    };
  },
  created() {
    let _appInfo = this.$getUrlParams("_appInfo");
    console.log("_appInfo", _appInfo);
    let pId = this.$route.query.pid;
    getInformationDetail({ _appInfo: _appInfo, pid: pId }).then(res => {
      if (res.code === 1) {
        this.resultMap = res.data;
      } else if (res.code === 100) {
        this.$router.push({
          path: "/activity-default",
          query: {
            type: "news"
          }
        });
      }
    });
  },
  methods: {
    formatDate(date) {
      if (date) {
        return moment(date).format("YYYY年MM月DD日");
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less">
@import "~@/styles/color";
.terrace-container {
  background: white;
  padding-left: 32px;
  padding-right: 32px;
  img {
    width: 100%;
  }
  .terrace-title {
    margin: 0px 0 25px 0;
    padding-top: 42px;
    font-size: 32px;
    .tit {
      font-weight: bold;
    }
    p {
      color: @gray8;
      font-size: 24px;
      margin-top: 10px;
      position: relative;
      span {
        display: inline-block;
      }
      .date {
        margin-left: 18px;
      }
    }
  }

  .terrace-text {
    font-size: 28px;
    line-height: 50px;
    color: #4a4a4a;
    img {
      width: 100%;
    }
  }
}
</style>
