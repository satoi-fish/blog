<template>
  <div class="toast" v-if="this.$store.state.showTips">
    <div >
      <span class="wrapper">{{this.$store.getters.getTips}}
        <div class="btn" v-if="this.$store.state.showSelect">
          <span class="cancel" @click="btnFalse">取消</span>
          <span class="confirm" @click="btnTrue">确定</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "toast",
  methods:{
    btnTrue(){
      this.$store.dispatch('selected')
      this.$bus.$emit('selected',true)
    },
    btnFalse(){
      this.$bus.$emit('selected',false)
      this.$store.dispatch('selected')
    },
  },
  beforeDestroy(){
    this.$bus.$off('changeShowSelect')
  }
};
</script>

<style scoped>
.toast{
  width: 350px;
  height: 150px;
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
  /* vertical-align:middle; */
  /* line-height: 140px; */
}
.wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15%;
}
.btn{
  color: #000;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.btn span{
  background-color: rgba(255, 255, 255, .5);
  border-radius:10px;
  width: 75px;
  cursor: pointer;
}
.btn span:hover{
  background-color:#eee;
  transition:all 0.8s;
}
</style>