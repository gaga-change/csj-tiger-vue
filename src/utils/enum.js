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
    name: '草稿',
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

//开具状态
export const InvoiceStatus2 = [
  {
    name: '开具',
    value: 0
  },
  {
    name: '开具',
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
    name: '银行转账',
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
  {
    name: '银行承兑',
    value: 4
  },
  {
    name: '商业承兑',
    value: 5
  },
]

//收款审核状态
export const ApproveStatusEnum = [
  {
    name: '草稿',
    value: 0
  },
  {
    name: '登记待审',
    value: 1
  },
  {
    name: '登记已审',
    value: 2
  },
  {
    name: '登记驳回',
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
    name: '未关联业务单',
    value: 1
  },
  {
    name: '未关联业务单',//保存
    value: 2
  },
  {
    name: '关联待审',
    value: 3
  },
  {
    name: '关联已审',
    value: 4
  },

]


//收款款项性质
export const MoneyStateEnum = [
  {
    name: '货款',
    value: 0,
    disabled:false,
  },
  {
    name: '质保金',
    value: 1,
    disabled:true,
  },
  {
    name: '服务费',
    value: 2,
    disabled:false,
  },
  {
    name: ' ',
    value: 99,
    disabled:true
  },
]


//收款款项类型
export const MoneyTypeEnum = [
  {
    name: '预付款',
    value: 0,
    type:'receipt+pay',
  },
  {
    name: '提货款',
    value: 1,
    type:'receipt+pay',
  },
  {
    name: '保证金',
    value: 2,
    type:'receipt+pay',
  },
  {
    name: '供应商退货款',
    value: 3,
    type:'pay',
  }
]

//作废状态
export const invoiceCancelStatusConfig = [
  {
    name: '未申请',
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
    name: '草稿 ',
    value: 0
  },
  {
    name: '待审核',
    value: 1
  },
  {
    name: '已驳回',
    value: 2
  },
  {
    name: '已审核',
    value: 3
  },
]


//付款单据状态
export const paymentStatusEnum = [
  {
    name: '草稿',
    value: 0
  },
  {
    name: '提交待审',
    value: 1
  },
  {
    name: '采购审核',
    value: 2
  },
  {
    name: '财务审核',
    value: 3
  },
  {
    name: '总经理审核',
    value: 4
  },
  {
    name: '付款待确认',
    value: 5
  },
  {
    name: '付款已确认',
    value: 6
  },
  {
    name: '已驳回',
    value: 9
  },
  {
    name: '已取消',
    value: 19
  },
]

//成功标识
export const successFlag = [
  {
    name: '成功',
    value: 1
  },
  {
    name: '失败',
    value: 0
  },

]


//异常商品处理单据状态
export const billStatusEnum = [
  {
    name: '草稿',
    value: 0
  },
  {
    name: '待审核',
    value: 1
  },
  {
    name: '已审核',
    value: 2
  },
  {
    name: '已驳回',
    value: 3
  },
  {
    name: '已关闭',
    value: 4
  },
  {
    name: '已完成退货',
    value: 5
  },

]


//异常商品处理  异常商品处理意见
export  const handleOpinionConfig=[
  {
    name: '客户已拒收 ，建议退回供应商 ',
    value: 0
  },
]


//异常商品处理  发票状态
export  const invoiceStatusConfig=[
  {
    name: '未开票',
    value: 0
  },
  {
    name: '已开票',
    value: 1
  },
]

//异常商品处理  付款状态
export  const paymentStatusConfig=[
  {
    name: '未付款',
    value: 0
  },
  {
    name: '部分付款',
    value: 1
  },
  {
    name: '已付款',
    value: 2
  },
]



//scm交货方式
export  const deliverwayConfig=[
  {
    name: '库发 ',
    value: 1
  },
  {
    name: '供应商直发',
    value: 2
  },
  {
    name: '自提',
    value: 3
  },
]

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

  {
    name: '冶金',
    value: 2
  },
];

//scm付款状态
export  const scmpaymentStatusConfig=[
  {
    name: '未付款',
    value: 0
  },
  {
    name: '部分付款',
    value: 1
  },
  {
    name: '已付款',
    value: 2
  },
]

//scm付款方式
export const paymethodConfig = [
  {
    name: '货到付款',
    value: 1
  },

  {
    name: '预付款',
    value: 2
  },
];


//scm结算方式
export const settlementmethodConfig = [
  {
    name: '现金',
    value: 1
  },

  {
    name: '银行转账',
    value: 2
  },

  {
    name: '银行承兑',
    value: 3
  },

  {
    name: '商业承兑',
    value: 4
  },

  {
    name: '支票',
    value: 5
  },
];

