<!--  -->
<template>
  <div class="tab-bar" @click="tabClick($event)">
    <div class="tab-bar-contant">
      <div class="tLeft">
        <span class="blogName">Satoi</span>
      </div>
      <div class="tMid">
        <a href="javascript:;" class="homepage">首页</a>
        <a href="javascript:;">分类</a>
        <a href="javascript:;">推荐</a>
        <a href="javascript:;">归档</a>
        <a href="javascript:;">关于我</a>
      </div>
      <div class="tRight" v-if="this.$store.getters.showLogin">
        <a href="javascript:;" class="user">{{this.$store.getters.getusername}}</a>
        <a href="javascript:;" class="info">个人信息</a>
      </div>
      <div class="tRight" v-else="this.$store.getters.showLogin">
        <a href="javascript:;" class="login">登录</a>
        <a href="javascript:;" class="registration" >注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getIsLogin } from "network/home";

export default {
  name: "TabBar",
  data() {
    return {
    };
  },
  methods: {
    tabClick(e){
      if(e.target.className === 'blogName' || e.target.className === 'homepage'){
        this.$router.push('/home').catch(err => err)
      }
      if(e.target.className === 'login'){
        this.$router.push('/login').catch(err => err)
      }
      if(e.target.className === 'registration'){
        this.$router.push('/register').catch(err => err)
      }
      if(e.target.className === 'info'){
        this.$router.push('/backstage').catch(err => err)
      }
    },
  },
  created(){
    getIsLogin().then(data =>{
      // console.log(data);
      if(data.error !== -1){
        data.showLogin = true
        this.$store.dispatch('isChangLogin',data).then(result=>{
          console.log('vuex',result);
        })
      }
    })
  }
};
</script>
<style scoped>
.tab-bar-contant {
  /* font-family: FZBaiZWGTJW; */
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  font-size: 17px;
  height: 58px;
  line-height: 58px;
  display: flex;
  justify-content: center;
}
.tLeft{
  flex:1;
  text-align: center;
  padding-top: 2px;
}
.tLeft img{
  width: 10vw;
}
.blogName{
  font-size: 42px;
  font-family: FZBaiZWGTJW;
  cursor: pointer;
  color: #fff;
}
.tMid {
  flex: 2;
  display: flex;
  justify-content: center;
}
.tRight {
  color: rgb(197, 197, 197);
  flex: 1;
  display: flex;
  justify-content: start;
  flex-shrink: 0;
}
.tRight a{
  text-decoration: none;
  cursor: pointer;
  padding: 0 20px;
  color: rgb(197, 197, 197);
  transition: all .4s;
  box-sizing: content-box;
  margin-left: 10px;
}
.tMid a{
    padding: 0 20px;
    text-align: center;
    /* width: 100px; */
    text-decoration: none;
    cursor: pointer;
    color: rgb(197, 197, 197);
    transition: all .4s;
    box-sizing: content-box;
    margin-left: 10px;
}
a:visited {
  color: rgb(197, 197, 197);
}
a:hover {
  color: #fff;
  background-color: #111;
}
a:active {
  color: #fff;
}
/* @media width>1170px {
  
} */
</style>
