import request from '@/utils/request'


// /webApi/receive/add 新建收款单
export function addOrUpdateReceipt(data) {
  return request({
    url: `/webApi/receive/add`,
    method: 'post',
    data: data
  })
}
// /webApi/receive/relate/salesman 关联业务员
export function relateSalesMan(data) {
  return request({
    url: `/webApi/receive/relate/salesman`,
    method: 'post',
    data: data
  })
}
// /webApi/receive/list 查询付款单列表
export function getReceiptList(data) {
  return request({
    url: `/webApi/receive/list`,
    method: 'post',
    data: data
  })
}
// /webApi/receive/detail 查询付款单详情
export function getReceiptDetail(data) {
  return request({
    url: `/webApi/receive/detail?id=${data}`,
    method: 'get',
  })
}
