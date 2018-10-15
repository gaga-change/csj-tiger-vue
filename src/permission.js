import NProgress from 'nprogress' 

import router from './router'
import store from './store'
import { LoginPath } from '@/utils'

import 'nprogress/nprogress.css'

const whiteList = ['/csj_login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
  } else if (store.getters.userInfo == null) {
      store.dispatch('GetInfo').then(res => { 
        // console.log(res)
        // debugger
        
        if (res.data == null) {
          location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
          return 
        } 
        router.addRoutes(store.getters.menu)
        next({ ...to, replace: true })
      }).catch((err) => {
        location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
      })
    } else {
      next()
    }
  
})

router.afterEach(() => {
  NProgress.done() 
})
