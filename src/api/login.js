import request from '@/utils/request'
import { stringify } from 'qs';

//修改密码接口
export function updatepassword(data) {
  return request({
    url: '/webApi/base/user/updatePwd',
    method: 'post',
    data: stringify(data)
  })
}
