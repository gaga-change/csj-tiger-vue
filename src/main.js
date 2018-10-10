import Vue from 'vue'
import ElementUI from 'element-ui'

import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' 
import '@/permission' 
import { EXTENDS } from './assets/extends'

Vue.use(ElementUI, { locale })
Vue.use(EXTENDS)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
