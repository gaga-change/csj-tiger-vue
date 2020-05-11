import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/Layout'
import OutgoingWarehousing from './outgoingWarehousing' //出入库
import Basics from './basics' //基本信息
import Logistics from './logistics' //物流
// import Report from './report' //报表
import Finance from './finance' //财务
import freight from './freight' //物流费用
import operation from './operation' //物流费用

export const constantRouterMap = [
  // { path: '/login', redirect: '/csj_login', hidden: true },
  { path: '/login', component: () => import('../views/login/index'), hidden: true },
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
  },
  {
    path: '/freightCount',
    component: _import('freightCount/add'),
    redirect: 'freightCount/add',
    mark: '物流费用',
    meta: { title: '物流计算', noCache: true, icon: 'sale' },
    hidden: false,
    children: [
      {
        name: 'freightCountAdd',
        path: 'add',
        meta: { title: '物流计算', noCache: true },
        component: _import('freightCount/add')
      },
    ]
  },
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  ...OutgoingWarehousing,
  ...Basics,
  ...Logistics,
  // ...Report,
  ...Finance,
  ...freight,
  ...operation,
  {
    path: '/err',
    component: Layout,
    redirect: 'err/errIndex',
    mark: '基础档案',
    meta: { title: '错误处理', noCache: true, icon: 'back' },
    hidden: false,
    children: [
      {
        name: 'errIndex',
        path: 'errIndex',
        meta: { title: '错误处理', noCache: true },
        component: _import('errSystem/index')
      },
    ]
  },

]
