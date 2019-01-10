import NProgress from 'nprogress' 

import router from './router'
import store from './store'
import { LoginPath } from '@/utils'
import { asyncRouterMap }  from '@/router'
import 'nprogress/nprogress.css'
const whiteList = ['/csj_login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    next()
  } else if (store.getters.userInfo == null) {
      store.dispatch('GetInfo').then(res => { 
        if(res.success){
          store.dispatch('gitMap');
          let mark=findMark(asyncRouterMap,to.path);
          store.dispatch('setLocalmenu',mark||store.getters.markArr[0]).then(res=>{
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


function findMark(arr=[],path){
  let mark='';
  arr.forEach(items=>{
    if(items.path===path){
      mark=items.mark
       return ;
    } else if(items.children&&Array.isArray(items.children)){
      items.children.forEach(item=>{
         if((items.path+'/'+item.path)===path){
           mark=items.mark;
           return ;
         }
      })
    }
 })

 return mark;

}
