import request from '@/utils/request'

//仓库枚举
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


//单据状态枚举
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

























