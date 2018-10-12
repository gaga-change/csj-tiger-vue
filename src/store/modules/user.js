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
        
          //以下为测试数据
          let response={
            "errorMsg": null,
            "detailError": null,
            "code": "200",
            "data": {
            "phone": "15888802313",
            "computerCode": "4028813062b507430162c727eb4c00e2",
            "name": "管理员",
            "id": "2480",
            "email": "serviceadmin@csjscm.com"
            },
            "success": true
            }
           commit('SET_USERINFO', response.data)
           resolve(response)
           //以下为测试数据

        // getInfo().then(response => {
        //   const data = response.data;
        //   commit('SET_USERINFO', data)
        //   resolve(response)
        // }).catch(error => {
        //   console.log(error)
        //   reject(error)
        // })

      })
    },
  }
}

export default user
