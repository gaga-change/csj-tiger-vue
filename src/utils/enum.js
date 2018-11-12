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

//付款方式
export const PaymentModeEnum = [
  {
    name: '转账',
    value: 1
  },
  {
    name: '支票',
    value: 2
  },
  {
    name: '现金',
    value: 3
  },
]

//收款审核状态
export const ApproveStatusEnum = [
  {
    name: '未审核',
    value: 0
  },
  {
    name: '保存',
    value: 1
  },
  {
    name: '审核通过',
    value: 2
  },
  {
    name: '驳回',
    value: 3
  },
]

//收款销售单关联状态
export const RelationStatusEnum = [
  {
    name: '待分配业务员',
    value: 0
  },
  {
    name: '未关联',
    value: 1
  },
  {
    name: '保存',
    value: 2
  },
  {
    name: '待审核',
    value: 3
  },
  {
    name: '已审核',
    value: 4
  },
  {
    name: '已驳回',
    value: 5
  },
]

//收款款项性质
export const MoneyStateEnum = [
  {
    name: '货款',
    value: 0
  },
  {
    name: '质保金',
    value: 1
  },
  {
    name: '服务费',
    value: 2
  },
  {
    name: ' ',
    value: 99
  },
]

//收款款项类型
export const MoneyTypeEnum = [
  {
    name: '预付款',
    value: 0
  },
  {
    name: '提货款',
    value: 1
  },
  {
    name: '保证金',
    value: 2
  }
]
//作废状态
export const invoiceCancelStatusConfig = [
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