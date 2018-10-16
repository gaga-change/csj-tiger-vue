import request from '@/utils/request'

// 新增付款单
export function addOrUpdatePayment(data) {
  return request({
    url: '/jqmapi/api/payment/addOrUpdatePayment',
    method: 'post',
    data: data
  })
}

// 付款单列表
export function getPaymentDetail(data) {
  return request({
    url: '/jqmapi/api/payment/getPaymentDetail',
    method: 'post',
    data: data
  })
}

// 选择采购单 POST /api/payment/createPayment
export function createPayment(data) {

  return request({
    url: '/jqmapi/api/payment/createPayment',
    method: 'post',
    data: data
  })

}
