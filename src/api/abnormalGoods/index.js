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