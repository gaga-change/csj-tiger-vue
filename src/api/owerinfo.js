import request from '@/utils/request'
import {stringify} from 'qs';

//货主信息数据
export function owerInfo(data={}) {
  return request({
    url: `/webApi/base/info/ownerInfo?${stringify(data)}`,
    method: 'get',
  })
}

//货主信息详情数据
export function owerInfoDetail(data={}) {
  return request({
    url: `/webApi/base/info/ownerInfoDetailList?${stringify(data)}`,
    method: 'get',
  })
}


















