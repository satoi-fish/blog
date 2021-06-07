<!--  -->
<template>
  <div class="banner">
    <img class="image" :src="imageData" alt="">
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {};
  },
  props:{
    imageData:{
      type:String,
      default(){
        return ''
      }
    },
  },
  created(){
  },
};
</script>
<style scoped>
.banner{
  position:absolute;
  top: 0;
  width: 100%;
  min-height: calc( 30vh + 58px + 140px);
}
.banner img{
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(.6);
}
</style>
