import request from '@/utils/request'
const TransFnc = function(data) {
  let ret = ''
  for (const it in data) {
    ret += it + '=' + data[it] + '&'
  }
  ret = ret.substring(0, ret.lastIndexOf('&'))
  return ret
}
// // 公司列表
export function getGys() {
  return request({
    url: '/webApi/gys/getdata',
    method: 'get'
  })
}

// export function addOrUpdateenquiryOrder(data) {
//   return request({
//     url: '/webApi/enquiryOrder/addOrUpdateEnquiryOrder',
//     method: 'post',
//     data: data
//   })
// }

// export function List(data) {
//   return request({
//     url: '/webApi/enquiryOrder/main/list',
//     method: 'post',
//     data: data
//   })
// }

// export function DetailInfo(data) {
//   return request({
//     url: '/webApi/enquiryOrder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 新增销售单
// export function addOrUpdateSaleOrder(data) {
//   return request({
//     url: '/webApi/saleOrder/addOrUpdateSaleOrder',
//     method: 'post',
//     data: data
//   })
// }

// // 新增采购单
// export function addOrUpdatePurchaseOrder(data) {
//   return request({
//     url: '/webApi/purchorder/addOrUpdatePurchaseOrder',
//     method: 'post',
//     data: data
//   })
// }

// 查询仓库接口
export function StroeList(data) {
  return request({
    url: '/webApi/store/getdata',
    method: 'get',
    data: data
  })
}

// // 销售单列表
// export function SaleList(data) {
//   return request({
//     url: '/webApi/saleOrder/main/list',
//     method: 'post',
//     data: data
//   })
// }

// 销售单详情
export function SaleDetailInfo(data) {
  return request({
    url: '/webApi/saleOrder/detailInfo',
    method: 'post',
    data: data
  })
}

// // 采购单列表
// export function PurchorderList(data) {
//   return request({
//     url: '/webApi/purchorder/getpurchorderMain',
//     method: 'post',
//     data: data
//   })
// }

// 采购单详情
export function PurchorderDetail(data) {
  return request({
    url: '/webApi/purchorder/getpurchorder',
    method: 'post',
    data: data
  })
}

// // 新增报价单POST
// export function addOrUpdateQuotationOrder(data) {
//   return request({
//     url: '/webApi/quotation/addOrUpdateQuotationOrder',
//     method: 'post',
//     data: data
//   })
// }

// // 获取计划单详情用于报价单
// export function GetEnquiryInfo(data) {
//   return request({
//     url: '/webApi/quotation/getEnquiryInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 报价单查询
// export function GetQuotationList(data) {
//   return request({
//     url: '/webApi/quotation/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/quotation/makeQuotationBid 设置报价单中标API
// export function makeQuotationBid(data) {
//   return request({
//     url: '/webApi/quotation/makeQuotationBid',
//     method: 'post',
//     data: data
//   })
// }

// // 报价单详情
// export function GetQuotationDetail(data) {
//   return request({
//     url: '/webApi/quotation/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// 审核删除保存草稿
export function OrderOperate(data) {
  return request({
    url: '/webApi/order/orderOperate',
    method: 'post',
    data: data
  })
}

// // 获取新增发货通知单信息
// export function GetSaleOrderInfo(data) {
//   return request({
//     url: '/webApi/outNotice/getSaleOrderInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 新增发货通知单
// export function addOrUpdateOutNotice(data) {
//   return request({
//     url: '/webApi/outNotice/addOrUpdateOutNotice',
//     method: 'post',
//     data: data
//   })
// }

// // 发货通知单列表
// export function OutNoticeList(data) {
//   return request({
//     url: '/webApi/outNotice/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // 发货通知单详情
// export function OutNoticeDetail(data) {
//   return request({
//     url: '/planapi/api/outNotice/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 新增收货通知
// export function addOrUpdateInoticeOrder(data) {
//   return request({
//     url: '/jqmapi/api/inoticeOrder/addOrUpdateInoticeOrder',
//     method: 'post',
//     data: data
//   })
// }

// // 收货通知列表
// export function InNoticeList(data) {
//   return request({
//     url: '/jqmapi/api/inoticeOrder/getMainDetail',
//     method: 'post',
//     data: data
//   })
// }

// // 收货通知详情POST /api/inoticeOrder/getItemDetail
// export function InNoticeDetail(data) {
//   return request({
//     url: '/jqmapi/api/inoticeOrder/getItemDetail',
//     method: 'post',
//     data: data
//   })
// }

// // 获取新建出库单信息 /api/outOrder/getOutNoticeInfo
// export function getOutNoticeInfo(data) {
//   return request({
//     url: '/planapi/api/outOrder/getOutNoticeInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 新建出库单
// export function addOrUpdateOutOrder(data) {
//   return request({
//     url: '/planapi/api/outOrder/addOrUpdateOutOrder',
//     method: 'post',
//     data: data
//   })
// }