//scm状态
export const statusConfig = [
  {
    name: '草稿',
    value: -1
  },

  {
    name: '待审核',
    value: 0
  },

  {
    name: '确认通过',
    value: 1
  },

  {
    name: '驳回',
    value: -2
  },
];

//scm收款方式
export const recmethodConfig = [
  {
    name: '货到收款',
    value: 1
  },
  {
    name: '货到票到付款',
    value: 2
  },
  {
    name: '先款后货',
    value: 3
  },
];


//scm签收状态
export const recstatusConfig = [
  {
    name: '未签收',
    value: 0
  },
  {
    name: '部分签收',
    value: 1
  },
  {
    name: '全部签收',
    value: 2
  },
];


//scm退货状态
export const backstatusConfig = [
  {
    name: '无退货',
    value: 0
  },
  {
    name: '部分退货',
    value: 1
  },
  {
    name: '全部退货 ',
    value: 2
  },
];


export const ownerType = [
  {
    name: '仓储客户',
    value: 1
  },
  {
    name: '采购商',
    value: 2
  },
  {
    name: '供应商 ',
    value: 3
  },
  {
    name: '服务商 ',
    value: 4
  },
];

export const roleType = [
  {
    name: '租户',
    value: 1
  }
];

export const ownerState = [
  {
    name: '启用',
    value: 1
  },
  {
    name: '禁用',
    value: 2
  }
];
export const userStatus = [
  {
    name: '启用',
    value: 0
  },
  {
    name: '禁用',
    value: 1
  }
];


//mis枚举配置
export const outgoingOrderTypeEnum = [
  {
    name: '销售出库',
    value: 21
  },
  {
    name: '退货出库',
    value: 22
  }
];


export const revisalTypeEnum = [
  {
    name: '金额订正',
    value: 1
  },
  {
    name: '数量订正',
    value: 2
  }
];

export const expenseType = [
  {
    name: '代支款',
    value: 1
  }
]


//仓配点管理票配置

export const warehouseStateEnum=[
  {
    name: '启用',
    value: 1
  },
  {
    name: '禁用',
    value: 2
  }
]

export const dispatchType=[
  {
    name: '快递',
    value: 1
  },
  {
    name: '物流',
    value: 2
  },
  {
    name: '自有车队',
    value: 3
  }
]

export const settlementType=[
  {
    name: '月结',
    value: 1
  },
  {
    name: '现结',
    value: 2
  },
  {
    name: '到付',
    value: 3
  }
]
export const costCalcWay=[
  {
    name: '按照体积计算',
    value: 1
  },
  {
    name: '按照重量计算',
    value: 2
  }
]
export const dispatchState=[
  {
    name: '已完成',
    value: 2
  }
]

export const invoiceState=[
  {
    name: '草稿',
    value: 1
  },
  {
    name: '审核通过',
    value: 2
  },
  {
    name: '审核未通过',
    value: 3
  }
]
//mis 入库单据状态枚举
export const misWarehousingBillStatusEnum=[
  {
    name: '草稿',
    value: 0
  },
  {
    name: '已审核',
    value: 1
  },
  {
    name: '驳回',
    value: 2
  },
  {
    name: '已关闭',
    value: 4
  },
]

//mis 入库执行状态状态枚举
export const misWarehousingBillStateEnum=[
  {
    name: '未入库',
    value: 0
  },
  {
    name: '部分入库',
    value: 5
  },
  {
    name: '全部入库',
    value: 8
  }
]

// mis入库业务单订正 - 单据状态
export const misRevisalStateEnum = [
  {
    name: '草稿',
    value: 1
  },
  {
    name: '已审核',
    value: 2
  },
  {
    name: '审核未通过',
    value: 3
  }
]

// mis入库业务单订正 - 订正类型
export const misRevisalTypeEnum = [
  {
    name: '金额订正',
    value: 1
  },
  {
    name: '数量订正',
    value: 2
  }
]

// mis发货要求枚举
export const sendOutRequireEnum = [
  {
    name: '整单',
    value: 1
  },
  {
    name: '拆单',
    value: 2
  }
]


//出库业务单单据状态 枚举
export const outBillStatusEnum = [
  {
    name: '草稿',
    value: 0
  },
  {
    name: '已审核',
    value: 1
  },
  {
    name: '驳回',
    value: 2
  },
  {
    name: '已关闭',
    value: 4
  },
]

//出库业务单执行状态 枚举
export const outBillStateEnum = [
  {
    name: '未出库',
    value: 0
  },
  {
    name: '部分出库',
    value: 5
  },
  {
    name: '全部出库',
    value: 8
  }
]