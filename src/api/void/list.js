import request from '@/utils/request'
import {stringify} from 'qs';

//进项发票列表查询
export function finaPurchaseInvoiceList(data) {
  return request({
    url: `/webApi/in/invoice/register/finaPurchaseInvoiceList?${stringify(data)}`,
    method: 'get',
  })
}


//进项发票订单查询
export function queryInWarehouseBillList(data) {
  return request({
    url: `/webApi/in/invoice/register/queryInWarehouseBillList?${stringify(data)}`,
    method: 'get',
  })
}


//发票商品明细
export function queryInWarehouseBillDetailList(data) {
  return request({
    url: `/webApi/in/invoice/register/queryInWarehouseBillDetailList?${stringify(data)}`,
    method: 'get',
  })
}



//新增进项发票
export function saveFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/saveFinaPurchaseInvoice`,
    method: 'post',
    data:data
  })
}

//修改进项发票
export function updateFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/updateFinaPurchaseInvoice`,
    method:'post',
    data:data
  })
}


//进项发票详情  
export function findFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/findFinaPurchaseInvoice?${stringify(data)}`,
    method: 'get',
  })
}


//进项发票提交  
export function commitFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/commitFinaPurchaseInvoice?${stringify(data)}`,
    method: 'get',
  })
}


//进项发票审核、驳回
export function checkFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/checkFinaPurchaseInvoice?${stringify(data)}`,
    method: 'get',
  })
}


//进项发票作废登记
export function invalidFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/invalidFinaPurchaseInvoice?${stringify(data)}`,
    method: 'get',
  })
}

//进项发票下面蓝票
export function queryListByFinaPurchaseInvoiceReq(data) {
  return request({
    url: `/webApi/in/invoice/register/queryBlueInvoiceListByBusiBillNo?${stringify(data)}`,
    method: 'get',
  })
}


//进项发票供应商查询
export function getProvider() {
  return request({
    url: `/webApi/base/info/getProvider`,
    method: 'get',
  })
}