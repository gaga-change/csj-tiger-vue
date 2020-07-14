import { getInfo } from '@/api'
import { jsonFamart } from '@/utils/deepSortMenu'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import { reportCenterUrl } from '@/utils'
// import { connectSocket } from '@/api/socket'


const user = {
  state: {
    userInfo: null,
    company: null,
    companyId: null,
    permissionCodes: [],
    fetchMenu: []
  },

  mutations: {
    SET_USERINFO: (state, info) => {
      state.userInfo = info;
      let bakmenus = info.menus || [];
      state.fetchMenu = jsonFamart(bakmenus, _import, Layout, reportCenterUrl).filter(v => !v.hidden)
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_COMPANYID: (state, id) => {
      state.companyId = id
    },
    SET_PERMISSIONCODES: (state, permissionCodes) => {
      state.permissionCodes = permissionCodes
    }
  },

  actions: {
    // 获取用户信息
    GetInfo({ commit, state }) {
      return getInfo().then(res => {
        if (res) {
          const data = res.data;
          commit('SET_USERINFO', data)
          commit('SET_PERMISSIONCODES', data.permissionCodes || [])
          commit('SET_COMPANY', data.companyname || '')
          commit('SET_COMPANYID', data.companyid || '')
          // connectSocket(data)
        }
        return res
      })
    }
  }
}

export default user
