import { ApproveStatusEnum, MoneyStateEnum, MoneyTypeEnum, RelationStatusEnum, PaymentModeEnum } from '@/utils/enum'
export const receiptTableConfig=[// 收款列表
  { label:'收款单号', width:150, prop:'receiveNo',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'客户名称',prop:'paymenterName', width:150 },
  { label:'货主',prop:'ownerName',width:150},
  { label:'收款金额',prop:'paymentAmt',type:'money', minWidth:120 },
  { label:'款项性质',prop:'moneyState',type:'MoneyStateEnum', useLocalEnum:true, minWidth:120 },
  { label:'财务登记人',prop:'inputUserName', minWidth:90 },
  { label:'登记状态',prop:'approveStatus',useLocalEnum:true, type:'ApproveStatusEnum', minWidth:120, userFormatter: (cellValue)=>{
    let value = ''
    ApproveStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value}},
  { label:'关联状态',prop:'relationStatus',useLocalEnum:true, type:'RelationStatusEnum', width:120, userFormatter: (cellValue)=>{
    let value = ''
    RelationStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { label:'指定业务员',prop:'relationUserName', minWidth:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const receiptInfoConfig=[//收款单详情
  { title:'收款单号', prop:'receiveNo' },
  { title:'付款方', prop:'paymenterName' },
  // { title:'收款单号', prop:'receiveNo' },
  { title:'金额', prop:'paymentAmt',type:'money' },
  { title:'日期', prop:'paymentDate', type:'time' },
  { title:'上传附件', prop:'fileInfos', useIf:'files' },
  { title:'付款方式', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, userFormatter: (cellValue)=>{
    let value = ''
    PaymentModeEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { title:'付款银行', prop:'paymentBank', },
  { title:' 付款方账户', prop:'paymentAccount', },
  { title:'交易流水', prop:'paymentRecordNo', },
  { title:'付款摘要 ', prop:'paymentAbstract',span:18 },
]
export const execInfoConfig=[//收款单关联情况
  { title:'关联状态', prop:'relationStatus',type:'RelationStatusEnum', useLocalEnum:true,userFormatter: (cellValue)=>{
    let value = ''
    RelationStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { title:'业务员', prop:'relationUserName' },
  { title:'款项性质', prop:'moneyState', type:'MoneyStateEnum', useLocalEnum:true,userFormatter: (cellValue)=>{
    let value = ''
    MoneyStateEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { title:'货款类型', prop:'moneyType',type:'MoneyTypeEnum', useLocalEnum:true,userFormatter: (cellValue)=>{
    let value = ''
    MoneyTypeEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value}},
  { title:'货款合计', prop:'sumPayableAmt'},
  { title:'贴息合计', prop:'sumInterestAmt'},
]
export const detailtableConfig=[//详情表格
  // { label:'序号',prop:'invoiceNo',},
  { label:'订单编号',prop:'busiBillNo', width:180,show:'register+associate' },
  { label:'订单金额',prop:'orderAmt', minWidth:90,show:'register+associate' },
  { label:'签收数量',prop:'signQty', minWidth:90,show:'register+associate'},
  { label:'签收金额',prop:'signAmt', minWidth:90,show:'register+associate'},
  { label:'已开票货款',prop:'invoicedAmt', width:120,show:'register+associate'},
  { label:'本次收到货款',prop:'payableAmt', width:120,show:'register+associate'}, 
  { label:' 贴息',prop:'interestAmt', width:120,show:'register+associate'},
  { label:'订单收到货款合计',prop:'totalOrderPayableAmt', width:120,show:'register'},
  { label:'订单收到贴息合计 ',prop:'totalOrderInterestAmt', width:120,show:'register'},
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]


export const queryTableConfig=[//收款查询页面配置
  { label:'客户名称',prop:'paymenterName'},
  { label:'订单编号',prop:'busiBillNo'},
  { label:'合同编号',prop:'contractNo'},
  { label:'业务板块',prop:'busiPlate',type:'busiPlateConfig', useLocalEnum:true,},
  { label:'款项性质',prop:'moneyState',type:'MoneyStateEnum', useLocalEnum:true,},
  { label:'货款金额',prop:'orderAmt'},
  { label:'贴息',prop:'interestAmt'},
  { label:'实收金额',prop:'payableAmt'},
  { label:'货主',prop:'ownerCode', type:'ownerInfoMap',useApi:true},
]
