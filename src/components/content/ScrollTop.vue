<template>
  <div class="scrolltop">
      <div class="up"></div>
  </div>
</template>

<script>
export default {
  name: "scrolltop",
};
</script>

<style scoped>
.scrolltop{
  color: #000;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, .7);
  border-radius:100px;
  cursor:pointer;

  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 99999999999999;
}
.scrolltop:hover{
  background-color: rgba(255, 255, 255, 1);
}
.up{
  display: inline-block;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate(-50%,-50%);
  
  width: 40px;
  height: 44px;
  background-color: rgba(0, 0, 0, .8);
  clip-path: polygon(0 50%,50% 0,100% 50%,88% 74%,60% 35%,60% 100%,40% 100%,40% 35%,12% 74%);
}
.up:hover{
  background-color: #000;
}
</style>