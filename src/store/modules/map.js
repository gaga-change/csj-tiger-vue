import * as apiMap from '@/api/map'
import * as appendMap from '@/utils/enum'
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
      apiAndLocalJoin(state.mapConfig)
    },
    ADD_MAP: (state, item) => {
      let temp = { ...state.mapConfig }
      temp[item.name] = item.keyValue
      state.mapConfig = temp
    },
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
    },
    updateMap({ commit }) {
      getEnum().then(res => {
        commit('SET_MAP', res);
      }).catch(err => {
        console.error(err)
      })
    }
  }
}

async function getEnum() {
  let config = {};
  await apiMap['getEnum']().then(res => {
    if (res.success) {
      config = { ...config, ...toNumber(res.data) }
    }
  }).catch(err => {
  })
  return config;
}

async function config() {
  let config = {};
  for (let i in apiMap) {
    await apiMap[i]().then(res => {
      if (res.success) {
        if (i === 'getEnum') {
          config = { ...config, ...toNumber(res.data) }
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

function apiAndLocalJoin(config) {
  config['billTypeTotal'] = [...config['getBillType'], ...config['localBillType']]
}

/** 将字符串转为数字 */
function toNumber(map) {
  for (let key in map) {
    let item = map[key]
    item.forEach(v => {
      if (/^\d+$/.test(v.key)) {
        v.key = Number(v.key)
      }
    })
  }
  return map
}

export default map
