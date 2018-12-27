import request from '@/utils/request'
import {stringify} from 'qs';

//账单查询
export function queryAccountBill(data={}) {
  return request({
    url: `/webApi/accountbill/queryAccountBill?${stringify(data)}`,
    method: 'get',
  })
}


//拉取对账单
export function getInvoiceAmmount(data={}) {
  return request({
    url: `/api/payment/getInvoiceAmmount`,
    method: 'post',
    data:data
  })
}

//对账单保存和修改，修改的id必传
export function saveAccountBill(data={}) {
  return request({
    url: `/webApi/accountbill/saveAccountBill`,
    method: 'post',
    data:data
  })
}






