const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/receipt',
    component: Layout,
    redirect: '/receipt/newreceipt',
    name: 'receipt',
    meta: { title: '收款管理', icon: 'sale', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceipt',
        component: _import('receipt/newreceipt/index'),
        name: 'newreceipt',
        hidden:true,
        meta: {
          title: '新建收款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'register',
        component: _import('receipt/register/index'),
        name: 'register',
        meta: {
          title: '收款单',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'register/detail',
        component: _import('receipt/register/detail'),
        name: 'registerDetail',
        hidden: true,
        meta: {
          title: '收款单详情',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'associate',
        component: _import('receipt/associate/index'),
        name: 'associate',
        meta: {
          title: '收款关联业务单',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'associate/detail',
        component: _import('receipt/associate/detail'),
        name: 'associateDetail',
        hidden: true,
        meta: {
          title: '收款单业务详情',
          icon: 'search',
          roles: ['service_finance']
        }
      },
    ]
  },
]
