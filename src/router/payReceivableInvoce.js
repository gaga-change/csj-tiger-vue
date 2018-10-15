const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/payment',
    component: Layout,
    redirect: '/payment/newpayment',
    name: 'payment',
    meta: { title: '付款管理', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newpayment',
        component: _import('payment/newpayment'),
        name: 'newpayment',
        meta: {
          title: '新建付款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'paymentlist',
        component: _import('payment/paymentlist'),
        name: 'paymentlist',
        meta: {
          title: '付款单查询',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'paymentdetail/:ticketno',
        component: _import('payment/paymentdetail'),
        hidden: true,
        name: 'paymentdetail',
        meta: {
          title: '付款单详情',
          icon: 'form',
          noCache: true,
          roles: ['service_finance']
        }
      }
    ]
  },
  {
    path: '/receivable',
    component: Layout,
    redirect: '/receivable/newreceivable',
    name: 'receivable',
    meta: { title: '收款管理', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceivable',
        component: _import('receivable/newreceivable'),
        name: 'newreceivable',
        meta: {
          title: '新建收款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'receivablelist',
        component: _import('receivable/receivablelist'),
        name: 'receivablelist',
        meta: {
          title: '收款单查询',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'receivabledetail/:ticketno',
        component: _import('receivable/receivabledetail'),
        hidden: true,
        name: 'receivabledetail',
        meta: {
          title: '收款单详情',
          noCache: true,
          icon: 'form',
          roles: ['service_finance']
        }
      }
    ]
  },
  {
    path: '/invoice/inputinvoice',
    component: Layout,
    redirect: '/invoice/inputinvoice/newinputinvoice',
    name: 'inputinvoice',
    meta: { title: '进项发票', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newinputinvoice',
        component: _import('invoice/inputinvoice/newinputinvoice'),
        name: 'newinputinvoice',
        meta: {
          title: '新建进项发票',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'inputinvoicelist',
        component: _import('invoice/inputinvoice/inputinvoicelist'),
        name: 'inputinvoicelist',
        meta: {
          title: '进项发票查询',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'inputinvoicedetail/:ticketno',
        component: _import('invoice/inputinvoice/inputinvoicedetail'),
        hidden: true,
        name: 'inputinvoicedetail',
        meta: {
          title: '进项发票详情',
          noCache: true,
          icon: 'form',
          roles: ['service_finance']
        }
      }
    ]
  },
  {
    path: '/invoice/outputinvoice',
    component: Layout,
    redirect: '/invoice/outputinvoice/newoutputinvoice',
    name: 'outputinvoice',
    meta: { title: '销项发票', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newoutputinvoice',
        component: _import('invoice/outputinvoice/newoutputinvoice'),
        name: 'newoutputinvoice',
        meta: {
          title: '申请销项发票',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'outputinvoicelist',
        component: _import('invoice/outputinvoice/outputinvoicelist'),
        name: 'outputinvoicelist',
        meta: {
          title: '开票申请查询',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'outputinvoiceresultlist',
        component: _import('invoice/outputinvoice/outputinvoiceresultlist'),
        name: 'outputinvoiceresultlist',
        meta: {
          title: '开票结果查询',
          icon: 'search',
          roles: ['service_finance']
        }
      },
      {
        path: 'outputinvoicedetail/:ticketno',
        component: _import('invoice/outputinvoice/outputinvoicedetail'),
        hidden: true,
        name: 'outputinvoicedetail',
        meta: {
          title: '销项开票申请详情',
          icon: 'form',
          noCache: true,
          roles: ['service_finance']
        }
      },
      {
        path: 'outputinvoiceresultdetail/:ticketno',
        component: _import('invoice/outputinvoice/outputinvoiceresultdetail'),
        hidden: true,
        name: 'outputinvoiceresultdetail',
        meta: {
          title: '销项开票详情',
          icon: 'form',
          noCache: true,
          roles: ['service_finance']
        }
      },
      {
        path: 'makeoutinvoice/:ticketno',
        component: _import('invoice/outputinvoice/makeoutinvoice'),
        hidden: true,
        name: 'makeoutinvoice',
        meta: {
          title: '财务开票',
          icon: 'form',
          roles: ['service_finance']
        }
      }
    ]
  },
  {
    path: '/purchaseorder',
    component: Layout,
    redirect: '/payment/paymentlist',
    name: 'purchaseorder',
    alwaysShow: false,
    hidden: true,
    meta: { title: '采购订单管理', icon: 'purchase', roles: ['service_finance', 'service_business_verify', 'service_business', 'service_market'] }, // you can set roles in root nav
    children: [
      {
        path: 'purchaseorderdetail/:ticketno',
        component: _import('purchaseorder/purchaseorderdetail'),
        name: 'purchaseorderdetail',
        hidden: true,
        meta: {
          title: '采购订单详情',
          icon: 'form',
          noCache: true,
          roles: ['service_finance', 'service_business', 'service_business_verify', 'service_market']
        }
      }
    ]
  },
  {
    path: '/saleorder',
    component: Layout,
    redirect: '/receivable/receivablelist',
    name: 'saleorder',
    alwaysShow: false,
    hidden: true,
    meta: { title: '销售订单管理', icon: 'sale', roles: ['service_finance', 'service_business', 'service_business_verify', 'service_market'] }, // you can set roles in root nav
    children: [
      {
        path: 'saleorderdetail/:ticketno',
        component: _import('saleorder/saleorderdetail'),
        name: 'saleorderdetail',
        hidden: true,
        meta: {
          title: '销售订单详情',
          icon: 'form',
          noCache: true,
          roles: ['service_business', 'service_business_verify', 'service_finance', 'service_market']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
