import NProgress from 'nprogress' 

import router from './router'
import store from './store'
import { LoginPath } from '@/utils'

import 'nprogress/nprogress.css'
import { Message } from 'element-ui';

const whiteList = ['/csj_login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
  } else if (store.getters.userInfo == null) {
      store.dispatch('GetInfo').then(res => { 
        store.dispatch('gitMap').then(res=>{
          router.addRoutes(store.getters.menu)
          next({ ...to, replace: true })
        }).catch(err=>{
          router.addRoutes(store.getters.menu)
          next({ ...to, replace: true })
        })
      }).catch((err) => {
        // Message({
        //   showClose: true,
        //   message: err,
        //   duration:10000,
        //   type: 'error',
        //   onClose:()=>{
        //     location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
        //   }
        // });
        location.href = `${location.origin}/csj_logout`
        location.href='/csj_login'
        // location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
      })
    } else {
      next()
    }
  
})

router.afterEach(() => {
  NProgress.done() 
})
