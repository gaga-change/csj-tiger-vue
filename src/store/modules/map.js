import * as apiMap from '@/api/map'
const map = {
  state: {
    mapConfig: {},
  },
  mutations: {
    SET_MAP: (state, config) => {
      state.mapConfig = config
    },
  },

  actions: {
    // 获取枚举信息
    gitMap({ commit, state }) {
      return new Promise((resolve, reject) => {
        config().then(res=>{
          commit('SET_MAP',res );
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }

  }
}

async function config() {
  let config={};
  for(let i in apiMap){
    await  apiMap[i]().then(res=>{
      if(res.success){
        if(Array.isArray(res.data)){
          config[i]=res.data
        } else{
          let arr=[];
          for(let prop in res.data){
              arr.push({
                key:prop,
                value:res.data[prop]
              }) 
          }
          config[i]=arr
        }
      } 
     }).catch(err=>{
       
     })
  }
  return config
}

export default map