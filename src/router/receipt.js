const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/receipt',
    component: Layout,
    redirect: '/receipt/newreceipt',
    name: 'receipt',
    mark:'财务管理',
    meta: { title: '收款管理', icon: 'sale', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceipt',
        component: _import('receipt/newreceipt/index'),
        name: 'newreceipt',
        hidden:true,
        meta: {
          title: '新建收款单',
          noCache: true ,
        }
      },
      {
        path: 'register',
        component: _import('receipt/register/index'),
        name: 'registerorder',
        meta: {
          title: '收款单',
          noCache: true ,
        }
      },
      {
        path: 'register/detail',
        component: _import('receipt/register/detail'),
        name: 'registerorderDetail',
        hidden: true,
        meta: {
          title: '收款单详情',
          noCache: true ,
        }
      },
      {
        path: 'associate',
        component: _import('receipt/associate/index'),
        name: 'associate',
        meta: {
          title: '收款关联业务单',
          noCache: true ,
        }
      },
      {
        path: 'associate/detail',
        component: _import('receipt/associate/detail'),
        name: 'associateDetail',
        hidden: true,
        meta: {
          title: '收款单业务详情',
          noCache: true ,
        }
      },
      {
        path: 'receiptquery',
        component: _import('receipt/receiptquery/index'),
        name: 'receiptquery',
        meta: {
          title: '收款查询',
          noCache: true ,
        }
      },
      {
        path: 'refundList',
        component: _import('receipt/refund/list'),
        name: 'refundList',
        meta: {
          title: '客户退款',
          noCache: true ,
        }
      },

      {
        path: 'refundDetail',
        component: _import('receipt/refund/detail'),
        name: 'refundDetail',
        hidden: false,
        meta: {
          title: '客户退款详情',
          noCache: true ,
        }
      },

      {
        path: 'refundAdd',
        component: _import('receipt/refund/add'),
        name: 'refundAdd',
        hidden: false,
        meta: {
          title: '新建退款',
          noCache: false ,
        }
      },
    ]
  },
]
