import request from '@/utils/request'
import {stringify} from 'qs';

//列表查询
export function skuInfoList(ownerCode,arrivalCode, customerType) {
  return request({
    url: `/webApi/sku/info/list/${ownerCode}/${arrivalCode}/${customerType}`,
    method: 'get',
  })
}
