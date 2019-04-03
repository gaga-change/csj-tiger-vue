import request from '@/utils/request'
//出库业务单数据
export function getOutStoreList(data={}) {
  return request({
    url: `/webApi/logistics/query-outwarehouse-orders`,
    method: 'post',
    data
  })
}

export function queryLogisticsExpenseAll(data={}) {
  return request({
    url: `/webApi/logistics-expense/query-logistics-expense-all`,
    method: 'get',
    params: data
  })
}

export function getDeliveryList(data={}) {
  // return request({
  //   url: ``,
  //   method: 'post',
  //   data
  // })
  return new Promise((resolve, reject) => {
    resolve({
      success: true,
      data: [
        {orderNo: 't1aacc001', orderName: 'aaa', orderNatrue: 1, id:1},
        {orderNo: 't1aacc001', orderName: 'aaab', orderNatrue: 1, id:2},
        {orderNo: 't1aacc001', orderName: 'aaa', orderNatrue: 1,id:3}
      ]
    })
  })
}
export function createLogisticsExpense(data={}) {
  return request({
    url: `/webApi/logistics-expense/create-logistics-expense`,
    method: 'post',
    data: data
  })
}

export function getCustomerList(data={}) {
  return request({
    url: `/webApi/customer/list`,
    method: 'post',
    data: data
  })
}
export function saveCustomer(data={}) {
  return request({
    url: `/webApi/customer/save`,
    method: 'post',
    data
  })
}
export function updateOwnerCust(data={}) {
  return request({
    url: `/webApi/customer/updateOwnerCust`,
    method: 'post',
    data
  })
}
export function ownerCustList(data={}) {
  return request({
    url: `/webApi/customer/ownerCustList`,
    method: 'post',
    data
  })
}
export function delCustomer(data={}) {
  return request({
    url: `/webApi/customer/del`,
    method: 'post',
    data
  })
}
// 客户地址列表
export function customerAddressList(data={}) {
  return request({
    url: `/webApi/customer/addr/list`,
    method: 'post',
    data: data
  })
}
// /webApi/customer/addr/save
export function saveCustomerAddress(data={}) {
  return request({
    url: `/webApi/customer/addr/save`,
    method: 'post',
    data
  })
}
//  /webApi/customer/addr/del
export function delCustomerAddress(data={}) {
  return request({
    url: `/webApi/customer/addr/del`,
    method: 'get',
    params: data
  })
}
// /webApi/customer/addr/update
export function updateCustomerAddress(data={}) {
  return request({
    url: `/webApi/customer/addr/update`,
    method: 'post',
    data
  })
}
export function getOwnerCustList(data={}) {
  return request({
    url: `/webApi/base/info/getOwnerCustList`,
    method: 'post',
    data
  })
}
export function getOwnerProviderList(data={}) {
  return request({
    url: `/webApi/base/info/getOwnerProviderList`,
    method: 'post',
    data
  })
}
export function queryLogisticsList(data={}) {
  return request({
    url: `/webApi/logistics/query-logistics-list`,
    method: 'post',
    data
  })
}
export function createNewLogistics(data={}) {
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
export function updateLogisticsInfo(data={}) {
  return request({
    url: `/webApi/logistics/update-logistics-info`,
    method: 'PUT',
    data
  })
}
export function updateLogisticsDetailInfo(data={}) {
  return request({
    url: `/webApi/logistics/update-logistics-detail-info`,
    method: 'PUT',
    data
  })
}
export function approveLogistics(data={}) {
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
