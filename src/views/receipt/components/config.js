import { RelationStatus, PaymentMode, ApproveStatus, MoneyState } from '@/utils/enum'
export const receiptTableConfig=[// 收款列表
  { label:'收款单号', width:120, prop:'receiveNo',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'客户名称',prop:'paymentName', width:120 },
  { label:'收款金额',prop:'paymentAmt',type:'money', width:120 },
  { label:'款项性质',prop:'moneyState',type:'MoneyState', width:120 },
  { label:'财务登记人',prop:'inputUserName', minWidth:90 },
  { label:'单据状态',prop:'approveStatus', type:'ApproveStatus', width:120},
  { label:'执行状态',prop:'relationStatus', type:'RelationStatus', width:120 },
  { label:'指定业务员',prop:'relationUserName', width:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const receiptInfoConfig=[//收款单详情
  { title:'付款方', prop:'paymenterName' },
  { title:'金额', prop:'paymentAmt',type:'money' },
  { title:'日期', prop:'paymentDate', type:'time' },
  { title:'上传附件', prop:'files', useIf:'files' },
  { title:'付款方式', prop:'paymentMode', },
  { title:'付款银行', prop:'paymentBank', },
  { title:' 付款方账户', prop:'paymentAccount', },
  { title:'交易流水', prop:'paymentRecordNo', },
  { title:'付款摘要 ', prop:'paymentAbstract', },
]
export const execInfoConfig=[//收款单执行情况
  { title:'执行状态', prop:'relationStatus' },
  { title:'业务员', prop:'relationUserName' },
  { title:'款项性质', prop:'moneyState', },
  { title:'货款类型', prop:'ticketRemark'},
  { title:'货款合计', prop:'sumPayableAmt'},
  { title:'贴息合计', prop:'sumInterestAmt'},
]
export const detailtableConfig=[//详情表格
  // { label:'序号',prop:'invoiceNo',},
  { label:'订单编号',prop:'busiBillNo', width:120,show:'register+associate' },
  { label:'订单金额',prop:'orderAmt', minWidth:90,show:'register+associate' },
  { label:'签收数量',prop:'signQty', minWidth:90,show:'register+associate'},
  { label:'签收金额',prop:'signAmt', minWidth:90,show:'register+associate'},
  { label:'已开票货款',prop:'invoicedAmt', width:120,show:'register+associate'},
  { label:'本次收到货款',prop:'payableAmt', width:120,show:'register+associate'}, 
  { label:' 本次收到贴息',prop:'interestAmt', width:120,show:'register+associate'},
  { label:'订单收到货款合计',prop:'totalOrderPayableAmt', width:120,show:'register'},
  { label:'订单收到贴息合计 ',prop:'totalOrderInterestAmt', width:120,show:'register'},
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]