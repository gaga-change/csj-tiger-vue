import { asyncRouterMap }  from '@/router'
const menu = {
  state: {
    localMenu: [],
    markArr:['财务管理','仓储运营']
  },

  mutations: {
    SET_LOCALMENU:(state, menu)=>{
      state.localMenu=asyncRouterMap.filter(v=>!v.mark||v.mark===menu) 
    }
  },

  actions: {
    setLocalmenu({ commit },mark) {
      commit('SET_LOCALMENU', mark)  
    }
  }
}



export default menu
