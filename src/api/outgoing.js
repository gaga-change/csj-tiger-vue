import request from '@/utils/request'
import {stringify} from 'qs';

//出库业务单数据
export function outBillSelect(data={}) {
  return request({
    url: `/webApi/out/bill/select?${stringify(data)}`,
    method: 'get',
  })
}

//出库业务单详情数据
export function outBillDetail(data={}) {
  return request({
    url: `/webApi/out/bill/detail?${stringify(data)}`,
    method: 'get',
  })
}

//出库计划数据
export function outPlanSelect(data={}) {
  return request({
    url: `/webApi/out/plan/select?${stringify(data)}`,
    method: 'get',
  })
}

//出库计划详情数据
export function outPlanDetail(data={}) {
  return request({
    url: `/webApi/out/plan/detail?${stringify(data)}`,
    method: 'get',
  })
}
  
//出库单查询数据
export function outOrderSelect(data={}) {
  return request({
    url: `/webApi/out/order/select?${stringify(data)}`,
    method: 'get',
  })
}

//出库单查询详情数据
export function outOrderDetail(data={}) {
  return request({
    url: `/webApi/out/order/detail?${stringify(data)}`,
    method: 'get',
  })
}

//确认并生成出库单接口
export function orderSave(data={}) {
  return request({
    url: `/webApi/out/order/save`,
    method: 'post',
    data: data,
  })
}










