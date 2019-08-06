import Vue from 'vue'
import ElementUI from 'element-ui'
import ItemTitle from '@/components/ItemTitle/index'
import ItemCard from '@/components/ItemCard/index'
import UploadMode from '@/components/upload/index'
import UploadExcel from '@/components/UploadExcel/index'
import BarCode from '@/components/BarCode/index'
import PopoverBtn from '@/components/PopoverBtn'
import BaseTable from '@/components/Table/table2.vue'
import SearchForm from '@/components/SearchForm/index'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import '@/icons'
import '@/permission'

import * as filters from './filters' // global filters

import { EXTENDS } from './assets/extends'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { locale, size: 'mini' })
Vue.use(EXTENDS)
Vue.use(ItemTitle)
Vue.use(ItemCard)
Vue.use(UploadMode)
Vue.use(UploadExcel)
Vue.use(BarCode)
Vue.use(PopoverBtn)
Vue.component('BaseTable2', BaseTable)
Vue.component('SearchForm2', SearchForm)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
