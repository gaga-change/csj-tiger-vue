const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [
  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/list',
    name: 'logistics',
    mark:'物流',
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
      },
      {
        path: 'detail',
        component: _import('mis/logistics/detail'),
        name: 'logisticsDetail',
        hidden: true,
        meta: {title: '配送单详情'}
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
        meta: { title: '物流单投保','noCache':true }
      },
    ]
  }
]
