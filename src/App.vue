<template>
  <div id="app">
    <TabBar class="TabBar" />
    <VueDataLoading
        :watch-scroll="true"
        :listens="['infinite-scroll', 'scrolling']"
        @infinite-scroll="infiniteScroll"
        > 
    <router-view></router-view>
    </VueDataLoading>
    <Toast />
    <BackTop class="backtop" :visibilityHeight="600">
        <ScrollTop />
    </BackTop>
  </div>
</template>

<script>
import TabBar from "components/content/TabBar";
import Toast from "components/content/Toast";
import ScrollTop from "components/content/ScrollTop";
import VueDataLoading from "vue-data-loading"
import { BackTop } from 'ant-design-vue';


export default {
  name: "app",
  data(){
    return{
      pages: 1,
      timer:null,
    }
  },
  components: {
    TabBar,
    Toast,
    ScrollTop,
    VueDataLoading,
    BackTop,
  },
  methods:{
    infiniteScroll() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // console.log(123);
            this.$store.dispatch('changePages')
        }, 400);
    },
  },
};
</script>
<style scoped>
@import "./assets/css/normalize.css";
@font-face {
  font-family: "FZBaiZWGTJW";
  src: url("./assets/fonts/FZBaiZWGTJW.TTF");
  font-weight: normal;
  font-style: normal;
}
html,body,#app{
  /* font-family: FZBaiZWGTJW; */
  height: 100%;
}

.TabBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.backtop{
  bottom: 10px;
}
</style>
