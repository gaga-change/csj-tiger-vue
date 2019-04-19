const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/outgoing',
    component: Layout,
    redirect: 'outgoing/businessorder',
    meta: { title: '出库调度', noCache: true,icon: 'out' },
    mark:'出入库',
    hidden: false,
    children: [
      {
        name: 'businessorder',
        path: 'businessorder',
        meta: { title: '出库业务单', noCache: true },
        component: _import('outgoing/businessorder/index')
      },
      {
        name: 'businessorderadd',
        path: 'businessorderadd',
        hidden: true,
        meta: { title: '创建出库业务单', noCache: false },
        component: _import('outgoing/businessorder/add')
      },
      {
        name: 'businessorder-detail',
        path: 'businessorder-detail',
        meta: { title: '出库业务单详情', noCache: true },
        component: _import('outgoing/businessorder/detail'),
        hidden: true,
      },
      {
        name: 'businessorderAddPlanOrder',
        path: 'businessorderAddPlanOrder',
        meta: { title: '创建出库计划单', noCache: true },
        component: _import('outgoing/businessorder/addPlanOrder'),
        hidden: true,
      },
      {
        name: 'plan',
        path: 'plan',
        meta: { title: '出库计划', noCache: true },
        component: _import('outgoing/plan/index')
      },
      {
        name: 'out-detail',
        path: 'plan-detail',
        meta: { title: '出库计划详情', noCache: true },
        component: _import('outgoing/plan/detail'),
        hidden: true,
      },
      {
        name: 'manual',
        path: 'manual',
        meta: { title: '手工出库', noCache: true },
        component: _import('outgoing/plan/manual'),
        hidden: true,
      },
      {
        name: 'outquiry',
        path: 'quiry',
        meta: { title: '出库单查询', noCache: true },
        component: _import('outgoing/quiry/index')
      },
      {
        name: 'outquiryrecord',
        path: 'outquiryrecord',
        meta: { title: '调整记录', noCache: true },
        component: _import('outgoing/quiry/record')
      },
      {
        name: 'recordDetail',
        path: 'recordDetail',
        meta: { title: '调整记录详情', noCache: true },
        hidden: true,
        component: _import('outgoing/quiry/recordDetail')
      },
      {
        name: 'outquiry-detail',
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
    mark:'出入库',
    hidden: false,
    children: [
      {
        name: 'businessorder-warehousing',
        path: 'businessorder',
        meta: { title: '入库业务单', noCache: true },
        component: _import('warehousing/businessorder/index')
      },
      {
        name: 'warehousingBusinessorderAdd',
        path: 'businessorderAdd',
        hidden: true,
        meta: { title: '创建入库业务单', noCache: false },
        component: _import('warehousing/businessorder/add')
      },
      {
        name: 'warehousing-detail',
        path: 'businessorder-detail',
        meta: { title: '入库业务单详情', noCache: true },
        component: _import('warehousing/businessorder/detail'),
        hidden: true,
      },
      {
        name: 'warehousingAddPlanOrder',
        path: 'warehousingAddPlanOrder',
        meta: { title: '创建入库计划单', noCache: true },
        component: _import('warehousing/businessorder/addPlanOrder'),
        hidden: true,
      },
      {
        name: 'warehousingplan',
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
        name: 'inquiry',
        path: 'quiry',
        meta: { title: '入库单查询', noCache: true },
        component: _import('warehousing/quiry/index')
      },
      {
        name: 'inquiry-detail',
        path: 'quiry-detail',
        meta: { title: '入库单查询详情', noCache: true },
        component: _import('warehousing/quiry/detail'),
        hidden: true,
      }
    ]
  },

   {
    path: '/reply',
    component: Layout,
    redirect: 'reply/query',
    mark:'出入库',
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
        meta: { title: '创建回单', noCache: false },
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

  {
    path: '/abnormalGoods',
    component: Layout,
    redirect: 'abnormalGoods/list',
    meta: { title: '异常商品登记', noCache: true,icon:'back' },
    hidden: false,
    mark:'出入库',
    children: [
      {
        name: 'list',
        path: 'list',
        meta: { title: '异常商品登记', noCache: true},
        component: _import('abnormalGoods/list')
      },
      {
        name: 'abnormalGoodsAdd',
        path: 'add',
        meta: { title: '创建异常商品登记', noCache: false },
        component: _import('abnormalGoods/add'),
        hidden: true,
      },
      {
        name: 'detail',
        path: 'detail',
        meta: { title: '异常商品登记详情', noCache: true },
        component: _import('abnormalGoods/detail'),
        hidden: true,
      },

      {
        name: 'todoDetail',
        path: 'todoDetail',
        meta: { title: '采购退货单详情', noCache: true },
        component: _import('abnormalGoods/todoDetail'),
        hidden: true,
      },
    ]
  },

  {
    path: '/provider',
    component: Layout,
    redirect: '/provider/list',
    name: 'provider',
    mark:'出入库',
    meta: { title: '供应商直发', icon: 'sale',noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('provider/list'),
        name: 'providerlist',
        hidden:false,
        meta: {title: '客户收货登记',noCache: true }
      },
      {
        path: 'add',
        component: _import('provider/add'),
        name: 'providerAdd',
        hidden:true,
        meta: {title: '登记页面',noCache: false }
      },
      {
        path: 'detail',
        component: _import('provider/detail'),
        name: 'providerdetail',
        hidden:true,
        meta: {title: '客户收货登记详情',noCache: true }
      },
    ]
  },

  {
    path: '/correctionDocument',
    component: Layout,
    redirect: '/correctionDocument/warehousingList',
    name: 'correctionDocument',
    mark:'出入库',
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
        meta: { title: '创建入库订正单',noCache: false}
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
        meta: { title: '创建出库订正单',noCache: false}
      }

    ]
  },
]