<template>
        <div class="Dialog">
             <div class="box-dialog">
                 <h1>温馨提示</h1>
                 <p>
                     请升级到最新版本，<br>
                     点击按钮到浏览器中打开！
                </p>
                 <div>
                     <span @click="Hidden()">取消</span>
                     <button class="tag-read" data-clipboard-text="http://www.weijinshi.com/app/download" @click="hidden">{{text}}</button>
                 </div>
             </div>
            
        </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {};
  },
  props:['text'],
  
  created() {},
  methods: {
    Hidden() {
      this.$emit("Hidden", false);
    },
    hidden() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
        this.$emit("hidden", [false, true]);
      });
      clipboard.on("error", e => {
        // 不支持复制
          //  this.$emit("hidden", [false, true]);
          window.location.href="http://www.weijinshi.com/app/download";
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>
<style scoped lang="less">
.Dialog {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .box-dialog {
    width: 540px;
    height: 358px;
    background: #ffffff;
    border-radius: 12px;
    position: fixed;
    top: 488px;
    left: 50%;
    transform: translateX(-50%);
    h1 {
      margin: 42px 0 18px 0;
      text-align: center;
      font-size: 36px;
      color: #333333;
    }
    p {
      text-align: center;
      font-size: 30px;
      color: #888888;
      line-height: 50px;
      margin-bottom: 55px;
    }
    div {
      display: flex;
      height: 98px;
      border-top: 2px solid #dddddd;
      line-height: 98px;
      :nth-child(1) {
        border-right: 2px solid #dddddd;
      }
      span {
        flex: 1;
        text-align: center;
        font-size: 36px;
        color: #333333;
        font-weight: 550;
      }
      button {
        flex: 1;
        background: #ffffff;
        border: none;
        font-weight: 550;
        font-size: 36px;
      }
    }
  }
}
</style>
