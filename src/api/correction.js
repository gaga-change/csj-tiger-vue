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

// 查询指定货主出库单据
export function outOrderCode(ownerCode) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-order-code/${ownerCode}`,
    method: 'get'
  })
}

// 根据入库单号查询业务单号及供应商信息
export function inwarehouseBillInfo(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-bill-info`,
    method: 'get',
    params: data
  })
}

// 根据出库单号查询业务单号及供应商信息
export function outwarehouseBillInfo(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-bill-info`,
    method: 'get',
    params: data
  })
}


// 查询指定入库单下的入库商品信息（用于创建入库订正单）
export function inwarehouseOrderDetail(inWarehouseOrderCode) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-order-detail/${inWarehouseOrderCode}`,
    method: 'get'
  })
}
// 查询指定出库单下的入库商品信息（用于创建入库订正单）
export function outwarehouseOrderDetail(inWarehouseOrderCode) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-order-detail/${inWarehouseOrderCode}`,
    method: 'get'
  })
}

// 创建入库订正单
export function createInwarehouseRevisal(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/create-inwarehouse-revisal`,
    method: 'post',
    data
  })
}

// 创建出库订正单
export function createOutwarehouseRevisal(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/create-outwarehouse-revisal`,
    method: 'post',
    data
  })
}

// 删除入库订正单
export function deleteInwarehouseRevisal(id) {
  return request({
    url: `/webApi/inwarehouse-revisal/delete-inwarehouse-revisal/${id}`,
    method: 'delete'
  })
}

// 删除出库订正单
export function deleteOutwarehouseRevisal(id) {
  return request({
    url: `/webApi/outwarehouse-revisal/delete-outwarehouse-revisal/${id}`,
    method: 'delete'
  })
}

// 审核入库订正单
export function inwarehouseApproveRevisal(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/approve-revisal`,
    method: 'post',
    data
  })
}

// 审核出库订正单
export function outwarehouseApproveRevisal(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/approve-revisal`,
    method: 'post',
    data
  })
}

// 查看入库订正单详情内容
export function queryInwarehouseRevisal(id) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-revisal/${id}`,
    method: 'get'
  })
}

// 查看出库订正单详情内容
export function queryOutwarehouseRevisal(id) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-revisal/${id}`,
    method: 'get'
  })
}

// 修改入库订正单信息
export function updateInwarehouseRevisal(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/update-inwarehouse-revisal`,
    method: 'put',
    data
  })
}

// 修改出库订正单信息
export function updateOutwarehouseRevisal(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/update-outwarehouse-revisal`,
    method: 'put',
    data
  })
}

// 查看审核记录
export function queryApprovedItems(id) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-approved-items/${id}`,
    method: 'get'
  })
}

// 查看审核记录
export function outQueryApprovedItems(id) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-approved-items/${id}`,
    method: 'get'
  })
}
