import { 
  CHAGNE_TIPS, 
  CHANGE_LOGIN, 
  CHAGNE_SHOWTIPS,
  CHANGE_PAGES,
  CHANGE_SHOWSELECT,
}
from "./mutation-types";

export default {
  isChangLogin({state,commit},payload){
      // 后端传回数据显示保存登录信息可为已登录
      if(payload){
        commit(CHANGE_LOGIN,payload)
        return true
      }else{
        return false
      }
  },
  async changeTips({state,commit},payload){
    if(payload === '') return
    if(state.tips === ''){
      commit(CHAGNE_TIPS,payload)
      commit(CHAGNE_SHOWTIPS,true)
      setTimeout(() => {
        commit(CHAGNE_SHOWTIPS,false)
        commit(CHAGNE_TIPS,'')
      }, 2090);
    }else if(state.showBtn === false){
      setTimeout(() => {
        commit(CHAGNE_TIPS,payload)
        commit(CHAGNE_SHOWTIPS,true)
        setTimeout(() => {
          commit(CHAGNE_SHOWTIPS,false)
          commit(CHAGNE_TIPS,'')
        }, 2090);
      }, 200);
    }
    // else{
    //   console.log(1);
    //   await this.$bus.$on('selected',(d)=>{
    //     if(!d === null){
    //       commit(CHAGNE_TIPS,payload)
    //       commit(CHAGNE_SHOWTIPS,true)
    //       setTimeout(() => {
    //         commit(CHAGNE_SHOWTIPS,false)
    //         commit(CHAGNE_TIPS,'')
    //       }, 2090);
    //     }
    //   })
    // }
  },
  selected({state,commit}){
    setTimeout(() => {
      commit(CHANGE_SHOWSELECT,false)
      commit(CHAGNE_SHOWTIPS,false)
      commit(CHAGNE_TIPS,'')
    }, 200);
  },
  async changeShowSelect({state,commit},payload){
      if(payload !== ''){
        commit(CHAGNE_TIPS,payload)
        commit(CHAGNE_SHOWTIPS,true)
        commit(CHANGE_SHOWSELECT,true)
      }
  },
  changePages({state,commit},payload){
    commit(CHANGE_PAGES)
  }
}