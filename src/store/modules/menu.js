import { asyncRouterMap } from '@/router'
import router from '@/router';
import store from '@/store'
import _ from 'lodash';
const menu = {
  state: {
    localMenu: [],
    markArr: ['出入库', '基础档案', '物流', '财务', '物流费用'],
    mark: '基础档案',
    addedMark: [],
  },

  mutations: {
    SET_LOCALMENU: (state, menu) => {
      if (state.mark === menu) return
      state.localMenu = asyncRouterMap.filter(v => !v.mark || v.mark === menu);
      state.mark = menu;
      let group = _.groupBy(store.getters.fetchMapLocationMenu, v => v.mark);
      state.markArr = Object.keys(group).filter(v => v !== 'undefined')
      if (!state.addedMark.includes(menu)) {
        state.addedMark.push(menu)
        router.addRoutes(store.getters.menu)
      }
    }
  },

  actions: {
    setLocalmenu({ commit }, mark) {
      return new Promise((resolve, reject) => {
        commit('SET_LOCALMENU', mark);
        resolve();
      })
    }
  }
}



export default menu
