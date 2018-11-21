import request from '@/utils/request'
import {stringify} from 'qs';

//查询错误数据
export function interactiveErrorDataSelect(data) {
  return request({
    url: `/webApi/interactiveErrorData/select?${stringify(data)}`,
    method: 'get',
  })
}

//查询错误数据详情
export function interactiveErrorDataGet(data) {
  return request({
    url: `/webApi/interactiveErrorData/get?${stringify(data)}`,
    method: 'get',
  })
}

//执行错误数据
export function interactiveErrorDataReset(data) {
  return request({
    url: `/webApi/interactiveErrorData/reset?${stringify(data)}`,
    method: 'get',
  })
}






