import request from '@/utils/request'

// 查询所有的商品分类树形列表
export function categoryList() {
  return request({
    url: '/webApi/sku/category/trees',
    method: 'get'
  })
}

// 根据商品分类id查询商品分类列表
export function getCategoryListById(parentId) {
  return request({
    url: `/webApi/sku/category/list/${parentId}`,
    method: 'get'
  })
}

// 新增商品分类
export function categoryAdd(data) {
  return request({
    url: '/webApi/sku/category/add',
    method: 'post',
    data: data
  })
}

// 商品分类详情
export function getCategoryDetailById(skuCategoryId) {
  return request({
    url: `/webApi/sku/category/initUpdate/${skuCategoryId}`,
    method: 'get'
  })
}

export function editCategory(data) {
  return request({
    url: `/webApi/sku/category/update`,
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
    url: `/webApi/sku/category/disableOrEnable/${categoryCode}/${disOrEnable}`,
    method: 'put'
  })
}

// 删除商品分类
export function deleteCategory(categoryCode) {
  return request({
    url: `/webApi/sku/category/delete/${categoryCode}`,
    method: 'DELETE'
  })
}

// 商品列表
export function getProductList(data) {
  return request({
    url: `/webApi/sku/info/skuListByCondition`,
    method: 'post',
    data: data
  })
}

// 新增商品
export function addProduct(data) {
  return request({
    url: `/webApi/sku/info/add`,
    method: 'post',
    data: data
  })
}
// 修改商品
export function updateProduct(data) {
  return request({
    url: `/webApi/sku/info/update`,
    method: 'post',
    data: data
  })
}
// 商品详情
export function productDetail(data) {
  return request({
    url: `/webApi/sku/info/selectDetail`,
    method: 'get',
    params: data
  })
}

// 删除商品
export function deleteProduct(data) {
  return request({
    url: `/webApi/sku/info/delete`,
    method: 'post',
    data: data
  })
}

//商品上传
export function RequestUploads(data) {
  return request({
    url: `/webApi/sku/info/import`,
    method: 'post',
    data: data
  })
}

