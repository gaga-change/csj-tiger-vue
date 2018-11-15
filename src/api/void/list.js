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


//进项发票详情  

export function findFinaPurchaseInvoice(data) {
  return request({
    url: `/webApi/in/invoice/register/findFinaPurchaseInvoice?${stringify(data)}`,
    method: 'get',
  })
}
