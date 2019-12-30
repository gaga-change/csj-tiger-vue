import * as apiMap from '@/api/map'
import * as appendMap from '@/utils/enum2'
let turnAppendMap = {}
Object.keys(appendMap).forEach(key => {
  let item = appendMap[key]
  turnAppendMap[key] = item.map(v => ({ value: v.name, key: v.value }))
})
const map = {
  state: {
    mapConfig: {
      loading: true,
      ...turnAppendMap
    },
  },
  mutations: {
    SET_MAP: (state, config) => {
      state.mapConfig = { ...state.mapConfig, ...config }
    },
    ADD_MAP: (state, item) => {
      let temp = { ...state.mapConfig }
      temp[item.name] = item.keyValue
      state.mapConfig = temp
    }
  },
  actions: {
    // 获取枚举信息
    gitMap({ commit, state }) {
      config().then(res => {
        res.loading = false
        commit('SET_MAP', res);
      }).catch(err => {
        console.error(err)
      })
    }

  }
}

async function config() {
  let config = {};
  for (let i in apiMap) {
    await apiMap[i]().then(res => {
      if (res.success) {
        if (i === 'getEnum') {
          config = { ...config, ...res.data }
        } else if (Array.isArray(res.data)) {
          config[i] = res.data
        } else {
          let arr = [];
          for (let prop in res.data) {
            arr.push({
              key: prop,
              value: res.data[prop]
            })
          }
          config[i] = arr
        }
      }
    }).catch(err => {

    })
  }
  return config
}

export default map