// // 出库单列表
// export function OutStoreList(data) {
//   return request({
//     url: '/planapi/api/outOrder/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // 出库单详情POST /api/outOrder/detailInfo
// export function OutStoreDetail(data) {
//   return request({
//     url: '/planapi/api/outOrder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // 入库单列表
// export function InstoreList(data) {
//   return request({
//     url: '/yyjapi/api/inorder/getinorderMain',
//     method: 'post',
//     data: data
//   })
// }

// // 新增入库单
// export function addOrUpdateInOrder(data) {
//   return request({
//     url: '/yyjapi/api/inorder/addOrUpdateInOrder',
//     method: 'post',
//     data: data
//   })
// }

// // 入库单详情
// export function InStoreDetail(data) {
//   return request({
//     url: '/yyjapi/api/inorder/getinorder',
//     method: 'post',
//     data: data
//   })
// }

// // 库存查询 POST /api/stock/getDetail
// export function StockList(data) {
//   return request({
//     url: '/jqmapi/api/stock/getDetail',
//     method: 'post',
//     data: data
//   })
// }

// // api/modelExcel/getModelData 公司模板
// export function CompanyTemplet(data) {
//   return request({
//     url: '/planapi/api/modelExcel/getModelData',
//     method: 'post',
//     data: data
//   })
// }

// // 获取商品  旧的，废弃
// export function GetProduct(data) {
//   return request({
//     url: '/yyjapi/api/ufproduct/getufproduct',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ufproduct/getufproductcustomer 企业商品查询API
// // export function GetProduct(data) {
// //   return request({
// //     url: '/yyjapi/api/ufproduct/getufproductcustomer',
// //     method: 'post',
// //     data: data
// //   })
// // }

// // POST /api/enquiryOrder/checkCancel 计划单撤审操作
// export function CheckCancel(data) {
//   return request({
//     url: '/planapi/api/enquiryOrder/checkCancel',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/cdTask/addOrUpdateCDTask 添加和修改组装拆卸
// export function addOrUpdateCDTask(data) {
//   return request({
//     url: '/planapi/api/cdTask/addOrUpdateCDTask',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/cdTask/main/list 查询主表信息列表
// export function CDTaskList(data) {
//   return request({
//     url: '/planapi/api/cdTask/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/cdTask/detailInfo 查询详情
// export function CDTaskDetail(data) {
//   return request({
//     url: '/planapi/api/cdTask/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/cdTask/operation 订单操作信息
// export function CDTaskOperation(data) {
//   return request({
//     url: '/planapi/api/cdTask/operation',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/vinorder/detailInfo 查询调整入库通知单详情
// export function UnionInstoreDetail(data) {
//   return request({
//     url: '/planapi/api/vinorder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/voutorder/detailInfo 查询调整出库通知单详情
// export function UnionOutstoreDetail(data) {
//   return request({
//     url: '/planapi/api/voutorder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/vinorder/main/list 查询调整入库通知单主表信息列表
// export function UnionInstoreList(data) {
//   return request({
//     url: '/planapi/api/vinorder/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/voutorder/main/list 查询调整出库通知单主表信息列表
// export function UnionOutstoreList(data) {
//   return request({
//     url: '/planapi/api/voutorder/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/order/sendProductToWms 发送商品WMS接口
// export function sendProductToWms(data) {
//   return request({
//     url: '/jqmapi/api/order/sendProductToWms',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/order/updateOrderOperateLogWmsFlag 发送商品WMS接口
// export function updateOrderOperateLogWmsFlag(data) {
//   return request({
//     url: '/jqmapi/api/order/updateOrderOperateLogWmsFlag',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/contract/addOrUpdateContract
// export function addOrUpdateContract(data) {
//   return request({
//     url: '/planapi/api/contract/addOrUpdateContract',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/contract/detailInfo 查询详情
// export function ContractDetail(data) {
//   return request({
//     url: '/planapi/api/contract/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/contract/delete 删除
// export function ContractDelete(data) {
//   return request({
//     url: '/planapi/api/contract/delete',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/contract/main/list 查询主表信息列表
// export function ContractList(data) {
//   return request({
//     url: '/planapi/api/contract/main/list',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/receiptOrder/addOrUpdateReceiptOrder 添加和修改回单API
// export function addOrUpdateReceiptOrder(data) {
//   return request({
//     url: '/jqmapi/api/receiptOrder/addOrUpdateReceiptOrder',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/receiptOrder/getMainDetail 查询回单主表信息列表
// export function ReceiptOrderList(data) {
//   return request({
//     url: '/jqmapi/api/receiptOrder/getMainDetail',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/receiptOrder/getItemDetail 查询回单子表详情
// export function ReceiptOrderItems(data) {
//   return request({
//     url: '/jqmapi/api/receiptOrder/getItemDetail',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/vinorder/detailInfo 查询调整入库通知单详情
// export function VInStoreDetail(data) {
//   return request({
//     url: '/planapi/api/vinorder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/voutorder/detailInfo 查询调整出库通知单详情
// export function VOutStoreDetail(data) {
//   return request({
//     url: '/planapi/api/voutorder/detailInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/getContractType 获取合同类型
// export function ContractType(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getContractType',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/queryMaxContractNo 获取合同号
// export function MaxContractNo(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/queryMaxContractNo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/getBusinessType 业务类型类型API
// export function BusinessType(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getBusinessType',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/startContractWork 发起合同审批流程API
// export function ContractWork(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/startContractWork',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/saveEleContractInfo 保存电子合同API
// export function SaveContractWork(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/saveEleContractInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/getDepartmentByUserName 获取当前登录人的部门信息API
// export function DepartmentByUserName(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getDepartmentByUserName',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/getPartnerSubject 获取合作方主体API
// export function PartnerSubject(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getPartnerSubject',
//     method: 'post',
//     data: data
//   })
// }

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

