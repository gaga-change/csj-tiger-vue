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

//出库计划关闭
export function outPlanClose(planCode) {
  return request({
    url: `/webApi/out/plan/close/${planCode}`,
    method: 'put',
  })
}

//出库计划修改
export function outPlanUpdate(data={}) {
  return request({
    url: `/webApi/out/plan/update`,
    method: 'put',
    data,
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

export function customerAddrInfo(customerCode,billType) {
  return request({
    url: `/webApi/customer/addr/info/${customerCode}/${billType}`,
    method: 'get',
  })
}


export function skuInfoList(ownerCode,arrivalCode,customerType, data={}) {
  return request({
    url: `/webApi/sku/info/list`,
    method: 'get',
    params: { ownerCode, arrivalCode, customerType, ...data }
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

export function outOrderPrint(data={}) {
  return request({
    url: `/webApi/out/order/print`,
    method: 'put',
    data: data,
  })
}

export function planOrderPrint(data={}) {
  return request({
    url: `/webApi/out/plan/print`,
    method: 'put',
    data: data,
  })
}


//出库业务单审核
export function outBillCheck(outWarehouseBillId) {
  return request({
    url: `/webApi/out/bill/check/${outWarehouseBillId}`,
    method: 'put',
  })
}

//出库业务单删除功能
export function outBillDelete(outWarehouseBillId) {
  return request({
    url: `/webApi/out/bill/delete/${outWarehouseBillId}`,
    method: 'DELETE',
  })
}

//出库业务单关闭功能
export function outBillClose(busiBillNo) {
  return request({
    url: `/webApi/out/bill/close/${busiBillNo}`,
    method: 'put',
  })
}


export function skuInfoGetRecommendStock(ownerCode,skuCode) {
  return request({
    url: `/webApi/sku/info/getRecommendStock/${ownerCode}/${skuCode}`,
    method: 'get',
  })
}


export function outPlanAdd(data={}) {
  return request({
    url: ` /webApi/out/plan/add`,
    method: 'post',
    data: data,
  })
}

export function outPlanPrint(planCode) {
  return request({
    url: `/webApi/out/plan/print/${planCode}`,
    method: 'get',
  })
}

export function outBillImproveList(data) {
  return request({
    url: `/webApi/out/bill/improve/list?${stringify(data)}`,
    method: 'get',
  })
}

export function outImproveDetail(outImproveRecordId) {
  return request({
    url: `/webApi/out/bill/improve/detail/${outImproveRecordId}`,
    method: 'get',
  })
}



export function outPlanInitAdd(outWarehouseBillId) {
  return request({
    url: `/webApi/out/plan/initAdd/${outWarehouseBillId}`,
    method: 'get',
  })
}

// /webApi/out/order/update
export function outDependWeight(data) {
  return request({
    url: `/webApi/out/order/update`,
    method: 'post',
    data: data,
  })
}

// 出库计划审核
export function outPlanCheck(data) {
  return request({
    url: `/api/out/plan/approve`,
    method: 'post',
    data: data,
  })
}

// method：PUT url: /webApi/out/bill/check/batch
export function outBillCheckBatch(data) {
  return request({
    url: `/webApi/out/bill/check/batch`,
    method: 'PUT',
    data: data,
  })
}

// method：DELETE url: /webApi/out/bill/delete/batch
export function outBillDeleteBatch(data) {
  return request({
    url: `/webApi/out/bill/delete/batch`,
    method: 'DELETE',
    data: data,
  })
}
// method：POST url: /webApi/out/plan/add/batch
export function outBillAddBatch(data) {
  return request({
    url: `/webApi/out/plan/add/batch`,
    method: 'POST',
    data: data,
  })
}

// method：PUT url: /webApi/out/plan/check/batch
export function outPlanCheckBatch(data) {
  return request({
    url: `/webApi/out/plan/check/batch`,
    method: 'PUT',
    data: data,
  })
}

//出库计划单挂起删除
export function outPlandelete(data) {
  return request({
    url: `/webApi/out/plan/del/${data}`,
    method: 'PUT'
  })
}
