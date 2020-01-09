import Vue from 'vue'
import ElementUI, { MessageBox } from 'element-ui'
import { cloneDeep } from 'lodash';
import ItemTitle from '@/components/ItemTitle/index'
import ItemCard from '@/components/ItemCard/index'
import UploadMode from '@/components/upload/index'
import UploadExcel from '@/components/UploadExcel/index'
import BarCode from '@/components/BarCode/index'
import PopoverBtn from '@/components/PopoverBtn'
import BaseTable2 from '@/components/Table/table2.vue'
import SearchForm2 from '@/components/SearchForm/index'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import BaseTable from '@/components/BaseTable'
import SearchForm from '@/components/SearchForm'
import BaseList from '@/components/BaseList'
import DoubleList from '@/components/DoubleList'
import PrintTableDialog from '@/components/PrintTableDialog'
import BasePrintTable from '@/components/BasePrintTable'
import DetailItem from '@/components/DetailItem'
import BaseForm from '@/components/BaseForm'
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
Vue.component('BaseTable2', BaseTable2)
Vue.component('SearchForm2', SearchForm2)
Vue.component('BaseTable', BaseTable);
Vue.component('SearchForm', SearchForm);
Vue.component('BaseList', BaseList);
Vue.component('DoubleList', DoubleList);
Vue.component('PrintTableDialog', PrintTableDialog);
Vue.component('BasePrintTable', BasePrintTable);
Vue.component('DetailItem', DetailItem);
Vue.component('BaseForm', BaseForm);

Vue.prototype.$copy = obj => cloneDeep(obj)
// 将枚举值（数字） 转为字符串，一般用于获取详情时处理
Vue.prototype.$valToString = (obj, keys) => keys.forEach(key => obj[key] = obj[key] !== null && obj[key] !== undefined ? obj[key] + '' : '')
Vue.prototype.$delConfirm = (msg, api, close) => {
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
  }).catch(() => {
    close && close()
  })
}

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  console.log('当前版本：', process.env.IMAGE_TAG)
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
