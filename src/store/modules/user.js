import { getInfo} from '@/api/login'

const user = {
  state: {
    userInfo: null
  },
  mutations: {
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    }
  },

  actions: {
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data;
          commit('SET_USERINFO', data)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
  }
}

export default user
