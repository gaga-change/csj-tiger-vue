const _import = require('./_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '../views/layout/Layout'

export default [
  {
    path: '/tenant',
    component: Layout,
    redirect: '/tenant/list',
    name: 'tenant',
    mark: '仓储运营',
    meta: { title: '租户管理', icon: 'tree', noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('tenant/list'),
        name: 'tenantList',
        hidden: false,
        meta: { title: '租户查询', noCache: true }
      },
      {
        path: 'add',
        component: _import('tenant/add'),
        name: 'tenantAdd',
        hidden: true,
        meta: { title: '添加租户', noCache: false }
      },
      {
        path: 'detail',
        component: _import('tenant/detail'),
        name: 'tenantDetail',
        hidden: true,
        meta: { title: '租户详情', noCache: true }
      }
    ]
  },
  {
    path: '/tenantAdmin',
    component: Layout,
    redirect: '/tenantAdmin/list',
    name: 'tenantAdmin',
    mark: '仓储运营',
    meta: { title: '租户管理员', icon: 'tree', noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('tenantAdmin/list'),
        name: 'tenantAdminList',
        hidden: false,
        meta: { title: '租户管理员', noCache: true }
      },
      {
        path: 'add',
        component: _import('tenantAdmin/add'),
        name: 'tenantAdminAdd',
        hidden: true,
        meta: { title: '添加租户管理员', noCache: false }
      },
      {
        path: 'detail',
        component: _import('tenantAdmin/detail'),
        name: 'tenantAdminDetail',
        hidden: true,
        meta: { title: '租户管理员详情', noCache: true }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: 'category/list',
    mark: '仓储运营',
    meta: { title: '商品分类管理', icon: 'plan', noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('category/list'),
        name: 'categoryList',
        meta: { title: '商品分类管理', icon: 'plan', noCache: true }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: 'product/list',
    mark: '仓储运营',
    meta: { title: '商品列表', icon: 'plan', noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('product/list'),
        name: 'productList',
        meta: { title: '商品列表', icon: 'plan', noCache: true }
      }
    ]
  }
]
