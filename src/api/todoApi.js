import request from '@/utils/request'
import { stringify } from 'qs'

export function selectSaleBillDetailFromSCM(data = {}) {
  return request({
    url: `/webApi/out/bill/selectSaleBillDetailFromSCM?${stringify(data)}`,
    method: 'get',
  })
}


export function selectPurchaseBillDetailFromSCM(data = {}) {
  return request({
    url: `/webApi/in/bill/selectPurchaseBillDetailFromSCM?${stringify(data)}`,
    method: 'get',
  })
}

export function billAudit(data = {}) {
  return request({
    url: `/webApi/out/bill/billAudit?${stringify(data)}`,
    method: 'get',
  })
}
