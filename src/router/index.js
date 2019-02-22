import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/Layout'
import Deliver from './deliver'
import PayReceivableInvoce from './PayReceivableInvoce'
import Receipt from './receipt'
import Payment from './payment'
import Provider from './provider'
import SaasErp from './saasErp' // 租户管理 租户管理员

export const constantRouterMap = [
  { path: '/login', redirect: '/csj_login', hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/401', component: _import('401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        meta: { title: '主页', noCache: true },
        component: _import('dashboard/index')
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  ...Deliver,
  ...PayReceivableInvoce,
  ...Receipt,
  ...Payment,
  ...Provider,
  ...SaasErp,
  {
    path: '/err',
    component: Layout,
    redirect: 'err/errIndex',
    meta: { title: '错误处理', noCache: true,icon:'back' },
    hidden: false,
    children: [
      {
        name: 'errIndex',
        path: 'errIndex',
        meta: { title: '错误处理', noCache: true ,icon:'back'},
        component: _import('errSystem/index')
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
