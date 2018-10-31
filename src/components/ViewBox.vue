<template lang="html">
    <div class="weui-tab">
        <slot name="header"></slot>
        <div class="weui-tab__panel" ref="viewBoxBody" id="vux_view_box_body" :style='{paddingTop: bodyPaddingTop, paddingBottom: bodyPaddingBottom}'>
            <slot></slot>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
export default {
  name: "view-box",
  props: ["bodyPaddingTop", "bodyPaddingBottom"],
  methods: {
    scrollTo(top) {
      this.$refs.viewBoxBody.scrollTop = top;
    },
    getScrollTop() {
      return this.$refs.viewBoxBody.scrollTop;
    },
    getScrollBody() {
      return this.$refs.viewBoxBody;
    }
  }
};
</script>

<style scoped lang="less">
.weui-tab {
  position: relative;
  height: 100%;
}
.weui-tab__panel {
  position: relative;
  z-index: 1;
  width: 100%;
  // box-sizing: border-box;
  height: 100%;
  // overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top: 105px;
}
</style>
