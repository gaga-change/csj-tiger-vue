import request from '@/utils/request'
import {stringify} from 'qs'

//回单查询页面
export function signList(data={}) {
  return request({
    url: `/webApi/sign/list?${stringify(data)}`,
    method: 'get',
  })
}

//回单查询详情页面
export function signDetail(data={}) {
  return request({
    url: `/webApi/sign/detail?${stringify(data)}`,
    method: 'get',
  })
}

//回单查询详情页面
export function planDetail(data={}) {
  return request({
    url: `/webApi/sign/toAddSign?${stringify(data)}`,
    method: 'get',
  })
}

//创建回单接口
export function signBuildSale(data={}) {
  return request({
    url: `/webApi/sign/buildSale`,
    data:data,
    method: 'post',
  })
}

//回单审核接口
export function signApprove(data={}) {
  return request({
    url: `/webApi/sign/approve`,
    data:data,
    method: 'post',
  })
}


//删除回单接口
export function signDelete(data={}) {
  return request({
    url: `/webApi/sign/delete`,
    data:stringify(data),
    method: 'post',
  })
}








