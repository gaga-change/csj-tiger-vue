import request from '@/utils/request'
import {stringify} from 'qs';


export function providerPagelist(data={}) {
  return request({
    url: `/webApi/provider/list`,
    method: 'post',
    data:data
  })
}


export function providerSave(data={}) {
  return request({
    url: `/webApi/provider/save`,
    method: 'post',
    data:data
  })
}

export function providerUpdate(data={}) {
  return request({
    url: `/webApi/provider/update`,
    method: 'post',
    data:data
  })
}


export function providerDel(data={}) {
  return request({
    url: `/webApi/provider/del`,
    method: 'post',
    data:data
  })
}

export function ownerProviderList(data={}) {
  return request({
    url: `/webApi/provider/ownerProviderList`,
    method: 'post',
    data:data
  })
}

export function updateOwnerProvider(data={}) {
  return request({
    url: `/webApi/provider/updateOwnerProvider`,
    method: 'post',
    data:data
  })
}


export function providerAddrSave(data={}) {
  return request({
    url: `/webApi/provider/addr/save`,
    method: 'post',
    data:data
  })
}



export function providerAddrList(data={}) {
  return request({
    url: `/webApi/provider/addr/list?${stringify(data)}`,
    method: 'get'
  })
}


export function providerAddrUpdate(data={}) {
  return request({
    url: `/webApi/provider/addr/update`,
    method: 'post',
    data:data
  })
}

export function providerAddrDel(data={}) {
  return request({
    url: `/webApi/provider/addr/del?${stringify(data)}`,
    method: 'get'
  })
}

export function providerSetDefaultAddress(data={}) {
  return request({
    url: `/webApi/provider/addr/default`,
    method: 'get',
    params: data
  })
}
