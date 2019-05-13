import { hasPermission } from './haspermission'
import { pickerOptions } from '@/utils'

const EXTENDS = {}
EXTENDS.install = Vue => {
  // 判断是否具有操作权限
  Vue.prototype.$haspermission = hasPermission
  Vue.prototype.$pickerOptions = pickerOptions
}

export { EXTENDS }
