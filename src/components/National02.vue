<template>
    <div style="background: #f5f5f5;padding-bottom:50px">
            <template v-if="appInfo">
                          <div class="box">
                            <template v-if="isTime">
                                     <template v-if="isOver">
                                                <div class="box-2 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                                <div class="box-3 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                                <div class="box-4 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                      </template>
                                      <template v-else>
                                               <div class="box-2 item">
                                                    <a href="javascript:;" @click="GoLendList">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                                <div class="box-3 item">
                                                    <a href="javascript:;"  @click="GoLendList">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                                <div class="box-4 item">
                                                    <a href="javascript:;"  @click="GoLendList">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                      </template>
                            </template>
                            <template v-else>
                            <div class="box-2 item">
                                <a href="javascript:;">
                                  <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                </a>
                            </div>
                            <div class="box-3 item">
                                <a href="javascript:;">
                                    <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                </a>
                            </div>
                            <div class="box-4 item">
                                <a href="javascript:;">
                                    <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                </a>
                            </div>
                            </template>
                        </div>
            </template>
            <template v-else>
                        <div class="box">
                              <template v-if="isTime">
                                      <template v-if="isOver">
                                                <div class="box-2 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                                <div class="box-3 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                                <div class="box-4 item">
                                                    <a href="javascript:;">
                                                        <img src="https://f.weijinshi.com/myoss/data/D6559C097CA0C8C41A36A74628DAA65F.png" >
                                                    </a>
                                                </div>
                                      </template>
                                      <template v-else>
                                               <div class="box-2 item">
                                                    <a href="javascript:;" @click="OpenApp">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                                <div class="box-3 item">
                                                    <a href="javascript:;"  @click="OpenApp">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                                <div class="box-4 item">
                                                    <a href="javascript:;"  @click="OpenApp">
                                                        <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                                    </a>
                                                </div>
                                      </template>
                              </template>
                              <template v-else>
                                    <div class="box-2 item">
                                        <a href="javascript:;">
                                          <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                        </a>
                                    </div>
                                    <div class="box-3 item">
                                        <a href="javascript:;">
                                            <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                        </a>
                                    </div>
                                    <div class="box-4 item">
                                        <a href="javascript:;">
                                            <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                        </a>
                                    </div>
                          </template>
                      </div>
            </template>
             <!-- <Dialog @Hidden="Hidden"  @hidden="hidden" v-show="isShow" ></Dialog>
                <transition name="slide-fade" v-if="isIf">
                      <div class="p">
                          <img src="https://f.weijinshi.com/test/1DA7A22FC4561E85CDDDB444FCF40B27.png" >
                          <p>复制成功</p>
                      </div>
                </transition> -->
                <img src="https://f.weijinshi.com/myoss/data/AEC21AF4E019A57FF5788761189263E4.png" style="width:100%">
          
    </div>
</template>
<script>
import moment from "moment";
import AppOpen from "@/lib/AppOpen";

export default {
  data() {
    return {
      isTime: false, //活动未开始
      isOver: false, //活动结束
      appInfo: this.$route.query._appInfo //获取App用户信息
    };
  },
  created() {
    this.time();
  },
  methods: {
    time() {
      if (moment().valueOf() > moment("2018-10-01 00:00:00").valueOf()) {
        this.isTime = true;
      }

      if (moment().valueOf() > moment("2018-10-11 00:00:00").valueOf()) {
        this.isOver = true;
      }
    },

    //APP 跳转微智享出借列表
    GoLendList() {
      window.location.href = "/opennative?name=APP_INVEST&investType=1";
    },
    //打开APP
    OpenApp() {
      AppOpen();
    }
  }
};
</script>
 <style scoped lang="less">
.box {
  background: url("https://f.weijinshi.com/myoss/data/CAB83F5C30E87BDE9F5A8203537E3617.png")
    no-repeat #1d095a;
  width: 100%;
  background-size: 100% 2450px;
  padding-top: 640px;
  position: relative;
  .item {
    width: 670px;
    height: 542px;
    margin: 60px auto 0 auto;
    position: relative;
    a {
      position: absolute;
      bottom: 44px;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 360px;
        height: 70px;
      }
    }
  }
  .box-2 {
    background: url("https://f.weijinshi.com/myoss/data/D2882C328B50CE083E5DC110D4673B88.png")
      no-repeat;
    background-size: 100%;
  }
  .box-3 {
    background: url("https://f.weijinshi.com/myoss/data/66B4BDF657E3F68D5562D489EC5926A7.png")
      no-repeat;
    background-size: 100%;
  }
  .box-4 {
    background: url("https://f.weijinshi.com/myoss/data/616E8FD324693A46FCFBCF8BC69EC73B.png")
      no-repeat;
    background-size: 100%;
  }
}
</style>
