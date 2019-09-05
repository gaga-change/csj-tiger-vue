import request from '@/utils/request'
import {stringify} from 'qs';

//列表查询
export function skuInfoProviderList(ownerCode,arrivalCode,customerType, data={}) {
  return request({
    url: `/webApi/sku/info/provider/list`,
    method: 'get',
    params: { ownerCode, arrivalCode, customerType, ...data }
  })
}

//入库业务单数据
export function inBillSelect(data={}) {
  return request({
    url: `/webApi/in/bill/select?${stringify(data)}`,
    method: 'get',
  })
}


//入库业务单详情数据
export function inBillDetail(data={}) {
  return request({
    url: `/webApi/in/bill/detail?${stringify(data)}`,
    method: 'get',
  })
}


//入库计划数据
export function inPlanSelect(data={}) {
  return request({
    url: `/webApi/in/plan/getInPlanData?${stringify(data)}`,
    method: 'get',
  })
}

//入库计划详情数据
export function inPlanDetail(data={}) {
  return request({
    url: `/webApi/in/plan/getInPlanDetailByPlanCode?${stringify(data)}`,
    method: 'get',
  })
}

//入库计划关闭
export function inPlanClose(planCode) {
  return request({
    url: `/webApi/in/plan/close/${planCode}`,
    method: 'put',
  })
}

//入库计划修改
export function inPlanUpdate(data={}) {
  return request({
    url: `/webApi/in/plan/update`,
    method: 'put',
    data,
  })
}

//入库单查询数据
export function inOrderSelect(data={}) {
  return request({
    url: `/webApi/in/order/inWarehouseOrderList?${stringify(data)}`,
    method: 'get',
  })
}


//入库单查询详情数据
export function inOrderDetail(data={}) {
  return request({
    url: `/webApi/in/order/inWarehouseOrderDetailList?${stringify(data)}`,
    method: 'get',
  })
}

// 入库单查询 合计接口
export function selectSumNo(data={}) {
  return request({
    url: `api/in/order/selectSumNo`,
    method: 'post',
    data: data,
  })
}

export function inBillAdd(data={}) {
  return request({
    url: `/webApi/in/bill/add`,
    method: 'post',
    data: data,
  })
}

export function customerInfo(ownerCode,busiBillType=22) {

  return request({
    url:`/webApi/customer/info/${ownerCode}/${busiBillType}`,
    method: 'get',
  })
}

export function inbilldetail(inWarehouseBillId) {
  return request({
    url: `/webApi/in/bill/detail/${inWarehouseBillId}`,
    method: 'get'
  })
}


export function inBillUpdate(data={}) {
  return request({
    url: `/webApi/in/bill/update`,
    method: 'post',
    data: data,
  })
}

export function inbillPrint(inWarehouseBillId) {
  return request({
    url: `/webApi/in/bill/print/${inWarehouseBillId}`,
    method: 'get'
  })
}

export function inBillUpdateStatus(data={}) {
  return request({
    url: `/webApi/in/bill/updateStatus?${stringify(data)}`,
    method:'put'
  })
}

export function inPlanInitAdd(inWarehouseBillId) {
  return request({
    url: `/webApi/in/plan/initAdd/${inWarehouseBillId}`,
    method: 'get'
  })
}


export function getRecommendStock(ownerCode,skuCode) {
  return request({
    url: `/webApi/sku/info/getRecommendStock/${ownerCode}/${skuCode}`,
    method: 'get'
  })
}

export function inPlanAdd(data={}) {
  return request({
    url: `/webApi/in/plan/add`,
    method: 'post',
    data: data,
  })
}

//手工创建入库单
export function orderSave(data={}) {
  return request({
    url: `/webApi/in/order/save`,
    method: 'post',
    data: data,
  })
}

// /webApi/in/order/update
export function inDependWeight(data) {
  return request({
    url: `/webApi/in/order/update`,
    method: 'post',
    data: data,
  })
}

// /api/in/plan/approve
export function inPlanCheck(data) {
  return request({
    url: `/api/in/plan/approve`,
    method: 'post',
    data: data,
  })
}

//  /webApi/in/bill/batchDelete
export function batchInBill(data) {
  return request({
    url: `/webApi/in/bill/batchDelete`,
    method: 'PUT',
    data: data,
  })
}

//  //webApi/in/plan/batchAdd
export function batchAdd(data) {
  return request({
    url: `/webApi/in/plan/batchAdd`,
    method: 'POST',
    data: data,
  })
}

// /api/in/plan/batchApprovePlan
export function batchApprovePlan(data={}) {
  return request({
    url: `/api/in/plan/batchApprovePlan`,
    method: 'post',
    data: data
  })
}

//入库计划单手工完结
export function inCloseOperate(data) {
  return request({
    url: `/webApi/in/plan/end/${data}`,
    method: 'PUT'
  })
}