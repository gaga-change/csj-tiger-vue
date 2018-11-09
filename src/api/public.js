
import request from '@/utils/request'

//货主枚举
export function finaReportService() {
  return request({
    url: '/webApi/base/info/finaReportService',
    method: 'get',
  })
}