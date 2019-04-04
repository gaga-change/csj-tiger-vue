import request from '@/utils/request'
import {stringify} from 'qs';


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

export function customerInfo(ownerCode) {

  // return request({
  //   url:`/webApi/customer/info/${ownerCode}`,
  //   method: 'get',
  // })

  return new Promise(function(resolve, reject) {
    resolve({
      success: true,
      data: [
        {
          customerName:'测试数据',
          customerCode:'GY20190325000001'
        }
      ]
    })
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


export function ownerWarehouseList(data={}) {
  return request({
    url: `/webApi/owner/info/ownerWarehouseList?${stringify(data)}`,
    method: 'get'
  })
}


