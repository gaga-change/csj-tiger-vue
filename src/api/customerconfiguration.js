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

// 获取用户数据/api/shiro/getUserByTid?code=tiger-web

export function getUserByTid(data={code:'tiger-web'}) {
  return request({
    url: `/webApi/base/warehouse/operator/getUserListForCas?${stringify(data)}`,
    method: 'get',
  })
}

//新增用戶仓库
export function makeWarehouseAdd(data={}) {//unconfim
  return request({
    url: `/webApi/base/warehouse/operator/add`,
    method: 'post',
    data:data
  })
}
//删除用戶仓库
export function makeWarehouseDelete(data={}) {//unconfim
  return request({
    url: `/webApi/base/warehouse/operator/delete`,
    method: 'post',
    data:data
  })
}
//用戶仓库查询列表
export function getWarehouseUser(data={}) {
  return request({
    url: `/webApi/base/warehouse/operator/select`,
    method: 'post',
    data:data
  })
}



















