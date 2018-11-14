const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/payment',
    component: Layout,
    redirect: '/payment/apply',
    name: 'payment',
    meta: { title: '付款管理', icon: 'sale', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newpayment',
        component: _import('pay/newPay/index'),
        name: 'newpayment',
        hidden:true,
        meta: {
          title: '新建付款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'register',
        component: _import('pay/register/index'),
        name: 'register',
        meta: {
          title: '付款登记',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      // {
      //   path: 'register/detail',
      //   component: _import('pay/register/detail'),
      //   name: 'registerDetail',
      //   hidden: true,
      //   meta: {
      //     title: '付款登记详情',
      //     icon: 'search',
      //     roles: ['service_finance']
      //   }
      // },
      {
        path: 'apply',
        component: _import('pay/apply/index'),
        name: 'apply',
        meta: {
          title: '付款申请',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'apply/detail',
        component: _import('pay/apply/detail'),
        name: 'applyDetail',
        hidden: true,
        meta: {
          title: '付款申请详情',
          icon: 'search',
          roles: ['service_finance']
        }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
