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
        if(res.success){
          store.dispatch('gitMap');
          store.dispatch('setLocalmenu',sessionStorage.getItem('mark')||store.getters.markArr[0]).then(res=>{
            next({ ...to, replace: true })  
          }); 
        } else{
          console.log(res);
          location.href = `/csj_logout`
        }
       
      }).catch((err) => {
        console.log(err);
        location.href = `/csj_logout`
      })

    } else {
      next()
    }

})

router.afterEach((to, from) => {
  NProgress.done() 
})
