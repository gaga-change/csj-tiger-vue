import request from '@/utils/request'
//出库业务单数据
export function getOutStoreList(data = {}) {
  return request({
    url: `/webApi/logistics/query-outwarehouse-orders`,
    method: 'post',
    data
  })
}

export function getCustomerList(data = {}) {
  return request({
    url: `/webApi/customer/list`,
    method: 'post',
    data: data
  })
}
export function saveCustomer(data = {}) {
  return request({
    url: `/webApi/customer/save`,
    method: 'post',
    data
  })
}
export function updateOwnerCust(data = {}) {
  return request({
    url: `/webApi/customer/updateOwnerCust`,
    method: 'post',
    data
  })
}

export function customerUpdate(data = {}) {
  return request({
    url: `/webApi/customer/update`,
    method: 'post',
    data
  })
}


export function ownerCustList(data = {}) {
  return request({
    url: `/webApi/customer/ownerCustList`,
    method: 'post',
    data
  })
}
export function delCustomer(data = {}) {
  return request({
    url: `/webApi/customer/del`,
    method: 'post',
    data
  })
}
// 客户地址列表
export function customerAddressList(data = {}) {
  return request({
    url: `/webApi/customer/addr/list`,
    method: 'post',
    data: data
  })
}
// /webApi/customer/addr/save
export function saveCustomerAddress(data = {}) {
  return request({
    url: `/webApi/customer/addr/save`,
    method: 'post',
    data
  })
}
//  /webApi/customer/addr/del
export function delCustomerAddress(data = {}) {
  return request({
    url: `/webApi/customer/addr/del`,
    method: 'get',
    params: data
  })
}
// /webApi/customer/addr/update
export function updateCustomerAddress(data = {}) {
  return request({
    url: `/webApi/customer/addr/update`,
    method: 'post',
    data
  })
}

export function getOwnerCustList(data = {}) {
  return request({
    url: `/webApi/base/info/getOwnerCustListByCustomer`,
    method: 'post',
    data
  })
}
export function getOwnerProviderList(data = {}) {
  return request({
    url: `/webApi/base/info/getOwnerProviderList`,
    method: 'post',
    data
  })
}
export function queryLogisticsList(data = {}) {
  return request({
    url: `/webApi/logistics/query-logistics-list`,
    method: 'post',
    data
  })
}
export function createNewLogistics(data = {}) {
  return request({
    url: `/webApi/logistics/create-new-logistics`,
    method: 'post',
    data
  })
}
export function queryLogisticsDetail(id) {
  return request({
    url: `/webApi/logistics/query-logistics-detail/${id}`,
    method: 'get'
  })
}
export function updateLogisticsInfo(data = {}) {
  return request({
    url: `/webApi/logistics/update-logistics-info`,
    method: 'PUT',
    data
  })
}
export function updateLogisticsDetailInfo(data = {}) {
  return request({
    url: `/webApi/logistics/update-logistics-detail-info`,
    method: 'PUT',
    data
  })
}
export function approveLogistics(data = {}) {
  return request({
    url: `/webApi/logistics/approve`,
    method: 'post',
    data
  })
}
export function deleteLogistics(id) {
  return request({
    url: `/webApi/logistics/delete-logistics/${id}`,
    method: 'DELETE'
  })
}
export function queryLogisticsExpenseConfirmed() {
  return request({
    url: `/webApi/logistics-expense/query-logistics-expense-confirmed`,
    method: 'get'
  })
}
export function addLogisticsExpense(data = {}) {
  return request({
    url: `/webApi/logistics/add-logistics-expense`,
    method: 'post',
    data
  })
}
export function queryExpenseInfo(id) {
  return request({
    url: `/webApi/logistics/query-expense-info/${id}`,
    method: 'get'
  })
}
export function deleteLogisticsExpense(id) {
  return request({
    url: `/webApi/logistics/delete-logistics-expense/${id}`,
    method: 'DELETE'
  })
}

export function queryDispatchDetail(data) {
  return request({
    url: `/webApi/logistics-dispatch/query-dispatch-detail`,
    method: 'get',
    params: data
  })
}
export function queryRouteInfo(id) {
  return request({
    url: `/webApi/logistics-route/query-route-info/${id}`,
    method: 'get'
  })
}

