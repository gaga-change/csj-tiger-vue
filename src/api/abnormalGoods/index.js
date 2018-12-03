import request from '@/utils/request'
import {stringify} from 'qs';

//根据客户编码查询对应的可退货销售合同
export function queryOutBillInfoByCustCode(data) {
  return request({
    url: `/webApi/purc/purcCanReject/queryOutBillInfoByCustCode?${stringify(data)}`,
    method: 'get',
  })
}

//根据客户编码和销售编码查询待退货列表
export function queryListByCustCodeAndOutBillCode(data) {
  return request({
    url: `/webApi/purc/purcCanReject/queryListByCustCodeAndOutBillCode?${stringify(data)}`,
    method: 'get',
  })
}


//采购退货详情接口
export function findPurchaseOrder(data) {
  return request({
    url: `/webApi/in/invoice/purcback/findPurchaseOrder?${stringify(data)}`,
    method: 'get',
  })
}


//出库确认
export function finishOutWarehouse(data) {
  return request({
    url: `api/finishOutWarehouse?${stringify(data)}`,
    method: 'get',
  })
}


//保存/提交采购退货申请
export function savePurcRejectApplyDO(data) {
  return request({
    url: `/webApi/goBack/rejectApply/savePurcRejectApplyDO`,
    method: 'post',
    data:data
  })
}


//获得详情
export function getPurcRejectApply(data) {
  return request({
    url: `/webApi/goBack/rejectApply/getPurcRejectApply?${stringify(data)}`,
    method: 'get',
  })
}


//分页列表
export function getPurcRejectApplyList(data) {
  return request({
    url: `/webApi/goBack/rejectApply/getPurcRejectApplyList?${stringify(data)}`,
    method: 'post',
    data:data
  })
}

//审核
export function purcRejectApplyheck(data) {
  return request({
    url: `/webApi/goBack/rejectApply/purcRejectApplyheck`,
    method: 'post',
    data:data
  })
}


//提交
export function submitPurcRejectApply(data) {
  return request({
    url: `/webApi/goBack/rejectApply/submitPurcRejectApply`,
    method: 'post',
    data:data
  })
}


//删除
export function deletePurcRejectApplyheck(data) {
  return request({
    url: ` /webApi/goBack/rejectApply/deletePurcRejectApplyheck`,
    method: 'post',
    data:data
  })
}


