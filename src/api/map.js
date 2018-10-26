import request from '@/utils/request'

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


























