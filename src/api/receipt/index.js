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
export function getsalesman(data) {
  return request({
    url: `/webApi/receive/relate/salesman`,
    method: 'post',
    data: data
  })
}
// /webApi/sale/invoice/financialBilling财务开票
export function getSalesInvoiceFinancialBilling(data) {
  return request({
    url: `/webApi/sale/invoice/financialBilling`,
    method: 'post',
    data: data
  })
}
// /webApi/sale/invoice/billingReview开票审核
export function getSalesInvoiceBillingReview(data) {
  return request({
    url: `/webApi/sale/invoice/billingReview`,
    method: 'post',
    data: data
  })
}
//get /salesInvoiceInquiry销项开票接口
export function getSalesInvoiceInquiry(data) {
  return request({
    url: `/webApi/sale/invoice/salesInvoiceInquiry`,
    method: 'post',
    data: data
  })
}
