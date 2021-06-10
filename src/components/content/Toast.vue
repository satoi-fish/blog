<template>
  <div class="toast" v-show="this.$store.state.isTips">
    <div>
      <span>{{this.$store.getters.getTips}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "toast",
};
</script>

<style scoped>
.toast{
  width: 250px;
  height: 100px;
  background-color: rgba(0, 0, 0, .5);
  border-radius:7px;
  backdrop-filter: blur(10px);

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999999;
  transform: translate(-50%,-50%);
  
  font-size: 20px;
  color: #fff;
  text-align: center;
  vertical-align:middle;
  line-height: 100px;
}
</style>