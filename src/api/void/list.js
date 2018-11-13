import request from '@/utils/request'
import {stringify} from 'qs';

//进项发票列表查询
export function finaPurchaseInvoiceList(data) {
  return request({
    url: `/webApi/in/invoice/register/finaPurchaseInvoiceList?${stringify(data)}`,
    method: 'get',
  })
}