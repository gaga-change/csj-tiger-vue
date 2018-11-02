//发票性质
export const NatureInvoice = [
  
  {
    name: '蓝字发票',
    value: 1
  },

  {
    name: '红字发票',
    value: 2
  },
]
//发票状态
export const InvoiceStatus = [
  {
    name: '保存',
    value: 0
  },
  {
    name: '提交待审',
    value: 1
  },
  {
    name: '已审待开票',
    value: 2
  },
  {
    name: '已开票登记',
    value: 3
  },
  {
    name: '作废',
    value: 4
  },
]
//发票类型
export const InvoiceType = [
  {
    name: '增值税专用发票',
    value: '1'
  },
  {
    name: '增值税普通发票',
    value: '2'
  },
  {
    name: '普通发票',
    value: '3'
  },
  {
    name: '无票收入',
    value: '4'
  }
]