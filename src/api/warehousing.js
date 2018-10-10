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


















