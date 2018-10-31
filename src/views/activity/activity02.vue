    <template>
      <div>
        <div class="radio-wrap">
          <keep-alive> 
            <component v-bind:is="tabView"></component>
          </keep-alive> 
           <nav class="radio-group" v-show="isShow"> 
            <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" class="nav" @click="iscur=index,tabChange('select' + (index + 1))">{{tab.name}}</span>
          </nav>
        </div>
      </div>
    </template>
     
    <script>
import select1 from "@/components/select01.vue";
import select2 from "@/components/select02.vue";

export default {
  data() {
    return {
      tabView: "select1",
      tabs: [{ name: "全场加息" }, { name: "什么是微智享" }],
      iscur: 0,
      isShow: false
    };
  },
  components: {
    select1,
    select2
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    },
    Scroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.Scroll);
  }
};
</script>
     
<style scoped lang="less">
nav {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  padding: 32px 0 27px 0;
  box-sizing: border-box;
  :nth-child(1) {
    border-right: 2px solid #dddddd;
  }
  span {
    flex: 1;
    text-align: center;
  }
  .cur {
    color: #5b71f9;
  }
}
</style>
