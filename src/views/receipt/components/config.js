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
  { label:'货款金额',prop:'payableAmt',type:'toFixed',},
  { label:'贴息',prop:'interestAmt',type:'toFixed',},
  { label:'实收金额',prop:'paymentAmt',type:'toFixed'},
  { label:'实退金额',prop:'realRefundAmt',type:'toFixed',},
  { label:'货主',prop:'ownerCode', type:'ownerInfoMap',useApi:true},
]


export const refundConfig=[//收款查询页面配置
  { label:'客户退款号',prop:'refundNo',width:150,fixed:true,linkTo:'/receipt/refundDetail',query:[{key:'refundNo',value:'refundNo'},{key:'id',value:'id'}] },
  { label:'货主',prop:'ownerName',width:150},
  { label:'业务板块',prop:'busiPlate',width:80,useLocalEnum:true,type:'busiPlateConfig'},
  { label:'客户名称',prop:'customerName',width:150},
  { label:'退款原因',prop:'refundReason',width:150,type:'getRefundReason',useApi:true},
  { label:'来源单据',prop:'busiBillNo',width:150,useLink:true},
  { label:'订单编号',prop:'sourceOrderNo',width:150,useLink:true},
  { label:'合同编号',prop:'contractNo',width:120},
  { label:'申请退款金额',prop:'applyRefundAmt',width:120,type:'toFixed'},
  { label:'退款类型',prop:'refundType',type:'getRefundType',useApi:true,width:120},
  { label:'退款单状态',prop:'refundStatus',type:'getRefundStatus',useApi:true,width:100},
  { label:'实际退款时间',prop:'refundDate',type:'time',width:100},
  { label:'实退金额',prop:'realRefundAmt',width:120,type:'toFixed',format:'/'},
  { label:'创建人',prop:'createrName',width:100},
  { label:'创建时间',prop:'gmtCreate',type:'time',width:100},
  { label:'操作',useLink:true,fixed:'right',width:180},
]

export const refundDetailBaseConfig=[
  { title:'客户名称', prop:'customerName' },
  { title:'退款原因', prop:'refundReason',type:'getRefundReason',useApi:true },
  { title:'款项性质', prop:'moneyState',type:'getMoneyState',useApi:true },
  { title:'来源单据', prop:'busiBillNo',class:'busiBillNoClick' },
  { title:'订单编号', prop:'sourceOrderNo',useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'sourceOrderNo'}] },
  { title:'合同编号', prop:'contractNo' },
  { title:'业务板块',prop:'busiPlate',useLocalEnum:true,type:'busiPlateConfig'},
  { title:'申请退款金额', prop:'applyRefundAmt',type:'toFixed' },
  { title:'单据状态',prop:'refundStatus',type:'getRefundStatus',useApi:true},
  { title:'审核意见',prop:'approveReason'},
]

export const refundDetailPayConfig=[
  { title:'付款方式', prop:'payWay',type:'getPaymentMode',useApi:true },
  { title:'客户银行账户', prop:'bankCode' },
  { title:'客户银行', prop:'bankName' },
  { title:'附件', prop:'files',useIf:'files' },
  { title:'退款日期', prop:'refundDate',type:'time' },
  { title:'实退金额', prop:'realRefundAmt' ,type:'toFixed'},
]


export const alertBaseInfoConfig=[
  { title:'来源单据', prop:'busiBillNo' },
  { title:'订单单号', prop:'sourceOrderNo' },
  { title:'合同编号', prop:'contractNo' },
  { title:'客户名称', prop:'customerName' },
  { title:'业务板块', prop:'busiPlate',useLocalEnum:true,type:'busiPlateConfig' },
  { title:'货主', prop:'ownerName' },
  { title:'退款类型',prop:'refundType',type:'getRefundType',useApi:true,width:120},
  { title:'退货金额', prop:'sumRefundAmt' ,type:'toFixed'},
  { title:'已退金额', prop:'sumRealAmt' ,type:'toFixed'},
]


export const alertTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'单号',prop:'sourceOrderNo'},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'型号',prop:'skuModel'},
  { label:'品牌',prop:'brandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'单价',prop:'price'},
  { label:'退货数量',prop:'applyRefundQty'},
  { label:'退货金额',prop:'applyRefundAmt',type:'toFixed',width:120},
  { label:'已退货数量',prop:'realRefundQty',width:120},
  { label:'已退货金额',prop:'realRefundAmt',type:'toFixed',width:120},
]
