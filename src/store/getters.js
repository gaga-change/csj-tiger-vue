import { asyncRouterMap } from '@/router'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import { deepExistMenu } from '@/utils/deepSortMenu'

const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  gysList: state => state.app.gysData,
  storeList: state => state.app.storeList,
  visitedViews: state => state.tagsView.visitedViews,
  company: state => state.user.company,
  companyId: state => state.user.companyId,
  mapConfig: state => state.map.mapConfig,
  permission_codes: state => state.user.permissionCodes,
  markArr: state => state.menu.markArr,
  fetchMapLocationMenu: state => deepExistMenu(state.user.fetchMenu, asyncRouterMap),
  mark: state => state.menu.mark,
  menu: state => deepExistMenu(state.user.fetchMenu, state.menu.localMenu),
  // menu:state=>state.menu.localMenu
}

export default getters
