<template>
<div class='midbox'>
  <div class="box">
    <span>{{title}}</span>
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
name:'midbox',
props:{
  title:{
    type:String,
    default(){
      return ''
    }
  },
}
}
</script>

<style scoped>
  .box{
    color: #111;
    width: 180px;
    height: 80px;
    background-color: rgba(255, 255, 255, .8);
    border-radius:50px;
    font-size: 30px;
    text-align:center;
    line-height:75px;
    cursor: pointer;
    font-weight: 600;
    position: relative;
    overflow: hidden;
    /* left: 15%; */
    /* vertical-align:middle; */
  }
  .box:hover{
    color: #fff;
    background-color: #666;
    transition:all .2s;
  }
</style>