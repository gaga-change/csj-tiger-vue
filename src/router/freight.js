const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [

  {
    path: '/freight/freightTem',
    component: Layout,
    redirect: '/freight/freightTem/list',
    mark: '物流费用',
    meta: { title: '物流费用模板', icon: 'sale' },
    children: [
      {
        path: 'add',
        component: _import('freight/freightTem/add'),
        name: 'newFreight',
        hidden: true,
        meta: { title: '新建模板', noCache: false }
      },
      {
        path: 'list',
        component: _import('freight/freightTem/list'),
        name: 'freightTemList',
        meta: { title: '物流费用模板列表', noCache: true }
      }
    ]
  },
  {
    path: '/freight/quationList',
    component: Layout,
    redirect: '/freight/quationList/list',
    mark: '物流费用',
    meta: { title: '报价单列表', icon: 'sale' },
    children: [
      {
        path: 'add',
        component: _import('freight/quationList/add'),
        name: 'newQuation',
        hidden: true,
        meta: { title: '报价', noCache: true }
      },
      {
        path: 'detail',
        component: _import('freight/quationList/detail'),
        name: 'quationInfoDetail',
        hidden: true,
        meta: { title: '报价详情', noCache: true}
      },
      {
        path: 'list',
        component: _import('freight/quationList/list'),
        name: 'quationInfoList',
        meta: { title: '报价单列表', noCache: true }
      }
    ]
  },
]
