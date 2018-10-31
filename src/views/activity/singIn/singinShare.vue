<template>
      <div class="box">
             <div class="Redpacket">
                 <img @click="getRedPachet" src="https://f.weijinshi.com/myoss/data/EEAA8CF403EDE1E661149D29BA92B4E9.png" class="getBtn">
             </div>
      </div>
</template>

<script>
export default {
  name: "singinShare",
  data(){
    return{
      recommendCode:this.$route.query.recommendCode,
      channelName:'WJSDK'
    }
  },
  methods:{
      getRedPachet:function(){
          window.location.href=`https://twjs1.weijinshi.com/wx/loginAndRegiste/relaxedFBRegister.html?channelName=${this.channelName}&recommendCode=${this.recommendCode}`
      }
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 1760px;
  background: url("https://f.weijinshi.com/myoss/data/038B4CCA7A539F3ECE54BBF7E12AE677.png")
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  .Redpacket {
    width: 464px;
    height: 397px;
    background: url("https://f.weijinshi.com/myoss/data/73E660EE8AD8FEE089C8886ECFEF3995.png")
      no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 466px;
    left: 50%;
    transform: translateX(-50%);
    .getBtn {
      width: 341px;
      height: 91px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 57px;
    }
  }
}
</style>
 