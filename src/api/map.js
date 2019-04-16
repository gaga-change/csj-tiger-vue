import request from '@/utils/request'
import { stringify } from 'querystring';

//仓库类型枚举 getWarehouseType
//业务类型枚举 getBillType
//审核状态枚举 getApproveStatus
//开票状态枚举 getSignStatus
//供应商直发单据状态枚举 getReceiveStatus
//退货管理-单据状态枚举 getRefundStatus
//退货管理-退款原因枚举 getRefundReason
//退货管理-款项性质枚举 getMoneyState
//退货管理-退款方式枚举  getPaymentMode
//退货管理-退款类型枚举 getRefundType
//承运商状态 getConsoildatorState
//仓配点管理-结算区分枚举 getSettlementType
//仓库区域 getRegional
//企业状态接口 getEnterpriseState
// 企业等级接口 getEnterpriseLevel
// 地址性质  getAddrNature
//下推状态枚举 getIssuedState
//出入库类型枚举 getStockDirectType
//销售分区枚举 getSaleType

//枚举接口 返回所有静态的
export function getEnum() {
  return request({
    url: '/webApi/base/enum/getEnum',
    method: 'get',
  })
}

//单据状态枚举|执行状态  getExecState


//货主枚举
export function ownerInfoMap() {
  return request({
    url: 'webApi/base/info/getOwner',
    method: 'get',
  })
}

//单据页面货主 主要为出入库
export function billOwnerInfoMap() {
  return request({
    url: '/webApi/owner/info/getOwner',
    method: 'get',
  })
}

//仓库枚举
export function getWarehouse() {
  return request({
    url: '/webApi/base/info/getWarehouse',
    method: 'get',
  })
}

