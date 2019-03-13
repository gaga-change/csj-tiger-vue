import request from '@/utils/request'
//出库业务单数据
export function getOutStoreList(data={}) {
  // return request({
  //   url: ``,
  //   method: 'post',
  //   data
  // })
  return new Promise((resolve, reject) => {
    resolve({
      success: true,
      data: [
        {orderNo: 't1aacc001', customer: 'aaa', address: 'cds1', linkUser: 'xtt', phone:'233111', id:1},
        {orderNo: 't1aacc001', customer: 'aaab', address: 'cds1d', id:2},
        {orderNo: 't1aacc001', customer: 'aaa', address: 'cds2', id:3},
        {orderNo: 't1aacc001', customer: 'aaa1', address: 'cds1', id:4},
        {orderNo: 't1aacc002', customer: 'aaa1', address: 'cds1', id:5}
      ]
    })
  })
}
