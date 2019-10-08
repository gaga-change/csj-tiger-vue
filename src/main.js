import Vue from 'vue'
import ElementUI, { MessageBox } from 'element-ui'
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
Vue.prototype.$delConfirm = (msg, api) => {
  MessageBox.confirm(msg || '此操作将永久删除该行, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        api().then(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        })
      } else {
        done()
      }
    }
  }).then(() => {
  }).catch(() => { })
}

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  console.log('--- 当前版本：', process.env.IMAGE_TAG)
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
