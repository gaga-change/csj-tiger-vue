const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [

  {
    path: '/inventory',
    component: Layout,
    redirect: 'inventory/quiry',
    meta: { title: '库存管理', noCache: true,icon:'plan' },
    mark:'报表',
    hidden: false,
    children: [
      {
        name: 'quiry',
        path: 'quiry',
        meta: { title: '库存查询', noCache: true },
        component: _import('inventory/quiry/index')
      },
      {
        name: 'quiry-detail',
        path: 'quiry-detail',
        meta: { title: '库存查询详情', noCache: true },
        component: _import('inventory/quiry/detail'),
        hidden: true,
      },
    ]
  },

  {
    name: 'reportdaily',
    path: '/reportdaily',
    mark:'报表',
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
        name: 'mis_sku_info',
        path: 'mis_sku_info',
        outLinkUrl: reportCenterUrl('mis_sku_info', 'mis', true),
        meta: {
          title: '平台商品查询'
        }
      },
      {
        name: 'mis_goods_main',
        path: 'mis_goods_main',
        outLinkUrl: reportCenterUrl('mis_goods_main', 'mis', true),
        meta: {
          title: '单品进销存查询'
        }
      }
    ]
  },
  {
    name: 'reporttogether',
    path: '/reporttogether',
    mark:'报表',
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
