const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/payment',
    component: Layout,
    redirect: '/payment/newpayment',
    name: 'paymentDelivery',
    meta: { title: '付款管理', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newpayment',
        component: _import('payment/newpayment'),
        name: 'newpaymentDelivery',
        meta: {
          title: '新建付款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'paymentlist',
        component: _import('payment/paymentlist'),
        name: 'paymentlistDelivery',
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
        name: 'paymentdetailDelivery',
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
    name: 'receivableDelivery',
    meta: { title: '收款管理', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceivable',
        component: _import('receivable/newreceivable'),
        name: 'newreceivableDelivery',
        meta: {
          title: '新建收款单',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'receivablelist',
        component: _import('receivable/receivablelist'),
        name: 'receivablelistDelivery',
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
        name: 'receivabledetailDelivery',
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
    path: '/invoice/entryInvoice',
    component: Layout,
    redirect: '/invoice/entryInvoice/registrationList',
    name: 'entryInvoice',
    meta: { title: '进项发票', icon: 'tree' }, 
    children: [
      {
        path: 'registrationList',
        component: _import('invoice/entryInvoice/list'),
        name: 'registrationList',
        meta: {
          title: '发票登记列表',
          icon: 'form',
        }
      },

      {
        path: 'registrationAdd',
        component: _import('invoice/entryInvoice/add'),
        name: 'registrationAdd',
        hidden: true,
        meta: {
          title: '新增发票页面',
          icon: 'form',
        }
      },


      {
        path: 'registrationVoid',
        component: _import('invoice/entryInvoice/void'),
        name: 'registrationVoid',
        meta: {
          title: '发票作废列表',
          icon: 'form',
        }
      },

      {
        path: 'registrationDetail',
        component: _import('invoice/entryInvoice/detail'),
        name: 'registrationDetail',
        meta: {
          title: '发票详情页面',
          icon: 'form',
        }
      },

    ]
  },
  {
    path: '/invoice/outputinvoice',
    component: Layout,
    redirect: '/invoice/outputinvoice/invoiceapply',
    name: 'outputinvoiceDelivery',
    meta: { title: '销项发票', icon: 'tree', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'invoiceapply',
        component: _import('invoice/outputinvoice/invoiceapply/index'),
        name: 'invoiceapply',
        meta: {
          title: '发票申请',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceapply/detail',
        component: _import('invoice/outputinvoice/invoiceapply/detail'),
        name: 'invoiceapplydetail',
        meta: {
          title: '发票申请详情',
          hidden: true,
          icon: 'form',
          roles: ['service_finance']
        },
        hidden: true
      },
      {
        path: 'invoiceapply/billing',
        component: _import('invoice/outputinvoice/invoiceapply/billing'),
        name: 'invoiceapplybilling',
        hidden: true,
        meta: {
          title: '财务开票',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceregistration',
        component: _import('invoice/outputinvoice/invoiceregistration/index'),
        name: 'invoiceregistration',
        meta: {
          title: '发票登记',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceregistration/detail',
        component: _import('invoice/outputinvoice/invoiceregistration/detail'),
        name: 'invoiceregistrationdetail',
        hidden: true,
        meta: {
          title: '发票登记详情',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceinvalid',
        component: _import('invoice/outputinvoice/invoiceinvalid/index'),
        name: 'invoiceinvalid',
        meta: {
          title: '发票作废',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceinvalid/detail',
        component: _import('invoice/outputinvoice/invoiceinvalid/detail'),
        name: 'invoiceinvalid',
        hidden:true,
        meta: {
          title: '发票作废详情',
          icon: 'form',
          roles: ['service_finance']
        }
      },
      {
        path: 'newoutputinvoice',
        component: _import('invoice/outputinvoice/newoutputinvoice/index'),
        name: 'newoutputinvoiceDelivery',
        meta: {
          title: '申请销项发票',
          icon: 'form',
          roles: ['service_finance']
        },
        hidden: true
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
  {
    path: '/purchasecontract',
    component: Layout,
    redirect: '/',
    name: 'purchasecontractDelivery',
    alwaysShow: false,
    hidden: true,
    meta: { title: '采购合同', icon: 'sale', roles: ['service_finance', 'service_business', 'service_business_verify', 'service_market'] }, // you can set roles in root nav
    children: [
      {
        path: 'purchasecontractdetail/:contractno/:workflowid',
        component: _import('purchasecontract/purchasecontractdetail'),
        name: 'purchasecontractdetailDelivery',
        hidden: true,
        meta: {
          title: '采购合同详情',
          icon: 'form',
          noCache: true,
          roles: ['service_business', 'service_business_verify', 'service_finance', 'service_market']
        }
      }
    ]
  },
  {
    path: '/salecontract',
    component: Layout,
    redirect: '/',
    name: 'salecontractDelivery',
    alwaysShow: false,
    hidden: true,
    meta: { title: '销售合同', icon: 'sale', roles: ['service_finance', 'service_business', 'service_business_verify', 'service_market'] }, // you can set roles in root nav
    children: [
      {
        path: 'salecontractdetail/:contractno/:workflowid',
        component: _import('salecontract/salecontractdetail'),
        name: 'salecontractdetailDelivery',
        hidden: true,
        meta: {
          title: '销售合同详情',
          icon: 'form',
          noCache: true,
          roles: ['service_business', 'service_business_verify', 'service_finance', 'service_market']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
