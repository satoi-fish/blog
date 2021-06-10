<!--  -->
<template>
  <div class="register">
    <div class="title">
      注册页面{{registerData.username}}
    </div>
    <div class="wrap">
      <form action="" class="formWrap">
        <span>用户名</span>
        <input type="text" v-model.lazy.trim="registerData.username" placeholder="用户名或者邮箱">
        <span>密码</span>
        <input type="password" @keydown="checkLength" v-model="password1" placeholder="密码">
        <span>确认密码</span>
        <input @keydown.enter="onLogin" type="password" @keydown="checkLength" v-model="password2" placeholder="再输入一次密码">
        <span>{{tips}}</span>
        <button class="btn" 
        @mouseover="mousein"
        @mouseout="mouseout"
        @click="postRegister"
        type="button"
        ref="btn"
        >注册</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import { postRegisterData }  from "network/register";

export default {
  name: "register",
  data() {
    return {
      registerData: {
        username: "",
        password: "",
      },
      password1: "",
      password2: "",
      tips: "",
    };
  },
  computed:{
    isLongEnough(){
      return this.password1.length >= 6 
    },
    isOk(){
      return this.isLongEnough && this.tips === ""
    }
  },
  methods: {
    postRegister() {
      if(this.isOk){
        console.log('ok');
        this.registerData.password = this.password1;
        postRegisterData(this.registerData).then((data) => {
          console.log(data);
          if (data.error !== -1) {
            // 跳转并显示已登录
            data.data.isLogin = true
            this.$store.dispatch('isChangLogin',data.data)
            this.$store.dispatch('changTips','注册成功')
            this.$router.push('/home').catch(err=>err)
          }
        });
      }
    },
    checkLength() {
      if (!this.isLongEnough) {
        this.tips = "长度要大于6哦";
        this.$refs.btn.style.cssText = "background-color:red;";
      }else if(this.isLongEnough){
        this.tips = "";
        this.$refs.btn.style.cssText = "background-color:rgb(39, 39, 39);";
      }
      else if (this.password1 !== this.password2) {
        this.tips = "输入的两次密码不一样哦~"
      }else if(this.password1 === this.password2){
        this.tips = ""
      }
    },
    mousein() {
      console.log(this.tips);
      if (this.tips !== "") {
        this.$refs.btn.style.cssText = "background-color:red;";
      } else {
        this.$refs.btn.style.cssText = "background-color:rgb(39, 39, 39);";
      }
    },
    mouseout() {
      if (this.tips !== "") {
        this.$refs.btn.style.cssText = "background-color:red;";
      } else {
        this.$refs.btn.style.cssText = "background-color:rgb(39, 39, 39);";
      }
    },
  },
  created(){
    console.log(this.isLongEnough);
  }
};
</script>
<style scoped>
.register {
  position: relative;
  top: 58px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title,
.wrap {
  position: absolute;
}
.title {
  top: 50px;
  font-size: 30px;
}
.wrap {
  top: 100px;
  font-size: 20px;
}
.formWrap {
  display: flex;
  flex-direction: column;
}
.formWrap span,
input {
  margin-top: 20px;
}
::-webkit-input-placeholder {
  color: rgb(163, 161, 161);
}
:-moz-placeholder {
  color: rgb(163, 161, 161);
}
::-moz-placeholder {
  color: rgb(163, 161, 161);
}
:-ms-input-placeholder {
  color: rgb(163, 161, 161);
}
.btn {
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
.btn:active {
  border-right-color: #000;
  border-bottom-color: #000;
}
</style>
