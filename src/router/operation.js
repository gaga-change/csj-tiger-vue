const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'
import { reportCenterUrl } from '@/utils'

export default [
  {
    path: '/operation/messageList',
    component: Layout,
    redirect: '/operation/messageList',
    mark: '运营管理',
    meta: { title: '消息管理', icon: 'sale' },
    hidden: false,
    children: [
      {
        path: 'add',
        component: _import('operation/messageList/add'),
        name: 'newMessage',
        hidden: true,
        meta: { title: '新建', noCache: true }
      },
      {
        path: 'list',
        component: _import('operation/messageList/list'),
        name: 'messageInfoList',
        meta: { title: '消息推送', noCache: true },
        hidden: false,
      }
    ]
  },
]
