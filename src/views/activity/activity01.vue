<template>
    <div class="">
        <h2>activity01</h2>
        <p>title: {{message.title}}</p>
        <p>iconUrl: {{message.icon_url}}</p>
        <p>content: {{message.synopsis}}</p>
        <p>shareUrl: {{message.link_url}}</p>
        <p><a class="btn" @click="clickApp">调用app</a></p>
        <br>
    </div>
</template>

<script>
import { getActivityShareInfo } from "@/api/app";
import { mBrowser } from "jrmf-utils";
export default {
  name: "activity01",
  data() {
    return {
      message: {
        title: "title1",
        icon_url:
          "https://f.weijinshi.com/myoss/data/BD14E6F3B933B09313DD1B3296C13A93.jpg",
        synopsis: "出借享双倍收益 最高得万元红包",
        link_url: "https://www.baidu.com/"
      }
    };
  },
  created() {
    let _appInfo = this.$getUrlParams("_appInfo");
    console.log("_appInfo", _appInfo);
    let pid = this.$route.query.pid;
    getActivityShareInfo({ _appInfo: _appInfo, pid: pid }).then(res => {
      console.log(res);
      if (res.code == 1) {
        this.message = res.data;
        this.clickApp(JSON.stringify(this.message));
      } else if (res.code === 100) {
        this.$router.push({
          path: "/activity-default",
          query: {
            type: "activity"
          }
        });
      }
    });

    this.$bridge.registerhandler(
      "activityShareInfo",
      (data, responseCallback) => {
        console.log(this.message);
        responseCallback(JSON.stringify(this.message));
      }
    );

    window.activityShareInfo = function() {
      return JSON.stringify({
        title: "title1",
        icon_url:
          "https://f.weijinshi.com/myoss/data/BD14E6F3B933B09313DD1B3296C13A93.jpg",
        synopsis: "出借享双倍收益 最高得万元红包",
        link_url: "https://www.baidu.com/"
      });
    };
  },
  methods: {
    clickApp(data) {
      console.log("versions", mBrowser.versions.android);
      if (mBrowser.versions.android) {
        window.js_java_android.setShareData(data);
      } else {
        this.$bridge.callhandler(
          "setShareData",
          data,
          function responseCallback(responseData) {
            console.log("JS received response:", responseData);
          }
        );
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.btn {
  display: block;
  font-size: 24px;
  width: 256px;
  height: 28px;
  line-height: 28px;
  color: @white;
  background-color: @blue;
  border-radius: 200px;
  padding: 15px 30px;
  text-align: center;
}
</style>
