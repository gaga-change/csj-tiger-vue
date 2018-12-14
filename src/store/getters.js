const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import { reportCenterUrl} from '@/utils'
import { deepSortMenu, sortMenu, deepExistMenu }  from '@/utils/deepSortMenu'

import { asyncRouterMap }  from '@/router'

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

  menu: state => {
    return asyncRouterMap
  }
  
  // menu: state => {

  //   let bakmenus = state.user.userInfo&&state.user.userInfo.menus&&JSON.parse(state.user.userInfo.menus)||[]
  //   let bakmenu = deepExistMenu(bakmenus,asyncRouterMap)

  //   // bakmenu = deepSortMenu(bakmenu, deepSort,)
  //   const menutemp = []
  //   bakmenu.forEach(item => {
  //     const subchildren = []
  //     if (item.children && item.children.length) {
  //       item.children.forEach(subitem => {
  //         subchildren.push({
  //           path: subitem.path,
  //           component: subitem.component ? _import(subitem.component) : null,
  //           name: subitem.code,
  //           meta: JSON.parse(subitem.meta),
  //           outLinkUrl: subitem.outLinkUrl ? reportCenterUrl(subitem.outLinkUrl) : '',
  //           hidden: subitem.hidden === 'true'
  //         })
  //       })
  //     }
  //     menutemp.push({
  //       path: item.path,
  //       component: item.component === 'Layout' ? Layout : null,
  //       redirect: item.redirect,
  //       name: item.code,
  //       outLinkUrl: item.outLinkUrl ? reportCenterUrl(item.outLinkUrl) : '',
  //       hidden: item.hidden === 'true',
  //       alwaysShow: item.alwaysShow,
  //       meta: JSON.parse(item.meta),
  //       children: subchildren
  //     })
  //   })

  //   menutemp.push({
  //     path: '*', redirect: '/404', hidden: true 
  //   })


  //   return menutemp
  // }
}
export default getters
