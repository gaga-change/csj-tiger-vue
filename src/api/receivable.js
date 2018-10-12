import request from '@/utils/request'

// 新增收款单POST /api/receivable/addOrUpdateReceivable
export function addOrUpdateReceivable(data) {
  return request({
    url: '/jqmapi/api/receivable/addOrUpdateReceivable',
    method: 'post',
    data: data
  })
}

// 收款单列表POST /api/receivable/getReceivableDetail
export function getReceivableDetail(data) {
  return request({
    url: '/jqmapi/api/receivable/getReceivableDetail',
    method: 'post',
    data: data
  })
}

// POST /api/receivable/createReceivable
export function createReceivable(data) {
  return request({
    url: '/jqmapi/api/receivable/createReceivable',
    method: 'post',
    data: data
  })
}
