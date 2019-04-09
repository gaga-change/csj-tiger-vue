const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

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
      },
      {
        path: 'detail',
        component: _import('mis/logistics/detail'),
        name: 'logisticsDetail',
        hidden: true,
        meta: {title: '配送单详情'}
      },
      {
        path: 'substitutePayment',
        component: _import('mis/logistics/substitutepayment'),
        name: 'substitutePayment',
        meta: { title: '代支款项管理' }
      },
      {
        path: 'deliverylist',
        component: _import('mis/logistics/deliverylist'),
        name: 'deliverylist',
        meta: { title: '发货明细' }
      },
    ]
  },
  {
    path: '/mis/products',
    component: Layout,
    redirect: '/mis/products/list',
    mark:'仓储运营',
    meta: { title: '商品管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/products/list'),
        name: 'productsList',
        meta: { title: '商品管理' }
      },
      {
        path: 'newproduct',
        component: _import('mis/products/newproduct'),
        name: 'newproduct',
        hidden: true,
        meta: { title: '编辑商品' }
      },
      {
        path: 'detail',
        component: _import('mis/products/detail'),
        name: 'misproductdetail',
        hidden: true,
        meta: { title: '商品详情' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    mark:'仓储运营',
    meta: { title: '客户管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/customer/list'),
        name: 'customerList',
        meta: { title: '客户管理', icon: 'sale' }
      }
    ]
  },

  {
    path: '/carrier',
    component: Layout,
    redirect: '/carrier/list',
    name: 'carrier',
    mark:'仓储运营',
    meta: { title: '承运商', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/carrier/list'),
        name: 'carrierList',
        meta: { title: '承运商管理'}
      },
      {
        path: 'add',
        component: _import('mis/carrier/add'),
        name: 'carrierAdd',
        hidden: true,
        meta: { title:'创建承运商', noCache: false}
      },
      {
        path: 'detail',
        component: _import('mis/carrier/detail'),
        name: 'carrierDetail',
        hidden: true,
        meta: { title:'承运商详情' }
      }
    ]
  },

  {
    path: '/storagepoint',
    component: Layout,
    redirect: '/storagepoint/list',
    name: 'storagepoint',
    mark:'仓储运营',
    meta: { title: '仓配点管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/storagepoint/list'),
        name: 'storagepointList',
        meta: { title: '仓配点管理',icon: 'sale'  }
      }
    ]
  },

  {
    path: '/correctionDocument',
    component: Layout,
    redirect: '/correctionDocument/warehousingList',
    name: 'correctionDocument',
    mark:'仓储运营',
    meta: { title: '单据订正', icon: 'sale' },
    children: [
      {
        path: 'warehousingList',
        component: _import('mis/correctionDocument/warehousingList'),
        name: 'warehousingList',
        meta: { title: '入库业务单订正'}
      },
      {
        path: 'warehousingAdd',
        component: _import('mis/correctionDocument/warehousingAdd'),
        name: 'warehousingAdd',
        hidden: true,
        meta: { title: '创建入库订正单'}
      },
      {
        path: 'outgoingList',
        component: _import('mis/correctionDocument/outgoingList'),
        name: 'outgoingList',
        meta: { title: '出库业务单订正'}
      },
      {
        path: 'outgoingAdd',
        component: _import('mis/correctionDocument/outgoingAdd'),
        name: 'outgoingAdd',
        hidden: true,
        meta: { title: '创建出库订正单'}
      }

    ]
  },

  {
    path: '/supplierManagement',
    component: Layout,
    redirect: '/supplierManagement/list',
    name: 'supplierManagement',
    mark:'仓储运营',
    meta: { title: '供应商管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/supplierManagement/list'),
        name: 'supplierManagementList',
        meta: { title: '供应商管理列表',icon: 'sale' }
      }
    ]
  },

  {
    name: 'reportdaily',
    path: '/reportdaily',
    outLinkUrl: reportCenterUrl('mis_actual_stock'),
    meta: { title: '日常报表', icon: 'stock' },
    children: [
      {
        name: 'mis_actual_stock',
        path: 'mis_actual_stock',
        outLinkUrl: reportCenterUrl('mis_actual_stock', 'mis'),
        meta: {
          title: '实时库存报表'
        }
      },
      {
        name: 'mis_invout_summary',
        path: 'mis_invout_summary',
        outLinkUrl: reportCenterUrl('mis_invout_summary', 'mis'),
        meta: {
          title: '出库汇总表'
        }
      },
      {
        name: 'mis_invin_summary',
        path: 'mis_invin_summary',
        outLinkUrl: reportCenterUrl('mis_invin_summary', 'mis'),
        meta: {
          title: '入库汇总表'
        }
      },
      {
        name: 'mis_provider_goods',
        path: 'mis_provider_goods',
        outLinkUrl: reportCenterUrl('mis_provider_goods', 'mis'),
        meta: {
          title: '供应商商品查询'
        }
      },
      {
        name: 'mis_customer_goods',
        path: 'mis_customer_goods',
        outLinkUrl: reportCenterUrl('mis_customer_goods', 'mis'),
        meta: {
          title: '客户商品查询'
        }
      },
      {
        name: 'mis_goods_main',
        path: 'mis_goods_main',
        outLinkUrl: reportCenterUrl('mis_goods_main', 'mis'),
        meta: {
          title: '单品进销存查询'
        }
      }
    ]
  },
  {
    name: 'reporttogether',
    path: '/reporttogether',
    outLinkUrl: reportCenterUrl('mis_distribution_main'),
    meta: { title: '综合报表', icon: 'stock' },
    children: [
      {
        name: 'mis_distribution_main',
        path: 'mis_distribution_main',
        outLinkUrl: reportCenterUrl('mis_distribution_main', 'mis'),
        meta: {
          title: '承运商配送汇总'
        }
      },
      {
        name: 'mis_history_stock',
        path: 'mis_history_stock',
        outLinkUrl: reportCenterUrl('mis_history_stock', 'mis'),
        meta: {
          title: '历史库存报表'
        }
      },
      {
        name: 'mis_month_stock',
        path: 'mis_month_stock',
        outLinkUrl: reportCenterUrl('mis_month_stock', 'mis'),
        meta: {
          title: '月库存周转报表'
        }
      },
      {
        name: 'mis_adjust_stock',
        path: 'mis_adjust_stock',
        outLinkUrl: reportCenterUrl('mis_adjust_stock', 'mis'),
        meta: {
          title: '库存调整报表'
        }
      },
      {
        name: 'mis_invin_detail',
        path: 'mis_invin_detail',
        outLinkUrl: reportCenterUrl('mis_invin_detail', 'mis'),
        meta: {
          title: '入库业务单明细'
        }
      },
      {
        name: 'mis_invout_detail',
        path: 'mis_invout_detail',
        outLinkUrl: reportCenterUrl('mis_invout_detail', 'mis'),
        meta: {
          title: '出库业务单明细'
        }
      },
      {
        name: 'mis_invin_goods_main',
        path: 'mis_invin_goods_main',
        outLinkUrl: reportCenterUrl('mis_invin_goods_main', 'mis'),
        meta: {
          title: '入库单品汇总'
        }
      },
      {
        name: 'mis_invout_goods_main',
        path: 'mis_invout_goods_main',
        outLinkUrl: reportCenterUrl('mis_invout_goods_main', 'mis'),
        meta: {
          title: '出库单品汇总'
        }
      },
      {
        name: 'mis_invin_main',
        path: 'mis_invin_main',
        outLinkUrl: reportCenterUrl('mis_invin_main', 'mis'),
        meta: {
          title: '入库业务单汇总'
        }
      },
      {
        name: 'mis_invout_main',
        path: 'mis_invout_main',
        outLinkUrl: reportCenterUrl('mis_invout_main', 'mis'),
        meta: {
          title: '出库业务单汇总'
        }
      }
    ]
  }

]
