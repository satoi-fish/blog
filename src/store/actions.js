import { CHAGNE_TIPS, CHANGE_LOGIN, CHAGNE_ISTIPS,CHANGE_PAGES,}
        from "./mutation-types";

export default {
  isChangLogin({state,commit},payload){
    return new Promise((resolve,reject)=>{
      // 后端传回数据显示保存登录信息可为已登录
      if(payload){
        commit(CHANGE_LOGIN,payload)
        resolve(true)
      }else{
        reject(false)
      }
    })
  },
  changeTips({state,commit},payload){
    if(payload !== ''){
      commit(CHAGNE_TIPS,payload)
      commit(CHAGNE_ISTIPS,true)
      setTimeout(() => {
        commit(CHAGNE_ISTIPS,false)
        commit(CHAGNE_TIPS,'')
      }, 1090);
    }
  },
  changePages({state,commit},payload){
    commit(CHANGE_PAGES)
  }
}