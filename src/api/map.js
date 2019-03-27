import request from '@/utils/request'
import { stringify } from 'querystring';

//仓库类型枚举
export function getWarehouseType() {
  return request({
    url: `/webApi/base/enum/getWarehouseType`,
    method: 'get',
  })
}


//业务类型枚举
export function getBillType() {
  return request({
    url: '/webApi/base/enum/getBillType',
    method: 'get'
  })
}


//单据状态枚举|执行状态
export function outbusibillstate() {
  return request({
    url: '/webApi/out/bill/outbusibillstate',
    method: 'get'
  })
}


//下推状态枚举
export function getIssuedState() {
  return request({
    url: '/webApi/base/enum/getIssuedState',
    method: 'get',
  })
}


//出入库类型枚举
export function getStockDirectType() {
  return request({
    url: '/webApi/base/enum/getStockDirectType',
    method: 'get',
  })
}

//货主枚举
export function ownerInfoMap() {
  return request({
    url: '/webApi/base/info/getOwner',
    method: 'get',
  })
}

//审核状态枚举
export function getApproveStatusMap() {
  return request({
    url: '/webApi/base/enum/getApproveStatus',
    method: 'get',
  })
}

//仓库枚举
export function getWarehouse() {
  return request({
    url: '/webApi/base/info/getWarehouse',
    method: 'get',
  })
}

//开票状态枚举
export function getSignStatus() {
  return request({
    url: '/webApi/base/enum/getSignStatus',
    method: 'get',
  })
}


//供应商直发单据状态枚举
export function getReceiveStatus() {
  return request({
    url: '/webApi/base/enum/getReceiveStatus',
    method: 'get',
  })
}

//退货管理-单据状态枚举
export function getRefundStatus() {
  return request({
    url: '/webApi/base/enum/getRefundStatus',
    method: 'get',
  })
}

//退货管理-退款原因枚举
export function getRefundReason() {
  return request({
    url: '/webApi/base/enum/getRefundReason',
    method: 'get',
  })
}

//退货管理-款项性质枚举
export function getMoneyState() {
  return request({
    url: '/webApi/base/enum/getMoneyState',
    method: 'get',
  })
}

//退货管理-退款方式枚举
export function getPaymentMode() {
  return request({
    url: '/webApi/base/enum/getPaymentMode',
    method: 'get',
  })
}


//退货管理-退款类型枚举
export function getRefundType() {
  return request({
    url: '/webApi/base/enum/getRefundType',
    method: 'get',
  })
}


//承运商状态
export function getConsoildator() {
  return request({
    url: '/webApi/base/enum/getConsoildatorState',
    method: 'get',
  })
}


//仓配点管理-结算区分枚举
export function getSettlementType() {
  return request({
    url: '/webApi/base/enum/getSettlementType',
    method: 'get',
  })
}

export function getRegional() {
  return request({
    url: '/webApi/base/enum/getRegional',
    method: 'get',
  })
}














