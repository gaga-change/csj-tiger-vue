const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/outgoing',
    component: Layout,
    redirect: 'outgoing/businessorder',
    meta: { title: '出库调度', noCache: true,icon: 'out' },
    hidden: false,
    children: [
      {
        name: 'businessorder',
        path: 'businessorder',
        meta: { title: '出库业务单', noCache: true },
        component: _import('outgoing/businessorder/index')
      },
      {
        name: 'businessorder-detail',
        path: 'businessorder-detail',
        meta: { title: '出库业务单详情', noCache: true },
        component: _import('outgoing/businessorder/detail'),
        hidden: true,
      },
      {
        name: 'plan',
        path: 'plan',
        meta: { title: '出库计划', noCache: true },
        component: _import('outgoing/plan/index')
      },
      {
        name: 'plan-detail',
        path: 'plan-detail',
        meta: { title: '出库计划详情', noCache: true },
        component: _import('outgoing/plan/detail'),
        hidden: true,
      },
      {
        name: 'quiry',
        path: 'quiry',
        meta: { title: '出库单查询', noCache: true },
        component: _import('outgoing/quiry/index')
      },
      {
        name: 'quiry-detail',
        path: 'quiry-detail',
        meta: { title: '出库单查询详情', noCache: true },
        component: _import('outgoing/quiry/detail'),
        hidden: true,
      },
    ]
  },

  {
    path: '/warehousing',
    component: Layout,
    redirect: 'warehousing/businessorder',
    meta: { title: '入库调度', noCache: true ,icon:'in'},
    hidden: false,
    children: [
      {
        name: 'businessorder',
        path: 'businessorder',
        meta: { title: '入库业务单', noCache: true },
        component: _import('warehousing/businessorder/index')
      },
      {
        name: 'businessorder-detail',
        path: 'businessorder-detail',
        meta: { title: '入库业务单详情', noCache: true },
        component: _import('warehousing/businessorder/detail'),
        hidden: true,
      },
      {
        name: 'plan',
        path: 'plan',
        meta: { title: '入库计划', noCache: true },
        component: _import('warehousing/plan/index')
      },
      {
        name: 'plan-detail',
        path: 'plan-detail',
        meta: { title: '入库计划详情', noCache: true },
        component: _import('warehousing/plan/detail'),
        hidden: true,
      },
      
      {
        name: 'quiry',
        path: 'quiry',
        meta: { title: '入库单查询', noCache: true },
        component: _import('warehousing/quiry/index')
      },
      {
        name: 'quiry-detail',
        path: 'quiry-detail',
        meta: { title: '入库单查询详情', noCache: true },
        component: _import('warehousing/quiry/detail'),
        hidden: true,
      }
    ]
  },

  // {
  //   path: '/transfer',
  //   component: Layout,
  //   redirect: 'transfer/transfermanagement',
  //   meta: { title: '调拨管理', noCache: true },
  //   hidden: false,
  //   children: [
  //     {
  //       name: 'transfermanagement',
  //       path: 'transfermanagement',
  //       meta: { title: '调拨管理', noCache: true,icon:'sale' },
  //       component: _import('transfer/transfermanagement/index')
  //     }
  //   ]
  // },

  {
    path: '/inventory',
    component: Layout,
    redirect: 'inventory/quiry',
    meta: { title: '库存管理', noCache: true,icon:'plan' },
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
      // {
      //   name: 'log',
      //   path: 'log',
      //   meta: { title: '出入库日志', noCache: true },
      //   component: _import('inventory/log/index')
      // },
      //  {
      //   name: 'deposit',
      //   path: 'deposit',
      //   meta: { title: '锁定库存一览', noCache: true },
      //   component: _import('inventory/deposit/index')
      // }
    ]
  },

  {
    path: '/businessset',
    component: Layout,
    redirect: 'businessset/configuration',
    meta: { title: '业务设置', noCache: true ,icon:'busyness'},
    hidden: false,
    children: [
      // {
      //   name: 'configuration',
      //   path: 'configuration',
      //   meta: { title: '仓储配置', noCache: true },
      //   component: _import('businessset/configuration/index')
      // },
      {
        name: 'owerinfo',
        path: 'owerinfo',
        meta: { title: '货主信息', noCache: true },
        component: _import('businessset/owerinfo/index')
      },
      {
        name: 'owerinfo-detail',
        path: 'owerinfo-detail',
        meta: { title: '货主信息详情', noCache: true },
        component: _import('businessset/owerinfo/detail'),
        hidden: true,
      },
      {
        name: 'customerconfiguration',
        path: 'customerconfiguration',
        meta: { title: '客户仓库关系配置', noCache: true },
        component: _import('businessset/customerconfiguration/index')
      },
      {
        name: 'customerconfiguration-detail',
        path: 'customerconfiguration-detail',
        meta: { title: '客户仓库关系配置详情', noCache: true },
        component: _import('businessset/customerconfiguration/detail'),
        hidden: true,
      },
      //  {
      //   name: 'ownerconfiguration',
      //   path: 'ownerconfiguration',
      //   meta: { title: '货主开通仓储配置', noCache: true },
      //   component: _import('businessset/ownerconfiguration/index')
      // },
      // {
      //   name: 'cycleconfiguration',
      //   path: 'cycleconfiguration',
      //   meta: { title: '库存周期配置', noCache: true },
      //   component: _import('businessset/cycleconfiguration/index')
      // }
    ]
  },

  // {
  //   path: '/analysis',
  //   component: Layout,
  //   redirect: 'analysis/delivergoods',
  //   meta: { title: '统计分析', noCache: true,icon:'back' },
  //   hidden: false,
  //   children: [
  //     {
  //       name: 'delivergoods',
  //       path: 'delivergoods',
  //       meta: { title: '发货时效分析', noCache: true },
  //       component: _import('analysis/delivergoods/index')
  //     },
  //     {
  //       name: 'arrival',
  //       path: 'arrival',
  //       meta: { title: '供应商到货率', noCache: true },
  //       component: _import('analysis/arrival/index')
  //     },
  //   ]
  // },

   {
    path: '/reply',
    component: Layout,
    redirect: 'reply/query',
    meta: { title: '回单管理', noCache: true,icon:'back' },
    hidden: false,
    children: [
      {
        name: 'query',
        path: 'query',
        meta: { title: '回单查询', noCache: true },
        component: _import('reply/query/index')
      },
      {
        name: 'newreceiptorder',
        path: 'newreceiptorder',
        meta: { title: '创建回单', noCache: true },
        component: _import('reply/newreceiptorder/index'),
        hidden: true,
      },
      {
        name: 'newreceiptorder-detail',
        path: 'newreceiptorder-detail',
        meta: { title: '回单详情', noCache: true },
        component: _import('reply/newreceiptorder/detail'),
        hidden: true,
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
