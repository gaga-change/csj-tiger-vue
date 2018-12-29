const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
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
          title: '发票登记',
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
          title: '发票作废',
          icon: 'form',
        }
      },

      {
        path: 'registrationDetail',
        component: _import('invoice/entryInvoice/detail'),
        name: 'registrationDetail',
        hidden: true,
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
    meta: { title: '采购订单管理', icon: 'purchase'  }, 
    children: [
      {
        path: 'purchaseorderdetail',
        component: _import('purchaseorder/purchaseorderdetail'),
        name: 'purchaseorderdetail',
        hidden: true,
        meta: {
          title: '采购订单详情',
          icon: 'form',
          noCache: true,
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
    meta: { title: '销售订单管理', icon: 'sale' }, 
    children: [
      {
        path: 'saleorderdetail',
        component: _import('saleorder/saleorderdetail'),
        name: 'saleorderdetail',
        hidden: true,
        meta: {
          title: '销售订单详情',
          icon: 'form',
          noCache: true,
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
