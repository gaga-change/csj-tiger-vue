const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import {asyncRouterMap}  from '@/router'
const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  gysList: state => state.app.gysData,
  visitedViews: state => state.tagsView.visitedViews,
  company: state => state.user.company,
  companyId: state => state.user.userInfo.companyId,
  permission_codes: state => state.user.userInfo.permissionCodes,

  menu: state => {
    return asyncRouterMap
  }
}
export default getters
