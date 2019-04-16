const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [
  
  {
    path: '/mis/products',
    component: Layout,
    redirect: '/mis/products/list',
    mark:'基础档案',
    meta: { title: '商品管理', icon: 'sale' },
    children: [
      {
        path: 'newproduct',
        component: _import('mis/products/newproduct'),
        name: 'newproduct',
        meta: { title: '新增商品',noCache: false }
      },
      {
        path: 'list',
        component: _import('mis/products/list'),
        name: 'productsList',
        meta: { title: '商品列表' }
      },
      {
        path: 'categoryList',
        component: _import('category/list'),
        name: 'categoryList',
        meta: { title: '商品分类列表', noCache: true }
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
    path: '/tenant',
    component: Layout,
    redirect: '/tenant/list',
    name: 'tenant',
    mark: '基础档案',
    meta: { title: '货主(租户)管理', icon: 'tree', noCache: true },
    hidden: false,
    children: [
      {
        path: 'list',
        component: _import('tenant/list'),
        name: 'tenantList',
        hidden: false,
        meta: { title: '货主查询', noCache: true }
      },
      {
        path: 'add',
        component: _import('tenant/add'),
        name: 'tenantAdd',
        hidden: true,
        meta: { title: '添加货主', noCache: false }
      },
      {
        path: 'detail',
        component: _import('tenant/detail'),
        name: 'tenantDetail',
        hidden: true,
        meta: { title: '货主详情', noCache: true }
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    mark:'基础档案',
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
    path: '/supplierManagement',
    component: Layout,
    redirect: '/supplierManagement/list',
    name: 'supplierManagement',
    mark:'基础档案',
    meta: { title: '供应商管理', icon: 'sale' },
    children: [
      {
        path: 'list',
        component: _import('mis/supplierManagement/list'),
        name: 'supplierManagementList',
        meta: { title: '供应商管理',icon: 'sale' }
      }
    ]
  },

  {
    path: '/carrier',
    component: Layout,
    redirect: '/carrier/list',
    name: 'carrier',
    mark:'基础档案',
    meta: { title: '承运商管理', icon: 'sale' },
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
    mark:'基础档案',
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
    path: '/tenantAdmin',
    component: Layout,
    redirect: '/tenantAdmin/list',
    name: 'tenantAdmin',
    mark: '基础档案',
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
    path: '/businessset',
    component: Layout,
    mark:'基础档案',
    redirect: 'businessset/configuration',
    meta: { title: '业务设置', noCache: true ,icon:'busyness'},
    hidden: false,
    children: [
      {
        name: 'warehouseuser',
        path: 'warehouseuser',
        meta: { title: '仓库用户配置', noCache: true,icon:'plan'  },
        component: _import('businessset/warehouseuser/index')
      },
    ]
  },
]
