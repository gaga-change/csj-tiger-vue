import request from '@/utils/request'
// 获取类目POST /api/serviceCategory/category/list
export function CategoryList(data) {
  return request({
    url: '/planapi/api/serviceCategory/category/list',
    method: 'post',
    data
  })
}

// 供应商品类详情 POST /api/serviceCategory/detailInfo
export function CategoryDetail(data) {
  return request({
    url: '/planapi/api/serviceCategory/detailInfo',
    method: 'post',
    data
  })
}

// 添加修改分类 POST /api/serviceCategory/addOrUpdateServiceCategory
export function addOrUpdateServiceCategory(data) {
  return request({
    url: '/planapi/api/serviceCategory/addOrUpdateServiceCategory',
    method: 'post',
    data
  })
}

// 分类主表列表 POST /api/serviceCategory/main/list
export function CategoryMainList(data) {
  return request({
    url: '/planapi/api/serviceCategory/main/list',
    method: 'post',
    data
  })
}
