const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/list',
    name: 'logistics',
    mark:'仓储运营',
    meta: { title: '物流管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/logistics/list'),
        name: 'logisticsList',
        meta: { title: '物流管理' }
      },
      {
        path: 'new',
        component: _import('mis/logistics/new'),
        name: 'newLogistics',
        hidden: true,
        meta: {title: '新建配送单'}
      }
    ]
  },

  {
    path: '/carrier',
    component: Layout,
    redirect: '/carrier/list',
    name: 'carrier',
    mark:'仓储运营',
    meta: { title: '承运商', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/carrier/list'),
        name: 'carrierList',
        meta: { title: '承运商管理'}
      },
      {
        path: 'add',
        component: _import('mis/carrier/add'),
        name: 'carrierAdd',
        meta: { title:'创建承运商' }
      },
      {
        path: 'detail',
        component: _import('mis/carrier/detail'),
        name: 'carrierDetail',
        hidden: true,
        meta: { title:'承运商详情' }
      },
    ]
  }
]
