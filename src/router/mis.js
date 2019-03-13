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
  }
]
