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
