
export const receiptTableConfig=[// 收款列表
  { label:'收款单号',prop:'receiveNo',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'客户名称',prop:'paymentName' },
  { label:'收款金额',prop:'paymentAmt',type:'money', },
  { label:'款项性质',prop:'invoiceNature',type:'NatureInvoice', useLocalEnum:true},
  { label:'财务登记人',prop:'ticketStatus', type:'TicketStatus', useLocalEnum:true },
  { label:'单据状态',prop:'ticketStatus', type:'TicketStatus', useLocalEnum:true },
  { label:'执行状态',prop:'runStatus', type:'TicketStatus', useLocalEnum:true },
  { label:'指定业务员',prop:'name', width:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const receiptInfoConfig=[//收款单详情
  { title:'付款方', prop:'applyCode' },
  { title:'金额', prop:'invoiceCode' },
  { title:'日期', prop:'ticketTime', type:'time' },
  { title:'上传附件', prop:'files', useIf:'files' },
  { title:'付款方式', prop:'invoiceCode', },
  { title:'付款银行', prop:'invoiceCode', },
  { title:' 付款方账户', prop:'invoiceCode', },
  { title:'交易流水', prop:'invoiceCode', },
  { title:'付款摘要 ', prop:'invoiceCode', },
]
export const execInfoConfig=[//收款单执行情况
  { title:'执行状态', prop:'applyCode' },
  { title:'业务员', prop:'invoiceCode' },
  { title:'款项性质', prop:'ticketTime', type:'time' },
  { title:'货款类型', prop:'ticketRemark'},
  { title:'货款合计', prop:'ticketRemark'},
  { title:'贴息合计', prop:'ticketRemark'},
]
export const detailtableConfig=[//详情表格
  // { label:'序号',prop:'invoiceNo',},
  { label:'订单编号',prop:'skuCategoryno', width:120,show:'register+associate' },
  { label:'订单金额',prop:'skuCode', minWidth:90,show:'register+associate' },
  { label:'签收数量',prop:'skuName', minWidth:90,show:'register+associate'},
  { label:'签收金额',prop:'taxCode', minWidth:90,show:'register+associate'},
  { label:'已开票货款',prop:'skuFormat', width:120,show:'register+associate'},
  { label:'本次收到货款',prop:'skuUnitName', width:120,show:'register+associate'}, 
  { label:' 本次收到贴息',prop:'numberOfReceipts', width:120,show:'register+associate'},
  { label:'订单收到货款合计',prop:'taxPrice', width:120,show:'register'},
  { label:'订单收到贴息合计 ',prop:'taxRate', width:120,show:'register'},
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]