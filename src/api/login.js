import request from '@/utils/request'
import {stringify} from 'qs';

export function updatepassword(data) {
  return request({
    url: '/webApi/base/user/updatePwd',
    method: 'post',
    data: stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/webApi/base/user/info',
    method: 'get'
  })
}




