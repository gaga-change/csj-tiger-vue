import request from '@/utils/request'
import {stringify} from 'qs'

// // 公司列表
export function getGys() {
  return request({
    url: '/webApi/gys/getdata',
    method: 'get'
  })
}



// 查询仓库接口
export function StroeList(data) {
  return request({
    url: '/webApi/store/getdata',
    method: 'get',
    data: data
  })
}

// 销售单详情
export function SaleDetailInfo(data) {
  return request({
    url: '/webApi/saleOrder/detailInfo',
    method: 'post',
    data: data
  })
}


// 采购单详情
export function PurchorderDetail(data) {
  return request({
    url: '/webApi/purchorder/getpurchorder',
    method: 'post',
    data: data
  })
}


// 审核删除保存草稿
export function OrderOperate(data) {
  return request({
    url: '/webApi/order/orderOperate',
    method: 'post',
    data: data
  })
}

// http://newlit.csjscm.com/j_acegi_security_check
export function bssLogin(data) {
  return request({
    url: '/j_acegi_security_check',
    method: 'post',
    transformRequest: [TransFnc],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

// POST /api/ContractWorkFlow/getZyUserPassword 获取章鱼系统的用户密码API
export function ZyUser(data) {
  return request({
    url: '/webApi/ContractWorkFlow/getZyUserPassword',
    method: 'post',
    data: data
  })
}

// POST /api/ContractWorkFlow/getWorkFlowNode 获取我的待办信息API
export function WorkFlowNode(data) {
  return request({
    url: `/webApi/workflow/todo?truename=${data.truename}&userId=${data.userId}&roles=${data.roles}`,
    method: 'get',
  })
}

// POST /api/ufproduct/getufcategorysmall 小分类查询API
export function CategorySmall(data) {
  return request({
    url: '/webApi/ufproduct/getufcategorysmall',
    method: 'post',
    data: data
  })
}

// POST /api/ContractWorkFlow/getNowWorkFlowNode 获取我的在办信息API
export function NowWorkFlowNode(truename,roles) {
  return request({
    url: `/webApi/workflow/tobedone?truename=${truename}&roles=${roles}`,
    method: 'get',
  })
}

export function CotractDetail(contractno){
  
  return request({
    url: `/webApi/contract/detail?contractno=${contractno}`,
    method: 'get',
  })
}
export function ContractCheck(params){
  
  return request({
    url: `/webApi/contract/check`,
    method: 'post',
    data:params
  })
}
