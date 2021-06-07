<!--  -->
<template>
  <div class="register">
    <div class="title">
      注册页面{{username}}
    </div>
    <div class="wrap">
      <form action="" class="formWrap">
        <span>用户名</span>
        <input type="text" v-model.lazy.trim="username" placeholder="用户名或者邮箱">
        <span>密码</span>
        <input type="password" v-model.lazy="password1" placeholder="密码">
        <span>确认密码</span>
        <input type="password" v-model="password2" placeholder="再输入一次密码">
        <button class="btn" onmouseover="this.style.backgroundColor='rgba(49, 49, 49,0.11)';" 
        onmouseout="this.style.backgroundColor='rgb(39, 39, 39)';">注册</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username:'',
      password1:'',
      password2:''
    };
  },
};
</script>
<style scoped>
.register{
  position: relative;
  top: 58px;
  color: #fff;
  display: flex;
  flex-direction: column; 
  align-items: center;
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
