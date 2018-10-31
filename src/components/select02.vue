<template>
     <div class="box">
          <img src="https://f.weijinshi.com/myoss/data/8F1052F84D8ED0ED47F2217EBEB171F9.png" class="box-header" @click="OpenApp()"/>
          <img src="https://f.weijinshi.com/myoss/data/F5ABB34CA97D14AC6087E5E7B5BB390B.png" class="box-content"/>
     </div>
</template>

<script>
import AppOpen from "@/lib/AppOpen";
export default {
  data() {
    return {};
  },
  methods: {
    //打开App
    OpenApp() {
      AppOpen();
    }
  }
};
</script>
 <style scoped lang="less">
.box {
  background: #f5f5f5;
  .box-header {
    width: 100%;
    height: 500px;
  }
  .box-content {
    width: 100%;
    height: 1455px;
  }
}
</style>
