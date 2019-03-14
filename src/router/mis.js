const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

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
    path: '/products',
    component: Layout,
    redirect: '/products/list',
    name: 'products',
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
    ]
  }
]
