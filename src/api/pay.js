import request from '@/utils/request'
import {stringify} from 'qs'

// 新建付款单
export function addOrUpdatePayment(data) {
  return request({
    url: `/api/payment/savePayment`,
    method: 'post',
    data: data
  })
}
// 提交
export function paymentSubmit(data) {
  return request({
    url: `/api/payment/submitPayment`,
    method: 'post',
    data: data
  })
}
// 查询 列表、付款单详情
export function getPaymentListAndDetail(data) {
  return request({
    url: `/api/payment/queryPayment`,
    method: 'post',
    data:data
  })
}

//  采购订单查询
export function BusibillNoSelect(data) {
  return request({
    url: `/api/payment/busibillNoSelect`,
    method: 'post',
    data:data
  })
}
// 申请审核
export function PaymentPurchaseAudit(data) {
  return request({
    url: `/api/payment/purchaseAudit`,
    method: 'post',
    data:data
  })
}
// 登记审核
export function PaymentPurchaseRegisterAudit(data) {
  return request({
    url: `/api/payment/registerAudit`,
    method: 'post',
    data:data
  })
}
// 付款登记驳回（不走工作流）
export function PaymentPurchaseAuditSingle(data) {
  return request({
    url: `/api/payment/payRegisterAuditReject`,
    method: 'post',
    data:data
  })
}
// 订单发票信息查看
export function invoiceSelect(data) {
  return request({
    url: `/api/payment/invoiceSelect`,
    method: 'post',
    data:data
  })
}
// 订单入库信息查询
export function inOrderSelect(data) {
  return request({
    url: `/api/payment/inOrderSelect`,
    method: 'post',
    data:data
  })
}
//  操作记录
export function paymentRecord(data) {
  return request({
    url: `/api/payment/operationRecord`,
    method: 'post',
    data:data
  })
}
// 付款登记
export function payRegister(data) {
  return request({
    url: `/api/payment/payRegister`,
    method: 'post',
    data:data
  })
}
// 付款登记提交
export function payRegisterCommit(data) {
  return request({
    url: `/api/payment/payRegisterCommit`,
    method: 'post',
    data:data
  })
}
 // 客户查询
 export function getProvider(data) {
  return request({
    url: `/webApi/base/info/getProvider`,
    method: 'get',
  })
}
export function getAllProvider(data) {
  return request({
    url: `/webApi/base/info/getAllProvider`,
    method: 'get',
  })
}
//
// 删除付款详情
export function dropPayment(data) {
  return request({
    url: `/api/payment/dropPayment?${stringify(data)}`,
    method: 'get',
  })
}
// 拉取对账单
export function infoInvoiceAmmount(data) {
  return request({
    url: `/api/payment/getInvoiceAmmount`,
    method: 'post',
    data:data
  })
}
// 获取对账单最后拉取时间
export function getLastTime(data) {
  return request({
    url: `/api/payment/getLastTime`,
    method: 'post',
    data:data
  })
}
//  付款登记单查询
export function getPaymentRegisterData(data) {
  return request({
    url: `/api/payment/selectRegisterData`,
    method: 'post',
    data:data
  })
}

// 根据合同号查询附件
export function getContractFiles(data) {
  return request({
    url: `/api/payment/selectContractFiles`,
    method: 'post',
    data:data
  })
}

export function infoPaymentTotal(data) {
  return request({
    url: `/api/payment/list/total`,
    method: 'post',
    data:data
  })
}
// /webApi/accountbill/queryAccountBill
export function getBillId(data) {
  return request({
    url: `/webApi/accountbill/queryAccountBill?${stringify(data)}`,
    method: 'get',
  })
}