import request from '@/utils/request'
import {stringify} from 'qs';

//仓库配置
export function warehouseSelect(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/select?${stringify(data)}`,
    method: 'get',
  })
}

//仓库配置详情
export function warehouseDetail(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/detail?${stringify(data)}`,
    method: 'get',
  })
}




















