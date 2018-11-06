import request from '@/utils/request'
import {stringify} from 'qs';

//选择客户接口
export function infoCustomerInfo() {
  return request({
    url: '/webApi/base/info/customerInfo',
    method: 'get',
  })
}

//查询订单编号、合同编号
export function ordernoandcontractno(data={}) {
  return request({
    url: `/webApi/out/bill/ordernoandcontractno?${stringify(data)}`,
    method: 'get',
  })
}


//查看签收单号接口
export function getSigningInformation(data={}) {
  return request({
    url: `/webApi/sign/getSigningInformation?${stringify(data)}`,
    method: 'get',
  })
}


//查看签收明细接口
export function getSigningDetail(data={}) {
  return request({
    url: `/webApi/sign/getSigningDetail?${stringify(data)}`,
    method: 'get',
  })
}


//查看税务编码
export function infoTaxno(data={}) {
  return request({
    url: `/webApi/base/info/taxno?${stringify(data)}`,
    method: 'get',
  })
}

//新建发票申请接口
export function saveFinaSaleInvoice(data) {
  return request({
    url: '/webApi/sale/invoice/saveFinaSaleInvoice',
    method: 'post',
    data: data
  })
}


//查询蓝字发票接口
export function billingTypeDetails(data) {
  return request({
    url: `/webApi/sale/invoice/billingTypeDetails?${stringify(data)}`,
    method: 'get',
  })
}















