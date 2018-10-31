<template lang="html">
    <div>
        <header class="navigation-bar fixed">
            <div class="navigation-box">
                <div class="logo">
                    <a href="#" class="xf-logo"><img src="https://f.weijinshi.com/myoss/data/79429B07177D5E226DF22D158433D01C.png" height="77" /></a>
                </div>
                <div class="icon-box" :class="{active: isActive}" @click="active">
                    <span class="line first"></span>
                    <span class="line second"></span>
                    <span class="line third"></span>
                </div>
            </div>
            <ul class="navigation-menu" :class="{active: isActive}">
                <li v-if="isLogin == false">
                    <router-link to="/wx"><i class="xf-menuico menuico1"></i>主页</router-link>
                    <a :href="redirctUrl('/wx/info/showinfosexpose.html')"><i class="xf-menuico menuico6"></i>信息披露</a>
                    <a :href="redirctUrl('/wx/loginAndRegiste/login.html')"><i class="xf-menuico menuico2"></i>登录</a>
                    <a :href="redirctUrl('/wx/loginAndRegiste/register.html')"><i class="xf-menuico menuico3"></i>注册</a>
                </li>
                <li v-else>
                     <router-link to="/wx"><i class="xf-menuico menuico1"></i>主页</router-link>
                    <a :href="redirctUrl('/wx/account/toaccounthome.html')"><i class="xf-menuico menuico6"></i>账户</a>
                    <a :href="redirctUrl('/wx/info/showinfosexpose.html')"><i class="xf-menuico menuico2"></i>信息披露</a>
                    <a href="javascript:;" @click="loginOut"><i class="xf-menuico menuico3"></i>退出</a>
                </li>
            </ul>
        </header>
        <!-- 遮罩 -->
        <transition name="v-fade">
            <div class="xf-mask" v-show="isActive" @click="active"></div>
        </transition>
    </div>
</template>

<script>
import { loginOut } from "@/api/app";
export default {
  name: "w-header",
  data() {
    return {
      isActive: false,
      isLogin: this.$store.getters.isLogin
    };
  },
  computed: {},
  created() {
    console.log("isLogin:", this.$store.getters.isLogin);
  },
  methods: {
    redirctUrl(url) {
      return `${process.env.VUE_APP_WX_URL}${url}`;
    },
    active() {
      this.isActive = !this.isActive;
    },
    loginOut() {
      loginOut().then(res => {
        console.log(res);
        if (res.code === 1) {
          this.$store.commit("removeLoginStatus");
          this.isActive = false;
          this.isLogin = false;
          console.log("isLogin:", this.$store.getters.isLogin);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/color";
@import "~@/styles/base";
@import "~@/styles/transition";
.flex {
  display: -webkit-flex;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
}
.flex-1 {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  width: 0;
}
.xf-logo {
  height: 75px;
  position: absolute;
  top: 10px;
  left: 3.125%;
}

.xf-logo img {
  height: 100%;
}
.navigation-bar {
  position: absolute;
  width: 100%;
  z-index: 200;
  &.fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    box-shadow: 0 0 3px 2px #eee;
  }

  .navigation-menu {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 135px 0 30px;
    background: #ffffff;
    z-index: 9;
    transition: all 0.3s;
    transform: translateY(-1100px);

    &.active {
      transform: translateY(0);
    }
  }
}

.icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .line {
    width: 40px;
    height: 4px;
    background: #666666;
    transition: all 0.3s;
  }

  &.active {
    .line {
      background: #666666;
    }
  }
  &.active .first {
    transform: translate(0, 13.8px) rotate(-45deg);
  }
  &.active .second {
    opacity: 0;
  }
  &.active .third {
    transform: translate(0, -13.8px) rotate(45deg);
  }
}

.navigation-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 30px;
  transition: all 0.3s;
  z-index: 10;
  background-color: #ffffff;
}

.xf-menuico {
  background-image: url("https://f.weijinshi.com/test/4CCDB352CB371BB83267E8CA4FD26EB9.png");
  display: inline-block;
  background-size: 399px 399px;
  display: block;
  width: 69px;
  height: 69px;
  margin: 0 auto;
}

.menuico1 {
  background-position: -150px 0;
}

.menuico2 {
  background-position: -219.9px 0;
}

.menuico3 {
  background-position: -289.9px 0;
}

.menuico4 {
  background-position: 0 -1.2rem;
}

.menuico5 {
  background-position: -0.933333rem -1.2rem;
}

.menuico6 {
  background-position: -289.9px 0;
}

.navigation-menu {
  position: absolute;
  top: 1.173333rem;
  width: 100%;
  left: 0;
  border-top: 1px solid #fcfcfc;
  background: #fff;
  text-align: center;
}

.navigation-menu a {
  color: #333;
  font-size: 28px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 45px;
  line-height: 40px;
  display: inline-block;
}

.xf-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
