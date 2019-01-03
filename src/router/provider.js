const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/provider',
    component: Layout,
    redirect: '/provider/list',
    name: 'provider',
    meta: { title: '供应商直发', icon: 'sale',noCache: true }, 
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('provider/list'),
        name: 'list',
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
        name: 'detail',
        hidden:true,
        meta: {title: '客户收货登记详情',noCache: true }
      },
    ]
  },

]
