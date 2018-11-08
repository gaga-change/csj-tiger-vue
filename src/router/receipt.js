const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/receipt',
    component: Layout,
    redirect: '/receipt/newreceipt',
    name: 'receipt',
    meta: { title: '收款新', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceipt',
        component: _import('receipt/newreceipt/index'),
        name: 'newreceipt',
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
          title: '收款单列表',
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
      // {
      //   path: 'paymentdetail/:ticketno',
      //   component: _import('payment/paymentdetail'),
      //   hidden: true,
      //   name: 'paymentdetailDelivery',
      //   meta: {
      //     title: '付款单详情',
      //     icon: 'form',
      //     noCache: true,
      //     roles: ['service_finance']
      //   }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
