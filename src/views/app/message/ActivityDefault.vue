<template>
    <div class="default-container">
        <div class="lend-none"></div>
        <div class="desc" v-if="isActivity">活动不见了</div>
        <div class="desc" v-else>找不到内容了</div>
    </div>
</template>

<script>
export default {
  name: "activity-default",
  data() {
    return {
      isActivity: true
    };
  },
  created() {
    let type = this.$getUrlParams("type");
    console.log("type", type);
    if (type == "news") {
      this.isActivity = false;
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
.default-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .desc {
    display: block;
    line-height: 44px;
    font-size: 36px;
    color: @black;
    padding: 24px 0px;
  }
}
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
}
.lend-none {
  display: inline-block;
  color: @gray9;
  text-align: center;
  width: 250px;
  height: 228px;
  background: url("https://f.weijinshi.com/test/274FDB8D16F3F09AA24F2AF2000B84C8.png")
    no-repeat center;
  background-size: 100% 100%;
  /*margin: 264px auto;*/
  /*line-height: 532px;*/
}
</style>
