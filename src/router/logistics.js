const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [
  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/list',
    name: 'logistics',
    mark: '物流',
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
        meta: { title: '新建配送单' }
      },
      {
        path: 'detail',
        component: _import('mis/logistics/detail'),
        name: 'logisticsDetail',
        hidden: true,
        meta: { title: '配送单详情' }
      },
      {
        path: 'deliverylist',
        component: _import('mis/logistics/deliverylist'),
        name: 'deliverylist',
        meta: { title: '发货明细' }
      },
      {
        path: 'logisticsinsure',
        component: _import('mis/logistics/logisticsinsure'),
        name: 'logisticsinsure',
        meta: { title: '物流单投保', 'noCache': true }
      },
    ]
  },
  {
    path: '/priceTemplate',
    component: Layout,
    redirect: '/priceTemplate/list',
    name: 'priceTemplate',
    mark: '物流',
    meta: { title: '费用模版管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/priceTemplate/priceTemplateList'),
        name: 'priceTemplateList',
        meta: { title: '费用模版管理' }
      },
      {
        path: 'create',
        component: _import('mis/priceTemplate/priceTemplateCreate'),
        name: 'priceTemplateCreate',
        meta: { title: '新建费用模版' },
        hidden: true
      },
      {
        path: 'detail',
        component: _import('mis/priceTemplate/priceTemplateDetail'),
        name: 'priceTemplateDetail',
        meta: { title: '费用模版详情' },
        hidden: true
      }
    ]
  }
]
