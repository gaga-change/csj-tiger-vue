const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'

export default [

  {
    path: '/reconciliation',
    component: Layout,
    redirect: 'reconciliation/list',
    mark: '财务',
    meta: { title: '对账管理', noCache: true, icon: 'back' },
    hidden: false,
    children: [
      {
        name: 'reconciliationList',
        path: 'list',
        meta: { title: '仓储服务费对账单', noCache: true },
        component: _import('reconciliation/list'),
        hidden: false,
      },
      {
        name: 'expenseSettlement',
        path: 'expenseSettlement',
        meta: { title: '承运商费用结算', noCache: true },
        component: _import('reconciliation/expenseSettlement'),
        hidden: false,
      },
      {
        name: 'accountChecking',
        path: 'accountChecking',
        meta: { title: '承运商外部对账单', noCache: true },
        component: _import('reconciliation/accountChecking'),
        hidden: false,
      },
      {
        name: 'reconciliationAdd',
        path: 'add',
        meta: { title: '新增对账单', noCache: false },
        component: _import('reconciliation/add'),
        hidden: true,
      },
      {
        name: 'reconciliationDetail',
        path: 'detail',
        meta: { title: '对账单详情', noCache: true },
        component: _import('reconciliation/detail'),
        hidden: true,
      },
      {
        name: 'reconciliationMessage',
        path: 'reconciliationMessage',
        meta: { title: '对账推送', noCache: true },
        component: _import('reconciliation/messageList/list'),
        hidden: false,
      },
      {
        name: 'reconciliationMessageAdd',
        path: 'reconciliationMessageAdd',
        meta: { title: '对账推送新建', noCache: true },
        component: _import('reconciliation/messageList/add'),
        hidden: true,
      },
    ]
  },

  {
    path: '/invoice/entryInvoice',
    mark: '财务',
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
        }
      },

      {
        path: 'registrationAdd',
        component: _import('invoice/entryInvoice/add'),
        name: 'registrationAdd',
        hidden: true,
        meta: {
          title: '新增发票页面',
          noCache: false
        }
      },


      {
        path: 'registrationVoid',
        component: _import('invoice/entryInvoice/void'),
        name: 'registrationVoid',
        meta: {
          title: '发票作废',
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
    mark: '财务',
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
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceregistration',
        component: _import('invoice/outputinvoice/invoiceregistration/index'),
        name: 'invoiceregistration',
        meta: {
          title: '发票登记',
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
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceinvalid',
        component: _import('invoice/outputinvoice/invoiceinvalid/index'),
        name: 'invoiceinvalid',
        meta: {
          title: '发票作废',
          roles: ['service_finance']
        }
      },
      {
        path: 'invoiceinvalid/detail',
        component: _import('invoice/outputinvoice/invoiceinvalid/detail'),
        name: 'invoiceinvaliddetail',
        hidden: true,
        meta: {
          title: '发票作废详情',
          roles: ['service_finance']
        }
      },
      {
        path: 'newoutputinvoice',
        component: _import('invoice/outputinvoice/newoutputinvoice/index'),
        name: 'newoutputinvoiceDelivery',
        meta: {
          title: '申请销项发票',
          noCache: false
        },
        hidden: true
      }
    ]
  },
  {
    path: '/serviceCharge',
    component: Layout,
    redirect: '/serviceCharge/pick',
    name: 'serviceCharge',
    mark: '财务',
    meta: { title: '服务费管理', icon: 'sale', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'pick',
        component: _import('serviceCharge/serviceChargePick'),
        name: 'serviceChargePick',
        meta: {
          title: '附加收支管理',
          noCache: true,
        }
      },
    ]
  },
  {
    path: '/receipt',
    component: Layout,
    redirect: '/receipt/newreceipt',
    name: 'receipt',
    mark: '财务',
    meta: { title: '收款管理', icon: 'sale', roles: ['service_finance'] }, // you can set roles in root nav
    children: [
      {
        path: 'newreceipt',
        component: _import('receipt/newreceipt/index'),
        name: 'newreceipt',
        hidden: true,
        meta: {
          title: '新建收款单',
          noCache: true,
        }
      },
      {
        path: 'register',
        component: _import('receipt/register/index'),
        name: 'registerorder',
        meta: {
          title: '收款单',
          noCache: true,
        }
      },
      {
        path: 'register/detail',
        component: _import('receipt/register/detail'),
        name: 'registerorderDetail',
        hidden: true,
        meta: {
          title: '收款单详情',
          noCache: true,
        }
      },
      {
        path: 'associate',
        component: _import('receipt/associate/index'),
        name: 'associate',
        meta: {
          title: '收款关联业务单',
          noCache: true,
        }
      },
      {
        path: 'associate/detail',
        component: _import('receipt/associate/detail'),
        name: 'associateDetail',
        hidden: true,
        meta: {
          title: '收款单业务详情',
          noCache: true,
        }
      },
      {
        path: 'receiptquery',
        component: _import('receipt/receiptquery/index'),
        name: 'receiptquery',
        meta: {
          title: '收款查询',
          noCache: true,
        }
      },
      {
        path: 'refundList',
        component: _import('receipt/refund/list'),
        name: 'refundList',
        meta: {
          title: '客户退款',
          noCache: true,
        }
      },

      {
        path: 'refundDetail',
        component: _import('receipt/refund/detail'),
        name: 'refundDetail',
        hidden: true,
        meta: {
          title: '客户退款详情',
          noCache: true,
        }
      },

      {
        path: 'refundAdd',
        component: _import('receipt/refund/add'),
        name: 'refundAdd',
        hidden: true,
        meta: {
          title: '新建退款',
          noCache: false,
        }
      },
    ]
  },

  {
    path: '/payment',
    component: Layout,
    redirect: '/payment/apply',
    name: 'payment',
    mark: '财务',
    meta: { title: '付款管理', icon: 'sale', roles: ['service_finance'] },
    children: [
      {
        path: 'newpayment',
        component: _import('pay/newPay/index'),
        name: 'newpayment',
        hidden: true,
        meta: {
          title: '新建付款单',
          noCache: false,
          roles: ['service_finance']
        }
      },
      {
        path: 'apply',
        component: _import('pay/apply/index'),
        name: 'apply',
        meta: {
          title: '付款申请',
          roles: ['service_finance']
        }
      },
      {
        path: 'register',
        component: _import('pay/register/index'),
        name: 'register',
        meta: {
          title: '付款登记',
          roles: ['service_finance']
        }
      },
      {
        path: 'register/detail',
        component: _import('pay/register/detail'),
        name: 'registerDetail',
        hidden: true,
        meta: {
          title: '付款登记详情',
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
          roles: ['service_finance']
        }
      },
      {
        path: 'apply/inOrder',
        component: _import('pay/apply/inOrder'),
        name: 'applyInOrder',
        hidden: true,
        meta: {
          title: '订单入库信息',
          roles: ['service_finance']
        }
      },
      {
        path: 'apply/invoice',
        component: _import('pay/apply/invoice'),
        name: 'applyInvoice',
        hidden: true,
        meta: {
          title: '订单发票信息',
          roles: ['service_finance']
        }
      },
    ]
  },

  //代办
  {
    path: '/purchaseorder',
    component: Layout,
    redirect: '/payment/paymentlist',
    name: 'purchaseorder',
    alwaysShow: false,
    hidden: true,
    meta: { title: '采购订单管理', icon: 'purchase' },
    children: [
      {
        path: 'purchaseorderdetail',
        component: _import('purchaseorder/purchaseorderdetail'),
        name: 'purchaseorderdetail',
        hidden: true,
        meta: {
          title: '采购订单详情',
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
          noCache: true,
          roles: ['service_business', 'service_business_verify', 'service_finance', 'service_market']
        }
      }
    ]
  }
]
