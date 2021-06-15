<!--  -->
<template>
  <div class="login">
    <div class="title">
      登录页面
    </div>
    <div class="wrap">
      <form action="" class="formWrap">
        <span>用户名</span>
        <input type="text" @keydown.enter="onLogin" v-model="loginData.username" placeholder="用户名或者邮箱">
        <span>密码</span>
        <input type="password" @keydown.enter="onLogin" v-model="loginData.password" placeholder="密码">
        <button class="btn" type="button"
        onmouseover="this.style.backgroundColor='rgba(49, 49, 49,0.11)';" 
        onmouseout="this.style.backgroundColor='rgb(39, 39, 39)';"
        @click="onLogin"
        >登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "network/login";

export default {
  name: "login",
  data() {
    return {
      loginData:{
        username:'',
        password:'',
      },
      tips:'',
    };
  },
  methods:{
    onLogin(){
      // console.log(this.loginData);
      login(this.loginData).then(result =>{
        console.log(result);
        if(result.error !== -1){
          result.data.showLogin = true
          this.$store.dispatch('isChangLogin',result.data)
          this.$store.dispatch('changeTips','登录成功')
          this.$router.push('/home').catch(err=>err)
        }else{
          this.$store.dispatch('changeTips','账号或密码错误') 
        }
      })
    }
  }
};
</script>
<style scoped>
.login{
  position: relative;
  top: 58px;
  color: #fff;
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.login input {
  color: #000;
}
.title,.wrap{ 
  position: absolute;
}
.title{
  top: 50px;
  font-size: 30px;
}
.wrap{
  top: 100px;
  font-size: 20px;
}
.formWrap{
  display: flex;
  flex-direction: column;
}
.formWrap span,input{
  margin-top: 20px;
}
::-webkit-input-placeholder{
  color: rgb(163, 161, 161);
}
:-moz-placeholder{
  color: rgb(163, 161, 161);
}
::-moz-placeholder{
  color: rgb(163, 161, 161);
}
:-ms-input-placeholder{
  color: rgb(163, 161, 161);
}
.btn{
  font-size: 18px;
  color: #fff;
  margin-top: 40px;
  cursor: pointer;
  background-color: rgb(39, 39, 39);
  border-top-color: rgb(39, 39, 39);
  border-left-color: rgb(39, 39, 39);
  height: 35px;
  width: 130px;
  border-radius: 12px;
  align-self: center;
}
.btn:active{
  border-right-color: #000;
  border-bottom-color: #000;
}
</style>
