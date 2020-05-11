import request from '@/utils/request'

//消息及对账单列表
export function messageInfo(data) {
  return request({
    url: `/webApi/messageNotice/selectByPageList`,
    method: 'post',
    data:data
  })
}

//创建消息及对账单
export function messageSave(data) {
  return request({
    url: `/webApi/messageNotice/save`,
    method: 'post',
    data:data
  })
}

//删除消息及对账单
export function deleteMessage(data) {
  return request({
    url: `/webApi/messageNotice/delete/`+data,
    method: 'delete'
  })
}