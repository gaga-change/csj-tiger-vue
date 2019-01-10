import request from '@/utils/request'
import {stringify} from 'qs';

//列表查询
export function refundList(data={}) {
  return request({
    url: `/webApi/refund/list?${stringify(data)}`,
    method: 'get',
  })
}

//详情
export function refundDetail(data={}) {
  return request({
    url: `/webApi/refund/detail?${stringify(data)}`,
    method: 'get',
  })
}

//查询来源单据
export function refundGetOrder(data={}) {
  return request({
    url: `/webApi/refund/getOrder?${stringify(data)}`,
    method: 'get',
  })
}

//保存\提交
export function refundSave(data={}) {
  return request({
    url: `/webApi/refund/save`,
    method: 'post',
    data:data,
  })
}

//修改
export function refundEdit(data={}) {
  return request({
    url: `/webApi/refund/edit`,
    method: 'post',
    data:data,
  })
}


//删除
export function refundRemove(data={}) {
  return request({
    url: `/webApi/refund/remove?${stringify(data)}`,
    method: 'get',
  })
}

//审核驳回
export function refundApprove(data={}) {
  return request({
    url: `/webApi/refund/approve?${stringify(data)}`,
    method: 'get',
  })
}

//退款登记
export function refundRegister(data={}) {
  return request({
    url: `/webApi/refund/register`,
    method: 'post',
    data:data,
  })
}

//查询已审核退款金额
export function refundApplyAmt(data={}) {
  return request({
    url: `/webApi/refund/applyAmt?${stringify(data)}`,
    method: 'get',
  })
}

//查询来源单据详情
export function orderDetail(data={}) {
  return request({
    url: `/webApi/refund/order/detail?${stringify(data)}`,
    method: 'get',
  })
}