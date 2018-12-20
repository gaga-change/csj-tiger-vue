import request from '@/utils/request'
import {stringify} from 'qs'

//客户收货登记列表
export function registerList(data={}) {
  return request({
    url:`/webApi/register/list?${stringify(data)}`,
    method: 'get',
  })
}

//客户收货登记详情
export function registerDetail(data={}) {
  return request({
    url:`/webApi/register/detail?${stringify(data)}`,
    method: 'get',
  })
}

//直发登记源数据接口
export function toAddRegister(data={}) {
  return request({
    url:`/webApi/register/toAddRegister?${stringify(data)}`,
    method: 'get',
  })
}

//登记页保存接口
export function addReceiveRegiste(data={}) {
  return request({
    url:`/webApi/register/addReceiveRegister`,
    data:data,
    method: 'post',
  })
}

//登记页修改接口
export function registerUpdate(data={}) {
  return request({
    url:`/webApi/register/update`,
    data:data,
    method: 'post',
  })
}

//审核/驳回
export function registerApprove(data={}) {
  return request({
    url:`/webApi/register/approve?${stringify(data)}`,
    method:'get',
  })
}


//直接提交
export function registerCommit(data={}) {
  return request({
    url:`/webApi/register/commit?${stringify(data)}`,
    method:'get',
  })
}


//直接删除
export function registerDrop(data={}) {
  return request({
    url:`/webApi/register/drop?${stringify(data)}`,
    method:'get',
  })
}