// /webApi/customer/addr/default
export function customerSetDefaultAddress(data) {
  return request({
    url: `/webApi/customer/addr/default`,
    method: 'get',
    params: data
  })
}

//物流单获取配送明细
export function dispatchDetailInfo(data) {
  return request({
    url: `/webApi/logistics-dispatch/query-dispatch-detail`,
    method: 'get',
    params: data
  })
}

//投保列表查询
export function insureListInfo(data) {
  return request({
    url: `/webApi/logistics/queryInsure`,
    method: 'post',
    data: data
  })
}

//投保
export function insureConfirm(data) {
  return request({
    url: `/webApi/logistics/insure`,
    method: 'post',
    data: data
  })
}

//解除投保
export function unInsureConfirm(data) {
  return request({
    url: `/webApi/logistics/unInsure`,
    method: 'post',
    data: data
  })
}

// /webApi/freightTemplate/save 保存物流模板
export function saveFreightTemplate(data) {
  return request({
    url: `/webApi/freightTemplate/save`,
    method: 'post',
    data: data
  })
}

///webApi/freightTemplate/queryPage
export function queryFreightTemplate(data) {
  return request({
    url: `/webApi/freightTemplate/queryPage`,
    method: 'post',
    data: data
  })
}

// /webApi/freightTemplate/queryTemplate/{templateCode}
export function getFreightTemplateByTemplateCode(templateCode) {
  return request({
    url: `/webApi/freightTemplate/queryTemplate/${templateCode}`,
    method: 'get'
  })
}

// /webApi/freightTemplate/delete/FY190827000055
export function deleteFreightTemplate(templateCode) {
  return request({
    url: `/webApi/freightTemplate/delete/${templateCode}`,
    method: 'delete'
  })
}

//项目部列表
export function projectInfo(data) {
  return request({
    url: `/webApi/project/info/page`,
    method: 'get',
    params: data
  })
}

//项目部新增
export function projectCreate(data) {
  return request({
    url: `/webApi/project/info/save`,
    method: 'post',
    data: data
  })
}

//项目部修改
export function projectUpdate(data) {
  return request({
    url: `/webApi/project/info/update`,
    method: 'post',
    data: data
  })
}

//项目部启禁用
export function projectStatusChange(data) {
  return request({
    url: `/webApi/project/info/effect`,
    method: 'post',
    data: data
  })
}

//费用列表
export function costInfo(data) {
  return request({
    url: `/webApi/cost/info/page`,
    method: 'get',
    params: data
  })
}

//费用新增
export function costInfoCreate(data) {
  return request({
    url: `/webApi/cost/info/save`,
    method: 'post',
    data: data
  })
}

//费用修改
export function costInfoUpdate(data) {
  return request({
    url: `/webApi/cost/info/update`,
    method: 'post',
    data: data
  })
}

//费用启禁用
export function costStatusChange(data) {
  return request({
    url: `/webApi/cost/info/effect`,
    method: 'post',
    data: data
  })
}

//费用关联项目部
export function costProjectContact(data) {
  return request({
    url: `/webApi/cost/info/updateCostProject`,
    method: 'post',
    data: data
  })
}

//查看费用关联项目部
export function costProjectInfo(data) {
  return request({
    url: `/webApi/cost/info/getProject`,
    method: 'get',
    params: data
  })
}

//货主关联项目部
export function tenantProjectContact(data) {
  return request({
    url: `/webApi/owner/info/updateOwnerProject`,
    method: 'post',
    data: data
  })
}

//获取货主已关联项目部
export function tenantProjectInfo(data) {
  return request({
    url: `/webApi/owner/info/getProject`,
    method: 'get',
    params: data
  })
}

//承运商关联项目部
export function carrierProjectContact(data) {
  return request({
    url: `/webApi/consoil/info/updateConsolidatorProject`,
    method: 'post',
    data: data
  })
}

//获取承运商已关联项目部
export function carrierProjectInfo(data) {
  return request({
    url: `/webApi/consoil/info/getProject`,
    method: 'get',
    params: data
  })
}

//仓库关联项目部
export function warehouseProjectContact(data) {
  return request({
    url: `/webApi/base/set/warehouse/updateWarehouseProject`,
    method: 'post',
    data: data
  })
}

//获取仓库已关联项目部
export function warehouseProjectInfo(data) {
  return request({
    url: `/webApi/base/set/warehouse/getProject`,
    method: 'get',
    params: data
  })
}