import { parseTime } from '@/utils'
export { parseTime }
import * as Enums from '@/utils/enum'
export function localEnum(value, type) {
  const obj = Enums[type] && Enums[type].find(item => item.value === Number(value))
  return (obj || {}).name || ''
}
export function apiEnum(val, mapConfig, type) {
  const config = mapConfig
  const arrResult = config[type] || []
  const result = arrResult.find(item => item.key === val) || {}
  return result.value || ''
}

export function statusFilter(val) {
  switch (parseInt(val)) {
    case -1: return '草稿'
    case 0: return '待审核'
    case 1: return '确认通过'
    case -2: return '驳回'
    case 2: return '作废'
    case 3: return '已处理'
    case 4: return '已报价'
    case 5: return '回单已登记'
    case 6: return '回单完成'
    default: return ''
  }
}

export function fundnatureFilter(val) {
  switch (parseInt(val)) {
    case 1: return '货款'
    case 2: return '服务费'
    case 3: return '投标保证金'
    case 4: return '投标保证金'
    default: return ''
  }
}
export function fundtypeFilter(val) {
  switch (parseInt(val)) {
    case 1: return '预付款'
    case 2: return '预收款'
    case 3: return '提货款'
    case 4: return '质保金'
    default: return ''
  }
}
export function settlementmethodFilter(val) {
  switch (parseInt(val)) {
    case 1: return '现金'
    case 2: return '银行转账'
    case 3: return '银行承兑'
    case 4: return '商业承兑'
    case 5: return '支票'
    default: return ''
  }
}

export function businesstypeFilter(val) {
  switch (parseInt(val)) {
    case 0: return '钢铁板块'
    case 1: return '汽车板块'
    default: return ''
  }
}

