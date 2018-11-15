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

// 查询 列表、付款单详情
export function getPaymentListAndDetail(data) {
  return request({
    url: ` /api/payment/queryPayment`,
    method: 'post',
    data:data
  })
}

//  采购订单查询
export function BusibillNoSelect(data) {
  return request({
    url: ` /api/payment/busibillNoSelect`,
    method: 'post',
    data:data
  })
}
// 采购负责人审核
export function PaymentPurchaseAudit(data) {
  return request({
    url: ` /api/payment/purchaseAudit`,
    method: 'post',
    data:data
  })
}