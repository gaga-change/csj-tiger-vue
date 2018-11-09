import request from '@/utils/request'


// /webApi/sale/invoice/billingDetails开票详情
export function getSalesInvoiceDetails(data) {
  return request({
    url: `/webApi/sale/invoice/billingDetails`,
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

// /webApi/sale/invoice/billingReview开票驳回
export function getSalesInvoiceBillingReject(data) {
  return request({
    url: `/webApi/sale/invoice/reject`,
    method: 'post',
    data: data
  })
}

//post /salesInvoiceInquiry销项开票接口
export function getSalesInvoiceInquiry(data) {
  return request({
    url: `/webApi/sale/invoice/salesInvoiceInquiry`,
    method: 'post',
    data: data
  })
}
//post /webApi/sale/invoice/submitBilling 一键提交 id开票id
export function getSalesInvoiceSubmit(data) {
  return request({
    url: `/webApi/sale/invoice/submitBilling`,
    method: 'post',
    data: data
  })
}
//post /webApi/sale/invoice/complex 一键提交 id开票id  ticketStatusEnum;
export function getSalesInvoiceComplex(data) {
  return request({
    url: `/webApi/sale/invoice/complex`,
    method: 'post',
    data: data
  })
}
