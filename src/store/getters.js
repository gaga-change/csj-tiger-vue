const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import { reportCenterUrl} from '@/utils'
import { deepExistMenu,jsonFamart}  from '@/utils/deepSortMenu'

const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  gysList: state => state.app.gysData,
  storeList: state => state.app.storeList,
  visitedViews: state => state.tagsView.visitedViews,
  company: state => state.user.company,
  companyId: state => state.user.companyId,
  mapConfig:state=>state.map.mapConfig,
  permission_codes: state => state.user.permissionCodes,
  markArr:state=>state.menu.markArr,
  mark:state=>state.menu.mark,
  menu: state => {
    let bakmenus = state.user.userInfo&&state.user.userInfo.menus&&JSON.parse(state.user.userInfo.menus)||[]
    return deepExistMenu(jsonFamart(bakmenus,_import,Layout,reportCenterUrl),state.menu.localMenu)
    // return state.menu.localMenu
  }
}

export default getters
