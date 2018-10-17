import request from '@/utils/request'

// 新增进项发票POST /api/inputInvoice/addOrUpdateInputInvoice
export function addOrUpdateInputInvoice(data) {
  return request({
    url: '/webApi/inputInvoice/addOrUpdateInputInvoice',
    method: 'post',
    data: data
  })
}

// /api/inputInvoice/createInputInvoice 创建进项发票单
export function createInputInvoice(data) {
  return request({
    url: '/webApi/inputInvoice/createInputInvoice',
    method: 'post',
    data: data
  })
}

// /api/inputInvoice/getItemDetail 查询进项发票单子表详情
export function getItemDetail(data) {
  return request({
    url: '/webApi/inputInvoice/getItemDetail',
    method: 'post',
    data: data
  })
}

// POST /api/inputInvoice/getMainDetail 查询进项发票单列表
export function getMainDetail(data) {
  return request({
    url: '/webApi/inputInvoice/getMainDetail',
    method: 'post',
    data: data
  })
}

// POST /api/inputInvoice/getContractNoByService 根据供应商查询合同单号API
export function ContractNoByService(data) {
  return request({
    url: '/webApi/inputInvoice/getContractNoByService',
    method: 'post',
    data: data
  })
}

// POST /api/outputInvoice/getContractNoByCustomer 根据客户查询合同单号API
export function ContractNoByCustomer(data) {
  return request({
    url: '/webApi/outputInvoice/getContractNoByCustomer',
    method: 'post',
    data: data
  })
}

// POST /api/outputInvoice/addOrUpdateOutputInvoice 添加和修改销项发票API
export function addOrUpdateOutputInvoice(data) {
  return request({
    url: '/webApi/outputInvoice/addOrUpdateOutputInvoice',
    method: 'post',
    data: data
  })
}

// POST /api/outputInvoice/createOutputInvoice 创建销项发票单API
export function createOutputInvoice(data) {
  return request({
    url: '/webApi/outputInvoice/createOutputInvoice',
    method: 'post',
    data: data
  })
}

// POST /api/outputInvoice/getItemDetail 查询销项发票单子表详情
export function getOutItemDetail(data) {
  return request({
    url: '/webApi/outputInvoice/getItemDetail',
    method: 'post',
    data: data
  })
}

// POST /api/outputInvoice/getMainDetail 查询销项发票单列表
export function getOutMainDetail(data) {
  return request({
    url: '/webApi/outputInvoice/getMainDetail',
    method: 'post',
    data: data
  })
}

// POST /api/applyInvoice/addOrUpdateApplyInvoice 添加和修改入销项发票申请单API
export function addOrUpdateApplyInvoice(data) {
  return request({
    url: '/webApi/applyInvoice/addOrUpdateApplyInvoice',
    method: 'post',
    data: data
  })
}

// POST /api/applyInvoice/getCanOutputInvoice 查询可开销项发票单API
export function getCanOutputInvoice(data) {
  return request({
    url: '/webApi/applyInvoice/getCanOutputInvoice',
    method: 'post',
    data: data
  })
}

// POST /api/applyInvoice/getItemDetail 查询销项发票申请单详情
export function getApplyItemDetail(data) {
  return request({
    url: '/webApi/applyInvoice/getItemDetail',
    method: 'post',
    data: data
  })
}

// POST /api/applyInvoice/getMainDetail 查询销项发票申请单列表
export function getApplyMainDetail(data) {
  return request({
    url: '/webApi/applyInvoice/getMainDetail',
    method: 'post',
    data: data
  })
}
