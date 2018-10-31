<template>
    <div class="spinner" ref="load"></div>
</template>

<script>
import { Spinner } from "jrmf-utils";
export default {
  name: "inline-loading",
  mounted() {
    let load = this.$refs.load;
    Spinner(load, "ios-small");
  }
};
</script>

<style lang="less">
.spinner {
  display: inline-block;
  vertical-align: text-bottom;
  width: 50px;
  height: 50px;
  stroke: #444;
  fill: #444;
}
</style>
