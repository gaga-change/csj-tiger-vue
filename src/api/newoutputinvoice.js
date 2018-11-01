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



















