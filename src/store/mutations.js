import {CHANGE_LOGIN,
  CHAGNE_TIPS,
  CHAGNE_SHOWTIPS,
  CHANGE_PAGES,
  CHANGE_SHOWSELECT,
}
from "./mutation-types";



export default  {
  [CHANGE_LOGIN](state,payload){
    state.showLogin = payload.showLogin
    state.username = payload.username
  },
  [CHAGNE_TIPS](state,payload){
    state.tips = payload
  },
  [CHAGNE_SHOWTIPS](state,payload){
    state.showTips = payload
  },
  [CHANGE_PAGES](state,payload){
    state.pages++
  },
  [CHANGE_SHOWSELECT](state,payload){
    state.showSelect = payload
  },
}