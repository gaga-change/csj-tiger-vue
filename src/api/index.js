import http from './http'

/** 获取用户信息 */
export const getInfo = params => http.get(`/webApi/base/user/info`, { params })
