<template lang="html">
    <div class="go-top">
        <a @click="goTop" ref="btn" title="回到顶部"></a>
    </div>
</template>

<script>
/* eslint-disable */
    let timer
  export default {
    name: "go-top",
    data() {
      return {
        isTop: true
      }
    },
    mounted() {
      this.scrollTop()
    },
    methods: {
      scrollTop () {
        let clientHeight = document.documentElement.clientHeight
        let obtn = this.$refs.btn
        window.onscroll = function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          if (osTop >= clientHeight) {
            obtn.style.display = 'block'
          } else {
            obtn.style.display = 'none'
          }
          if (!this.isTop) {
            clearInterval(timer)
          }
          this.isTop = false
        }
      },
      goTop() {
        timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop
          let ispeed = Math.floor(-osTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          this.isTop = true
          if (osTop === 0) {
            clearInterval(timer)
          }
        }, 30)
      }
    }
  }
</script>

<style scoped lang="less">
    .go-top{
        width: 100%;
        a{
            width: 84px;
            height: 84px;
            position: fixed;
            right: 30px;
            bottom: 30px;
            border: none;
            background: url("../assets/go-top.png") no-repeat;
            background-size: cover;
            display: none;
        }
    }
</style>