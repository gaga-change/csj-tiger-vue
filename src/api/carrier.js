import request from '@/utils/request'
import {stringify} from 'qs';

//承运商管理(分页）
export function consoilInfoList(data={}) {
  return request({
    url: `/webApi/consoil/info/list?${stringify(data)}`,
    method: 'get',
  })
}

//创建承运商
export function consoilInfoSave(data={}) {
  return request({
    url: `/webApi/consoil/info/save`,
    method: 'post',
    data:data
  })
}

//查看承运商
export function consoilInfoDetail(data={}) {
  return request({
    url: `/webApi/consoil/info/detail?${stringify(data)}`,
    method: 'get',
  })
}

//修改承运商
export function consoilInfoUpdate(data={}) {
  return request({
    url: `/webApi/consoil/info/update`,
    method: 'post',
    data:data
  })
}

//删除承运商
export function consoilInfoDel(data={}) {
  return request({
    url: `/webApi/consoil/info/del?${stringify(data)}`,
    method: 'get',
  })
}

export function infoAllCompany(data={}) {
  return request({
    url: `/webApi/consoil/info/allCompany?${stringify(data)}`,
    method: 'get',
  })
}

