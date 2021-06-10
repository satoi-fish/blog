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
    background-color: #eee;
    border-radius:50px;
    font-size: 30px;
    text-align:center;
    line-height:75px;
    cursor: pointer;
    font-weight: 600;
    /* vertical-align:middle; */
  }
</style>