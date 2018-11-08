const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/receipt',
    component: Layout,
    redirect: '/receipt/newreceipt',
    name: 'paymentDelivery',
    meta: { title: '收款新', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceipt',
        component: _import('receipt/newreceipt/index'),
        name: 'newpaymentDelivery',
        meta: {
          title: '新建收款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      // {
      //   path: 'paymentlist',
      //   component: _import('payment/paymentlist'),
      //   name: 'paymentlistDelivery',
      //   meta: {
      //     title: '付款单查询',
      //     icon: 'search',
      //     roles: ['service_finance']
      //   }
      // },
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
