import request from '@/utils/request'
import {stringify} from 'qs';

//仓库查询(分页）
export function warehouseSelect(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/select?${stringify(data)}`,
    method: 'get',
  })
}

//添加仓库
export function warehouseSave(data={}) {
  return request({
    url: ` /webApi/base/set/warehouse/save`,
    method: 'post',
    data:data
  })
}

//修改仓库
export function warehouseUpdate(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/update`,
    method: 'post',
    data:data
  })
}


//删除仓库
export function warehouseDel(data={}) {
  return request({
    url: `/webApi/base/set/warehouse/del?${stringify(data)}`,
    method: 'get',
  })
}