// // POST /api/ContractWorkFlow/getItemContractType 获取子表合同类型API
// export function ItemContractType(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getItemContractType',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/ContractWorkFlow/getOrgUnit 获取合同主体API
// export function OrgUnit(data) {
//   return request({
//     url: '/jqmapi/api/ContractWorkFlow/getOrgUnit',
//     method: 'post',
//     data: data
//   })
// }

// POST /api/ContractWorkFlow/getZyUserPassword 获取章鱼系统的用户密码API
export function ZyUser(data) {
  return request({
    url: '/webApi/ContractWorkFlow/getZyUserPassword',
    method: 'post',
    data: data
  })
}

// // POST /api/ContractWorkFlow/getContractMain 获取合同流程列表API
// // export function ContractFlowList(data) {
// //   return request({
// //     url: '/jqmapi/api/ContractWorkFlow/getContractMain',
// //     method: 'post',
// //     data: data
// //   })
// // }

// POST /api/ContractWorkFlow/getWorkFlowNode 获取我的待办信息API
export function WorkFlowNode(truename) {
  return request({
    url: `/webApi/workflow/todo?truename=${truename}`,
    method: 'get',
  })
}

// // // POST /api/ContractWorkFlow/getStaffs 获取章鱼系统员工API
// // export function Staffs(data) {
// //   return request({
// //     url: '/jqmapi/api/ContractWorkFlow/getStaffs',
// //     method: 'post',
// //     data: data
// //   })
// // }

// POST /api/ufproduct/getufcategorysmall 小分类查询API
export function CategorySmall(data) {
  return request({
    url: '/webApi/ufproduct/getufcategorysmall',
    method: 'post',
    data: data
  })
}

// // POST /api/enquiryOrder/check 计划单审核操作
// export function PlanCheck(data) {
//   return request({
//     url: '/planapi/api/enquiryOrder/check',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/enquiryOrder/detailInfoByTicketNo 根据单号查询计划单字表详情 用于明细跟踪
// export function detailInfoByTicketNo(data) {
//   return request({
//     url: '/planapi/api/enquiryOrder/detailInfoByTicketNo',
//     method: 'post',
//     transformRequest: [TransFnc],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: data
//   })
// }

// // POST /api/enquiryOrder/main/count 计划单数据监测
// export function ViewCount(data) {
//   return request({
//     url: '/planapi/api/enquiryOrder/main/count',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/enquiryOrder/scheduleByTicketNo 根据单号查询计划单进度
// export function scheduleByTicketNo(data) {
//   return request({
//     url: '/planapi/api/enquiryOrder/scheduleByTicketNo',
//     method: 'post',
//     transformRequest: [TransFnc],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: data
//   })
// }

// // GET /api/getWarehouseInfo/byCustomerCode 通过CustomerCode获取仓库信息
// export function UnionStore(data) {
//   return request({
//     url: '/planapi/api/getWarehouseInfo/byCustomerCode',
//     method: 'get',
//     transformRequest: [TransFnc],
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     params: data
//   })
// }

// // POST /api/monitor/enquiry/baseInfo 计划单信息监测
// export function PlanStatus(data) {
//   return request({
//     url: '/planapi/api/monitor/enquiry/baseInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/monitor/innotice/baseInfo 入库通知单信息监测
// export function InnoticeStatus(data) {
//   return request({
//     url: '/planapi/api/monitor/innotice/baseInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/monitor/outnotice/baseInfo 出库通知单信息监测
// export function OutnoticeStatus(data) {
//   return request({
//     url: '/planapi/api/monitor/outnotice/baseInfo',
//     method: 'post',
//     data: data
//   })
// }

// // POST /api/quotation/modifyPrice 领导报价
// export function modifyPrice(data) {
//   return request({
//     url: '/planapi/api/quotation/modifyPrice',
//     method: 'post',
//     data: data
//   })
// }

// POST /api/ContractWorkFlow/getNowWorkFlowNode 获取我的在办信息API
export function NowWorkFlowNode(truename) {
  return request({
    url: `/webApi/workflow/tobedone?truename=${truename}`,
    method: 'get',
  })
}
