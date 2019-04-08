import request from '@/utils/request'
import {stringify} from 'qs';

//出库业务单数据
export function outBillList(data={}) {
  return request({
    url: `/webApi/out/bill/list?${stringify(data)}`,
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


//匹配明细
export function planPush(data={}) {
  return request({
    url: `/webApi/out/plan/push?${stringify(data)}`,
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

export function customerAddrInfo(customerId,billType) {
  return request({
    url: `/webApi/customer/addr/info/${customerId}/${billType}`,
    method: 'get',
  })
}


export function skuInfoList(ownerCode,arrivalCode) {
  return request({
    url: `/webApi/sku/info/list/${ownerCode}/${arrivalCode}`,
    method: 'get',
  })
}

export function outBillAdd(data={}) {
  return request({
    url: `/webApi/out/bill/add`,
    method: 'post',
    data: data,
  })
}

export function outBillDetail(outWarehouseBillId) {
  return request({
    url: `/webApi/out/bill/detail/${outWarehouseBillId}`,
    method: 'get',
  })
}

export function outBillUpdate(data={}) {
  return request({
    url: `/webApi/out/bill/update`,
    method: 'put',
    data: data,
  })
}

export function outBillImprove(data={}) {
  return request({
    url: `/webApi/out/bill/improve`,
    method: 'put',
    data: data,
  })
}