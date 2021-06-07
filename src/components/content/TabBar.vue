<!--  -->
<template>
  <div class="tab-bar">
    <div class="tab-bar-contant">
      <div class="tLeft">
        <span class="blogName" @click="homeClick">Satoi</span>
      </div>
      <div class="tMid">
        <a href="javascript:;" @click="homeClick">首页</a>
        <a href="javascript:;">分类</a>
        <a href="javascript:;">推荐</a>
        <a href="javascript:;">归档</a>
        <a href="javascript:;">关于我</a>
      </div>
      <div class="tRight">
        <a href="javascript:;" @click="LoginClick">登录</a>
        <a href="javascript:;" @click="regClick">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  methods: {
    homeClick(){
      this.$router.push('/home').catch(err => err)
    },
    LoginClick(){
      this.$router.push('/login').catch(err => err)
    },
    regClick(){
      this.$router.push('/register').catch(err => err)

    }
  },
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
.tMid {
  flex: 3;
  display: flex;
  justify-content: center;
}
.tRight {
  flex: 1;
  display: flex;
  justify-content: center;
}
.tab-bar-contant a {
  padding: 0 20px;
  text-decoration: none;
  cursor: pointer;
  color: rgb(197, 197, 197);
  transition:all .4s;
}

a:visited {
  color: rgb(134, 134, 134);
}
a:hover {
  color: #fff;
  background-color: #111;
}
a:active {
  color: #fff;
}
.blogName{
  font-size: 42px;
  font-family: FZBaiZWGTJW;
  cursor: pointer;
  color: #fff;
}
</style>
