    <template>
      <div class="nav-box">
        <div class="radio-wrap">
          <keep-alive> 
            <component v-bind:is="tabView"></component>
          </keep-alive> 
           <nav class="radio-group"> 
            <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}"  @click="iscur=index,tabChange('select' + (index + 1))">{{tab.name}}</span>
          </nav>
        </div>
      </div>
    </template>
     
    <script>
import select1 from "@/components/National01.vue";
import select2 from "@/components/National02.vue";

export default {
  data() {
    return {
      tabView: "select1",
      tabs: [{ name: "集卡抢大礼" }, { name: "微智享加息" }],
      iscur: 0
    };
  },
  components: {
    select1,
    select2
  },
  methods: {
    tabChange: function(tab) {
      this.tabView = tab;
    }
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
  box-sizing: border-box;
  z-index: 99;
  span {
    display: inline-block;
    width: 50%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background: linear-gradient(
      0deg,
      rgba(242, 68, 68, 1),
      rgba(255, 128, 128, 1)
    );
    color: white;
  }

  .cur {
    background: linear-gradient(
      0deg,
      rgba(227, 40, 40, 1),
      rgba(255, 83, 83, 1)
    );
  }
}
</style>
