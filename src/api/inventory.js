import request from '@/utils/request'
import {stringify} from 'qs'

//库存查询数据
export function stockSelect(data={}) {
  return request({
    url: `/webApi/stock/select?${stringify(data)}`,
    method: 'get',
  })
}

//库存查询详情数据
export function stockRecord(data={}) {
  return request({
    url: `/webApi/stock/record?${stringify(data)}`,
    method: 'get',
  })
}

//库存查询页面货主下拉列表
export function ownerSelect() {
  return request({
    url: `/webApi/owner/info/getOwner`,
    method: 'get',
  })
}










