import { asyncRouterMap }  from '@/router'
import router from '@/router';
import store from '@/store'
const menu = {
  state: {
    localMenu: [],
    markArr:['财务管理','仓储运营']
  },

  mutations: {
    SET_LOCALMENU:(state, menu)=>{
      state.localMenu=asyncRouterMap.filter(v=>!v.mark||v.mark===menu);
      // console.log(state.localMenu)
      router.addRoutes(store.getters.menu)
      // console.log(store.getters.menu)
    }
  },

  actions: {
    setLocalmenu({ commit },mark) {
      return new Promise((resolve, reject) => {
        commit('SET_LOCALMENU', mark);
        resolve();
      })
    }
  }
}



export default menu
