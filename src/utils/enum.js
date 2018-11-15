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
];

//业务板块
export const busiPlateConfig = [
  
  {
    name: '钢铁',
    value: 0
  },

  {
    name: '汽车',
    value: 1
  },
];


//发票性质枚举类型
export const NatureInvoiceEnum = [
  
  {
    name: '蓝字发票',
    value: 'BLUE_INVOICE'
  },

  {
    name: '红字发票',
    value: 'CREDIT_NOTE'
  },
]

//单据状态
export const TicketStatus = [
  {
    name: '保存',
    value: 0
  },
  {
    name: '待审核',
    value: 1
  },
  {
    name: '待登记',
    value: 2
  },
  {
    name: '待复核',
    value: 3
  },
  {
    name: '已复核',
    value: 4
  },
  {
    name: '已驳回',
    value: 5
  },
]

//发票状态
export const InvoiceStatus = [
  {
    name: '正常',
    value: 0
  },
  {
    name: '被红冲',
    value: 1
  },
  {
    name: '作废',
    value: 2
  },
]
//发票类型
export const InvoiceType = [
  {
    name: '增值税专用发票',
    value: 1
  },
  {
    name: '增值税普通发票',
    value: 2
  },
  {
    name: '普通发票',
    value: 3
  },
  {
    name: '无票收入',
    value: 4
  }
]


//作废状态
export const invoiceCancelStatusConfig = [
  {
    name: '正常',
    value: 0
  },
  {
    name: '申请中',
    value: 1
  },
  {
    name: '申请通过',
    value: 2
  },
  {
    name: '被驳回',
    value: 3
  },
]


//进项发票页面枚举
//单据状态
export  const entryInvoiceTicketStatus=[
  {
    name: '保存',
    value: 0
  },
  {
    name: '提交',
    value: 1
  },
  {
    name: '驳回',
    value: 2
  },
  {
    name: '审核',
    value: 3
  },
 
]