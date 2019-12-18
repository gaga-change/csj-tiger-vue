import request from '@/utils/request'

//物流模板报价列表
export function quotionInfo(data) {
  return request({
    url: `/webApi/quote/queryQuoteBillList`,
    method: 'post',
    data:data
  })
}

//创建报价
export function temQuotionSave(data) {
  return request({
    url: `/webApi/quote/saveQuoteBill`,
    method: 'post',
    data:data
  })
}

//删除报价
export function quotionDelete(data) {
  return request({
    url: `/webApi/quote/deleteQuoteBillInfo`,
    method: 'get',
    params:data
  })
}

//修改报价
export function quotionModify(data) {
  return request({
    url: `/webApi/quote/updateQuoteBill`,
    method: 'post',
    data:data
  })
}

//查看报价
export function quotionDetail(data) {
  return request({
    url: `/webApi/quote/selectQuoteBillInfo`,
    method: 'get',
    params:data
  })
}

//获取费用模板
export function temSelect(data) {
  return request({
    url: `/webApi/template/queryTemplateRulesList`,
    method: 'post',
    data:data
  })
}