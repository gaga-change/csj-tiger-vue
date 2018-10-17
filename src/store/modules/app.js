import Cookies from 'js-cookie'
import { getGys, StroeList, CategorySmall } from '@/api/planorder'
import { CategoryList } from '@/api/category'

// 处理分类数据
function dealCategoryData(data) {
  const realdata = []
  let lev1 = []
  let lev2 = []
  let lev3 = []
  lev1 = data.filter(d => d.levelnum === 1)
  lev2 = data.filter(d => d.levelnum === 2)
  lev3 = data.filter(d => d.levelnum === 3)
  lev1.map(item1 => {
    realdata.push({
      value: item1.requestid,
      label: item1.classname,
      classcode: item1.classcode,
      children: []
    })
    lev2.map(item2 => {
      if (item2.parentclass === item1.requestid) {
        realdata.map(
          r1 => {
            if (r1.value === item2.parentclass) {
              r1.children.push({
                value: item2.requestid,
                label: item2.classname,
                classcode: item2.classcode,
                children: []
              })
            }
          }
        )
        lev3.map(item3 => {
          if (item3.parentclass === item2.requestid) {
            realdata.map(
              r1 => {
                if (r1.value === item2.parentclass) {
                  r1.children.map(r2 => {
                    if (r2.value === item3.parentclass) {
                      r2.children.push({
                        value: item3.requestid,
                        label: item3.classname,
                        classcode: item3.classcode
                      })
                    }
                  })
                }
              }
            )
          }
        })
      }
    })
  })
  return realdata
}

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    storeList: [],
    gysData: [],
    categorySmallList: null,
    categoryList: null,
    bakcategoryList: null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_STORELIST: (state, data) => {
      state.storeList = data
    },
    SET_GYSLIST: (state, data) => {
      state.gysData = data
    },
    SET_CATEGORYSMALL: (state, data) => {
      state.categorySmallList = data
    },
    SET_CATEGORY: (state, data) => {
      state.categoryList = dealCategoryData(data)
    },
    SET_BAKCATEGORY: (state, data) => {
      state.bakcategoryList = data
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    GetStoreList: ({ commit }) => {
      return new Promise((resolve, reject) => {
        StroeList().then(response => {
          const data = response.data
          commit('SET_STORELIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetGysList: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getGys().then(response => {
          const data = response.data
          commit('SET_GYSLIST', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取小分类信息列表
    GetCategorySmall: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CategorySmall().then(response => {
          const data = response.data
          commit('SET_CATEGORYSMALL', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有分类信息
    GetCategoryList: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CategoryList().then(response => {
          const data = response.data
          commit('SET_CATEGORY', data)
          commit('SET_BAKCATEGORY', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
