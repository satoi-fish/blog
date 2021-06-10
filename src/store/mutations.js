import {CHANGE_LOGIN,CHAGNE_TIPS,CHAGNE_ISTIPS,CHANGE_PAGES,}
        from "./mutation-types";



export default  {
  [CHANGE_LOGIN](state,payload){
    state.isLogin = payload.isLogin
    state.username = payload.username
  },
  [CHAGNE_TIPS](state,payload){
    state.tips = payload
  },
  [CHAGNE_ISTIPS](state,payload){
    state.isTips = payload
  },
  [CHANGE_PAGES](state,payload){
    state.pages++
  }
}