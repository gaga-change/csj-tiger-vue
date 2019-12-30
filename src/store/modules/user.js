import { getInfo } from '@/api'
import { jsonFamart, isJSON } from '@/utils/deepSortMenu'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import { reportCenterUrl } from '@/utils'
import io from 'socket.io-client'

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
      let bakmenus = info.menus && isJSON(info.menus) && JSON.parse(info.menus) || [];
      state.fetchMenu = jsonFamart(bakmenus, _import, Layout, reportCenterUrl)
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
          connectSocket(data)
        }
        return res
      })
    }
  }
}

function connectSocket(user) {
  /** 发布环境 - 监听版本更新 */
  const userId = user.id + '#' + user.email + '#' + user.phone
  const username = user.truename
  if (process.env.NODE_ENV !== "development") {
    let nowVersion = process.env.IMAGE_TAG
    const roomName = location.hostname
    // const roomName = 'shark.csjmro.com'
    const socket = io('http://csj-center-egg-v2.shop.csj361.com/user', {
      // 实际使用中可以在这里传递参数
      query: {
        room: roomName,
        userId,
        username,
        version: process.env.IMAGE_TAG
      }
    })
    /** 监听版本通知 */
    socket.on('exchange', msg => {
      const { data } = msg
      const { action, payload } = data
      if (action === 'version update' && payload.version) {
        if (nowVersion !== payload.version) {
          nowVersion = payload.version
          update(nowVersion)
        }
      }
    });
    function update(v) {
      Notification({
        title: '提示',
        message: `当前系统版本更新，刷新页面获取最新内容！当前版本：${process.env.IMAGE_TAG}，最新版本：${v}`,
        duration: 0
      });
    }
  }
}

export default user
