import request from '@/utils/request'

export function tenantList(data) {
  return request({
    url: '/webApi/owner/info/list',
    method: 'post',
    data: data
  })
}
export function tenantAdminList(data) {
  return request({
    url: '/webApi/owner/info/listAdmin',
    method: 'post',
    data: data
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

export function effectTenant(data) {
  return request({
    url: '/webApi/owner/info/effect',
    method: 'post',
    data: data
  })
}

export function delTenant(data) {
  return request({
    url: '/webApi/owner/info/del',
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
