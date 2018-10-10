const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import {asyncRouterMap}  from '@/router'
const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  menu: state => {
    return asyncRouterMap
  }
}
export default getters
