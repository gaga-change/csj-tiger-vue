import request from '@/utils/request'

// 入库业务单订正 列表查询
export function inwarehouseList(data) {
  return request({
    url: `/webApi/inwarehouse-revisal/query-inwarehouse-revisal-list`,
    method: 'post',
    data
  })
}

// 出库业务单订正 列表查询
export function outwarehouseList(data) {
  return request({
    url: `/webApi/outwarehouse-revisal/query-outwarehouse-revisal-list`,
    method: 'post',
    data
  })
}
