
export const applyTableConfig=[// 付款申请列表
  { label:'付款申请号', width:150, prop:'applyNo',fixed:true ,linkTo:'/payment/apply/detail',query:[{key:'id',value:'id'}] },
  { label:'标题',prop:'applyTitle', minWidth:120 },
  { label:'供应商',prop:'paymenterName',type:'money', width:160 },
  { label:'合同编号',prop:'contractNo', width:120 },
  { label:'订单编号',prop:'busiBillNo', width:150 },
  { label:'申请金额',prop:'applyPaymentAmt'},
  { label:'单据状态',prop:'paymentStatus',useLocalEnum:true, type:'paymentStatusEnum', minWidth:120, },
  { label:'申请人',prop:'applyUserName', width:130},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const reisterTableConfig=[// 付款登记列表
  { label:'付款申请号', width:150, prop:'applyNo',fixed:true ,linkTo:'/payment/register/detail',query:[{key:'id',value:'id'}] },
  { label:'供应商',prop:'paymenterName',type:'money', width:160 },
  { label:'合同编号',prop:'contractNo', width:120 },
  { label:'订单编号',prop:'busiBillNo', width:150 },
  { label:'申请金额',prop:'applyPaymentAmt'},
  { label:'实付金额',prop:'realPaymentAmt'},
  // { label:'付款状态',prop:'paymentStatus',useLocalEnum:true, type:'paymentStatusEnum', minWidth:120, },
  { label:'单据状态',prop:'paymentStatus',useLocalEnum:true, type:'paymentStatusEnum', minWidth:120, },
  { label:'申请人',prop:'applyUserName', width:130},
  { label:'操作',width:150,fixed:'right',userLink:true},
]


export const paymentInfoConfig = [//付款单详情
  { title:'付款申请号', prop:'applyNo' },
  { title:'收款方', prop:'paymenterName' },
  { title:'款项性质', prop:'moneyState',type:'MoneyStateEnum',useLocalEnum:true },
  { title:'款项类型', prop:'moneyType', type:'MoneyTypeEnum',useLocalEnum:true },
  { title:'采购订单', prop:'busiBillNo', },
  { title:'采购合同', prop:'contractNo',},
  // { title:'合同约定付款方式 ', prop:'paymentMode',
  // useLocalEnum:true, type:'PaymentModeEnum' },
  // { title:' 已付货款 ', prop:'paymentAmt',type:'money' },
  { title:'申请货款金额', prop:'applyPaymentAmt',type:"money"},

  
  { title:'要求付款日期', prop:'applyPaymentDate', type:'time' },
  { title:'收款方银行账户', prop:'receiveAccount'},
  { title:'收款方收款银行 ', prop:'receiveBank', },
  { title:' 附件 ', prop:'filePathList', useIf:'files', },
  // { title:'测试1 ', prop:'linkParam',linkTo:'/',useIf:'linkParam',name:'fuck' },
]
export const realPayInfoConfig = [//实付详情
  { title:'付款日期', prop:'realPaymentDate',type:'time' },
  { title:'结算方式', prop:'paymentMode',type:'PaymentModeEnum',useLocalEnum:true },
  { title:'付款人', prop:'applyUserName', },
  { title:'货款', prop:'applyPaymentAmt', },
  { title:'贴息', prop:'realInterestAmt',},
  { title:'实付金额', prop:'realPaymentAmt',},
  { title:'备注 ', prop:'paymentAbstract',
  },
]
export const contractInfo = [
  { title:'合同档案编号', prop:'paymenterName' },
  { title:'合同名称', prop:'paymentAmt',type:'money' },
  { title:'供应商合同编号', prop:'paymentDate', type:'time' },
  { title:'供应商名称', prop:'fileInfos', useIf:'files' },
  { title:'业务负责人', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, },
  { title:'代签人 ', prop:'paymentBank', },
  { title:' 合同类型 ', prop:'paymentAccount', },
  { title:'业务板块', prop:'paymenterName' },

  { title:'备注', prop:'paymentAmt',type:'money' },
  { title:'付款方式', prop:'paymentDate', type:'time' },
  { title:'付款方式说明', prop:'fileInfos', useIf:'files' },
  { title:'合同日期', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, },
  { title:'交货方式 ', prop:'paymentBank', },
  { title:' 合同扫描件', prop:'paymentAccount', },
]
export const contractTableConfig=[//合同商品明细
  { label:'序号',prop:'invoiceNo'},
  { label:'客户商品编号',prop:'applyCode'},
  { label:'商品名称',prop:'applyCode'},
  { label:'规格',prop:'cusName',type:'time',},

  { label:'数量',prop:'invoiceNo'},
  { label:'单位',prop:'applyCode'},
  { label:'单价',prop:'applyCode'},
  { label:'金额',prop:'cusName',type:'time',},

  { label:'使用单位',prop:'invoiceNo'},

]

export const titleInfo = [
  { title:'采购订单',prop:'busiBillNo'},
  { title:'采购合同',prop:'contractNo'},
  { title:'供应商',prop:'paymenterName'},
  { title:'已付货款',prop:'paymentAmt',type:'money',},

  { title:'本次申请付款',prop:'applyPaymentAmt',type:'money'},
  { title:'入库金额',prop:'inWarehouseAmt',type:'money'},
  { title:'已开发票金额',prop:'invoiceAmtSum',type:'money',show:'invoice'},
]
export const realPay=[//操作记录
  { title:'付款日期',prop:'invoiceNo'},
  { title:'付款人',prop:'applyCode'},
  { title:'付款金额 ',prop:'applyCode'},
  { title:'备注',prop:'cusName',type:'time',}
]
export const recordConfig=[//操作记录
  { label:'操作',prop:'taskName'},
  { label:'操作者',prop:'assignee'},
  { label:'操作日期',prop:'endTime',type:'time',},
  { label:'说明',prop:'suggestion'},

]