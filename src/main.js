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
import ApiSelect from '@/components/Select/ApiSelect'
import MapSelect from '@/components/Select/MapSelect'
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
Vue.component('ApiSelect', ApiSelect);
Vue.component('MapSelect', MapSelect);

Vue.prototype.$copy = obj => cloneDeep(obj)
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

Vue.prototype.$auditPrompt = (msg, api, options = {}) => {
  return MessageBox.prompt(msg || '请输入审核意见！', '提示', {
    distinguishCancelAndClose: true,
    inputPattern: /^.{0,50}$/,
    inputErrorMessage: '意见长度最多50个字',
    confirmButtonText: '通过',
    cancelButtonText: '驳回',
    beforeClose: (action, instance, done) => {
      const value = instance.inputValue
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.cancelButtonDisabled = true
        api({ pass: true, value }).then(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
            instance.cancelButtonDisabled = false
          }, 300)
        })
      } else if (action === 'cancel') {
        instance.cancelButtonLoading = true
        instance.confirmButtonDisabled = true
        api({ pass: false, value }).then(() => {
          done()
          setTimeout(() => {
            instance.cancelButtonLoading = false
            instance.confirmButtonDisabled = false
          }, 300)
        })
      } else {
        done()
      }
    },
    ...options,
  }).catch(() => { })
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
