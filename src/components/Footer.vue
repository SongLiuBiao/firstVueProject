<template>
    <footer class="xf-footer">
        <!-- <a :href="redirctUrl('/')"><i class="xf-computer"></i>web端</a>
        <a href="tel:4008-690-611" class="xf-tell"><i class="xf-contact"></i>联系我们</a> -->
        <article class="xf-article">©2016&nbsp;微金石&nbsp;All&nbsp;rights&nbsp;reserved<br>
                                      浙ICP备16002241号-1
        </article>
        <article class="xf-article" style="margin-top:16px">
          温馨提示：市场有风险，出借需谨慎
        </article>
    </footer>
</template>

<script>
export default {
  name: "w-footer",
  methods: {
    redirctUrl(url) {
      return `${process.env.VUE_APP_WX_URL}${url}`;
    }
  }
};
</script>

<style scoped lang="less">
.xf-footer {
  background: #f5f5f5;
  position: relative;
  width: 100%;
  padding: 32px 0 32px 0;
  font-size: 22px;
  color: #b2b2b2;
}

.xf-footer a {
  color: #999;
  position: absolute;
  top: 32px;
  left: 3.125%;
  margin-left: 32px;
}

.xf-footer .xf-tell {
  left: auto;
  right: 3.125%;
  margin-right: 32px;
}
.xf-computer,
.xf-contact {
  background-image: url("https://f.weijinshi.com/test/32438C3B50FFE18A70BB957ED9D3B607.png");
  display: inline-block;
  background-size: 400px 400px;
  vertical-align: middle;
  width: 45px;
  height: 45px;
  background-position: -60px 0;
  margin-right: 32px;
}

.xf-contact {
  width: 33px;
  height: 33px;
  background-position: -105px 0;
}

.xf-article {
  text-align: center;
  line-height: 30px;
}
</style>
