<template>
    <div style="background: #f5f5f5;padding-bottom:50px">
          <div class="box" >
               <template v-if="isTime">
                     <img class="box-icon" src="https://f.weijinshi.com/myoss/data/8158A1D8D5CB0CC39676485E32737F7F.png" alt="">
               </template>
              <template>
                    <template v-if="appInfo">
                               <div class="box-1 "  v-if="isTime">
                                     <template v-if="isShow_9_9">
                                        <h1>限时返现1.99% <span>（仅剩{{money}}万）</span></h1>
                                        <a href="javascript:;">
                                          <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                         </a>
                                    </template>
                                    <template v-else>
                                        <h1>限时返现1.99% <span>（仅剩{{money}}万）</span></h1>
                                        <a href="javascript:;"  @click="show">
                                             <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                         </a>
                                   </template>
                              </div>
                              <div class="box-2 item">
                                    <a href="javascript:;" @click="show">
                                      <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                    </a>
                              </div>
                              <div class="box-3 item">
                                  <a href="javascript:;"  @click="show">
                                      <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                  </a>
                              </div>
                              <div class="box-4 item">
                                  <a href="javascript:;"  @click="show">
                                      <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                  </a>
                              </div>
                    </template>
                      <template v-else>
                            <div class="box-1"  v-if="isTime">
                                <template v-if="isShow_9_9">
                                        <h1>限时返现1.99% <span>（仅剩{{money}}万）</span></h1>
                                        <a href="javascript:;">
                                          <img src="https://f.weijinshi.com/myoss/data/A57DA4525AA8C9F646C7BC953E3707E2.png" >
                                         </a>
                                </template>
                                 <template v-else>
                                        <h1>限时返现1.99% <span>（仅剩{{money}}万）</span></h1>
                                        <a href="javascript:;"  @click="OpenApp">
                                             <img src="https://f.weijinshi.com/myoss/data/1C6FDF004B8C21DB4FBAD319012D324A.png" >
                                         </a>
                                </template>
                            </div>
                            <div class="box-2 item">
                                  <a href="javascript:;"  @click="OpenApp">
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
              <!-- <template v-else>
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
              </template> -->
          </div>
             <Dialog @Hidden="Hidden"  @hidden="hidden" v-show="isShow" ></Dialog>
                <transition name="slide-fade" v-if="isIf">
                      <div class="p">
                          <img src="https://f.weijinshi.com/test/1DA7A22FC4561E85CDDDB444FCF40B27.png" >
                          <p>复制成功</p>
                      </div>
                </transition>
                <template v-if="isTime">
                    <img style="width:100%"  src="https://f.weijinshi.com/myoss/data/C2B3E1B2E4A6A678749A2F6C17C2D151.png">
                </template>
                <template v-else>
                    <img style="width:100%" src="https://f.weijinshi.com/myoss/data/1EF5520DC214B1BB5A47F58D950DA289.png">
                </template>
        
          
    </div>
</template>
<script>
import AppOpen from "@/lib/AppOpen";
import Dialog from "@/components/Dialog.vue";
import moment, { months } from "moment";
import { getWZX } from "@/api/app";

export default {
  data() {
    return {
      isShow: false,
      isIf: false,
      appInfo: "",
      appVersion: 0,
      isTime: true,
      obj: "",
      money: 0,
      isShow_9_9: true
    };
  },
  created() {
    this.appInfo = this.$getUrlParams("_appInfo");
    if (this.appInfo) {
      this.obj = JSON.parse(this.appInfo);
      this.appVersion = parseInt(this.obj.appVersion) / 100;
    }
    this.time();
    getWZX().then(res => {
      if (res.code == 1) {
        this.money = res.canAmount;
      }
    });
  },
  methods: {
    time() {
      // 判断  1.99限时返现，9.9号之前显示
      if (moment("2018-09-10 00:00:00") <= moment()) {
        this.isTime = false;
      }
      //判断  9.9号当天按钮'立即出借'
      if (
        moment() > moment("2018-09-09 00:00:00") &&
        moment() < moment("2018-09-10 00:00:00")
      ) {
        this.isShow_9_9 = false;
      }
    },

    // 调用APP
    OpenApp() {
      AppOpen();
    },
    //APP 跳转微智享出借列表
    show() {
      if (this.appVersion < 2) {
        this.isShow = true;
      } else {
        window.location.href = "/opennative?name=APP_INVEST&investType=1";
      }
    },
    // 弹窗显示
    Hidden(isShow) {
      this.isShow = isShow;
    },
    // 弹窗隐藏
    hidden(arr) {
      this.isShow = arr[0];
      this.isIf = arr[1];
      setInterval(() => {
        this.isIf = false;
      }, 1000);
    }
  },

  components: {
    Dialog
  }
};
</script>
 <style scoped lang="less">
.box {
  background: url("https://f.weijinshi.com/myoss/data/176FF20E004A04747FEB00EB2A8A2727.png")
    no-repeat #1d095a;
  width: 100%;
  background-size: 100% 2450px;
  padding-top: 640px;
  position: relative;
  .box-icon {
    position: absolute;
    width: 101px;
    height: 95px;
    top: 83px;
    right: 62px;
  }
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
  .box-1 {
    width: 670px;
    height: 796px;
    background: url("https://f.weijinshi.com/myoss/data/29A345EBDA3FFC7ED37D1BA62738FF89.png")
      no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
    padding-top: 15px;
    box-sizing: border-box;
    h1 {
      font-size: 40px;
      color: #0fffff;
      text-align: center;
      font-weight: 700;
      span {
        color: white;
      }
    }
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
    background: url("https://f.weijinshi.com/myoss/data/48986C1B3C7E64E82C00099D3E3E9EB3.png")
      no-repeat;
    background-size: 100%;
  }
  .box-3 {
    background: url("https://f.weijinshi.com/myoss/data/2353930417FDCEB6B67743CF5712D706.png")
      no-repeat;
    background-size: 100%;
  }
  .box-4 {
    background: url("https://f.weijinshi.com/myoss/data/A2157F85B265599790CCF00A0D5CAE0D.png")
      no-repeat;
    background-size: 100%;
  }
}
.p {
  width: 180px;
  height: 180px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 500px;
  border-radius: 6px;
  text-align: center;
  img {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  p {
    position: absolute;
    bottom: 50px;
    color: #ffffff;
    width: 100%;
    font-size: 25px;
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  opacity: 1;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 0;
}
</style>
