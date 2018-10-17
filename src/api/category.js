import request from '@/utils/request'
// 获取类目POST /api/serviceCategory/category/list
export function CategoryList(data) {
  return request({
    url: '/webApi/serviceCategory/category/list',
    method: 'post',
    data
  })
}

// 供应商品类详情 POST /api/serviceCategory/detailInfo
export function CategoryDetail(data) {
  return request({
    url: '/webApi/serviceCategory/detailInfo',
    method: 'post',
    data
  })
}

// 添加修改分类 POST /api/serviceCategory/addOrUpdateServiceCategory
export function addOrUpdateServiceCategory(data) {
  return request({
    url: '/webApi/serviceCategory/addOrUpdateServiceCategory',
    method: 'post',
    data
  })
}

// 分类主表列表 POST /api/serviceCategory/main/list
export function CategoryMainList(data) {
  return request({
    url: '/webApi/serviceCategory/main/list',
    method: 'post',
    data
  })
}
