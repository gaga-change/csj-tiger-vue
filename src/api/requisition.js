import request from '@/utils/request'
import {stringify} from 'qs';

//调拨单数据
export function requisitionList(data={}) {
  return request({
    url: `/webApi/tranferBill/queryPageList`,
    method: 'post',
    data: data
  })
}

//仓库明细查询
export function warehouseDetail(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/detail?${stringify(data)}`,
    method: 'get',
  })
}

//根据货主和仓库编码查询商品
export function totalSkuList(data={}) {
  return request({
    url: `/webApi/stock/select?${stringify(data)}`,
    method: 'get',
  })
}

//保存调拨单
export function requisitionSave(data={}) {
  return request({
    url: `/webApi/tranferBill/save`,
    method: 'post',
    data: data
  })
}

//修改调拨单
export function requisitionmodify(data={}) {
  return request({
    url: `/webApi/tranferBill/update`,
    method: 'post',
    data: data
  })
}

//查询调拨单详情
export function requisitiondetail(data={}) {
  return request({
    url: `/webApi/tranferBill/selectDetail`,
    method: 'get',
    params: data
  })
}

//查询出库计划单
export function queryPlandetail(data={}) {
  return request({
    url: `/webApi/tranferBill/queryPlanInfo`,
    method: 'get',
    params: data
  })
}

//查询出入库单
export function queryOrderdetail(data={}) {
  return request({
    url: `/webApi/tranferBill/queryOrderInfo`,
    method: 'get',
    params: data
  })
}

//调拨单提交删除
export function handleTransferNo(data={}) {
  return request({
    url: `/webApi/tranferBill/updateStatus`,
    method: 'get',
    params: data
  })
}