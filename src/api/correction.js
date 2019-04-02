import request from '@/utils/request'

// 入库业务单订正 列表查询
export function inwarehouseList(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-revisal-list`,
    method: 'post',
    data
  })
}

// 出库业务单订正 列表查询
export function outwarehouseList(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-revisal-list`,
    method: 'post',
    data
  })
}

// 查询可操作的货主列表
export function queryOwners() {
  return request({
    url: `/webApi/inwarehouse-revisal/query-owners`,
    method: 'get'
  })
}

// 查询指定货主入库单据
export function inOrderCode(ownerCode) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-order-code/${ownerCode}`,
    method: 'get'
  })
}

// 根据入库单号查询业务单号及供应商信息
export function inwarehouseBillInfo(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-bill-info`,
    method: 'post',
    data
  })
}