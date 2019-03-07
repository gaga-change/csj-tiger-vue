import request from '@/utils/request'

// 查询所有的商品分类树形列表
export function categoryList() {
  return request({
    url: '/wcl/api/sku/category/trees',
    method: 'get'
  })
}

// 根据商品分类id查询商品分类列表
export function getCategoryListById(parentId) {
  return request({
    url: `/wcl/api/sku/category/list/${parentId}`,
    method: 'get'
  })
}

// 新增商品分类
export function categoryAdd(data) {
  return request({
    url: '/wcl/api/sku/category/add',
    method: 'post',
    data: data
  })
}

// 商品分类详情
export function getCategoryDetailById(skuCategoryId) {
  return request({
    url: `/wcl/api/sku/category/initUpdate/${skuCategoryId}`,
    method: 'get'
  })
}

// 商品分类修改
// {
//   skuCategoryId, // "int //商品分类id",
//   skuCategoryName // "string //新的商品分类名称"
// } = data
export function editCategory(data) {
  return request({
    url: `/wcl/api/sku/category/update`,
    method: 'put',
    data
  })
}

// 商品分类禁用启用操作
export function disableOrEnableCategory({
  categoryCode, // "int //商品分类id",
  disOrEnable // "string //新的商品分类名称"
}) {
  return request({
    url: `/wcl/api/sku/category/disableOrEnable/${categoryCode}/${disOrEnable}`,
    method: 'put'
  })
}

// 删除商品分类
export function deleteCategory(categoryCode) {
  return request({
    url: `/wcl/api/sku/category/delete/${categoryCode}`,
    method: 'DELETE'
  })
}

// 商品列表
export function getProductList(data) {
  return request({
    url: `/wcl/api/sku/category/skuList`,
    method: 'get',
    params: data
  })
}
