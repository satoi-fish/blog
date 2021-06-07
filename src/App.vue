<template>
  <div id="app">
    <TabBar class="TabBar" />
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from "components/content/TabBar";

export default {
  name: "app",
  components: {
    TabBar,
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
</style>
