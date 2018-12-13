import request from '@/utils/request'
import {stringify} from 'qs'

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
// /webApi/receive/list 查询付款单列表
export function getReceiptListTotal(data) {
  return request({
    url: `/webApi/receive/list/total`,
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

// /webApi/receive/fina/check财务审核收款单
export function receiptFinaCheck(data) {
  return request({
    url: `/webApi/receive/fina/check`,
    method: 'post',
    data: data
  })
}

// /webApi/receive/relate/check执行单审核
export function receiptRelateCheck(data) {
  return request({
    url: `/webApi/receive/relate/check`,
    method: 'post',
    data: data
  })
}
// /webApi/receive/fina/submit提交
export function receiptFinaSubmit(data) {
  return request({
    url: `/webApi/receive/fina/submit`,
    method: 'post',
    data: data
  })
}
// /webApi/receive/busiOrder 查询订单合同
export function getReceiptBusiOrder(data) {
  return request({
    url: `/webApi/receive/busiOrder?${stringify(data)}`,
    method: 'get',
  })
}
// /webApi/receive/relate/order执行单保存或提交 （关联订单接口）
export function receiptRelateOrderApi(data) {
  return request({
    url: `/webApi/receive/relate/order`,
    method: 'post',
    data: data
  })
}
// /relate/submit 执行单提交 （关联订单接口）
export function receiptRelateOrderSubmitApi(data) {
  return request({
    url: `/webApi/receive/relate/submit`,
    method: 'post',
    data: data
  })
}

// /webApi/receiveinvalidate 收款业务单作废
export function receiptInvalidate(data) {
  return request({
    url: `/webApi/receive/invalidate`,
    method: 'post',
    data: data
  })
}


// 收款详情删除
export function dropReceive(id) {
  return request({
    url: `/webApi/receive/dropReceive?id=${id}`,
    method: 'get',
  })
}
//业务员 /webApi/receive/salesman/list
export function allSaleman() {
  return request({
    url: `/webApi/receive/salesman/list`,
    method: 'get',
  })
}