import request from '@/utils/request'

export function tenantList(data) {
  return request({
    url: '/webApi/owner/info/list',
    method: 'get',
    params: data
  })
}

export function saveTenant(data) {
  return request({
    url: '/webApi/owner/info/save',
    method: 'post',
    data: data
  })
}

export function updateTenant(data) {
  return request({
    url: '/webApi/owner/info/update',
    method: 'post',
    data: data
  })
}

export function tenantDetail(data) {
  return request({
    url: '/webApi/owner/info/detail',
    method: 'get',
    params: data
  })
}
// 分配仓库
export function saveOwnerWarehouse(data) {
  return request({
    url: '/webApi/owner/info/saveOwnerWarehouse',
    method: 'post',
    data: data
  })
}
// 查询货主仓库
export function ownerWarehouseList(data) {
  return request({
    url: '/webApi/owner/info/ownerWarehouseList',
    method: 'get',
    params: data
  })
}
// method：POST url: /webApi/owner/info/update
export function tenantUpdate(data) {
  return request({
    url: '/webApi/owner/info/update',
    method: 'post',
    data: data
  })
}

//推送配置
export function configPush(data) {
  return request({
    url: '/webApi/owner/info/saveBaseCofig',
    method: 'post',
    data: data
  })
}

//获取推送配置
export function configInfo(data) {
  return request({
    url: '/webApi/owner/info/selectBaseCofig',
    method: 'get',
    params: data
  })
}