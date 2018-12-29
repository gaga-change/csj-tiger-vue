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


// 出库单查询 合计接口 
export function selectTotal(data={}) {
  return request({
    url: `/webApi/out/order/select/total?${stringify(data)}`,
    method: 'get',
  })
}


// 根据出库业务单查询采购单信息
export function planGetBill(data={}) {
  return request({
    url: `/webApi/out/plan/getBill?${stringify(data)}`,
    method: 'get',
  })
}


// 自动匹配
export function planAutoMatch(data={}) {
  return request({
    url: `/webApi/out/plan/autoMatch?${stringify(data)}`,
    method:'get',
  })
}

// 匹配操作
export function planHandMatch(data={}) {
  return request({
    url: `/webApi/out/plan/handMatch`,
    method: 'post',
    data: data
  })
}

//匹配明细
export function getBillDetail(data={}) {
  return request({
    url: `/webApi/out/plan/getBillDetail?${stringify(data)}`,
    method: 'get',
  })
}



// 取消操作
export function planCancelMatch(data={}) {
  return request({
    url: `/webApi/out/plan/cancelMatch`,
    method: 'post',
    data: data
  })
}







