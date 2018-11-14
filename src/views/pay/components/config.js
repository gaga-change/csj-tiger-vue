import { ApproveStatusEnum, MoneyStateEnum, MoneyTypeEnum, RelationStatusEnum, PaymentModeEnum } from '@/utils/enum'
export const applyTableConfig=[// 付款申请列表
  { label:'付款申请号', width:150, prop:'applyNo',fixed:true ,linkTo:'/payment/apply/detail',query:[{key:'id',value:'id'}] },
  { label:'标题',prop:'paymenterName', width:210 },
  { label:'供应商',prop:'paymentAmt',type:'money', minWidth:120 },
  { label:'合同号',prop:'moneyState',type:'MoneyStateEnum', useLocalEnum:true, minWidth:120 },
  { label:'订单编号',prop:'inputUserName', minWidth:90 },
  { label:'申请金额',prop:'approveStatus',useLocalEnum:true, type:'ApproveStatusEnum', minWidth:120, userFormatter: (cellValue)=>{
    let value = ''
    ApproveStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value}},
  { label:'单据状态',prop:'relationStatus',useLocalEnum:true, type:'RelationStatusEnum', width:120, userFormatter: (cellValue)=>{
    let value = ''
    RelationStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { label:'申请人',prop:'relationUserName', minWidth:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const regesterTableConfig=[// 付款登记列表
  { label:'付款登记号', width:150, prop:'receiveNo',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'付款申请号', width:150, prop:'receiveNo',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'供应商',prop:'paymentAmt',type:'money', minWidth:120 },
  { label:'合同编号',prop:'moneyState',type:'MoneyStateEnum', useLocalEnum:true, minWidth:120 },
  { label:'订单编号',prop:'inputUserName', minWidth:90 },
  { label:'申请金额',prop:'approveStatus',useLocalEnum:true, type:'ApproveStatusEnum', minWidth:120, },
  { label:'实付金额',prop:'approveStatus',useLocalEnum:true, type:'ApproveStatusEnum', minWidth:120, },
  { label:'付款金额',prop:'approveStatus',useLocalEnum:true, type:'ApproveStatusEnum', minWidth:120, },
  { label:'单据状态',prop:'relationStatus',useLocalEnum:true, type:'RelationStatusEnum', width:120, userFormatter: (cellValue)=>{
    let value = ''
    RelationStatusEnum.map(item => {if(item.value == cellValue){value = item.name}})
    return value} },
  { label:'申请人',prop:'relationUserName', minWidth:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]

export const receiptInfoConfig=[//信息查看
  { title:'采购订单', prop:'paymenterName' },
  { title:'采购合同', prop:'paymentAmt',type:'money' },
  { title:'供应商', prop:'paymentDate', type:'time' },
  { title:'已付货款', prop:'fileInfos', useIf:'files' },
  { title:'本次申请付款', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, },
  { title:'入库金额', prop:'paymentBank', },
  { title:' 已开发票金额', prop:'paymentAccount', },
]
export const execInfoConfig=[//收款单执行情况
  { title:'执行状态', prop:'relationStatus',type:'RelationStatusEnum', useLocalEnum:true,userFormatter: (cellValue)=>{
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
export const detailInfo = [
  { title:'收款方', prop:'paymenterName' },
  { title:'款项性质', prop:'paymentAmt',type:'money' },
  { title:'款项类型', prop:'paymentDate', type:'time' },
  { title:'采购订单', prop:'fileInfos', useIf:'files' },
  { title:'采购合同', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, },
  { title:'合同约定付款方式 ', prop:'paymentBank', },
  { title:' 已付货款 ', prop:'paymentAccount', },
  { title:'申请付款金额', prop:'paymenterName' },

  { title:'其中：货款', prop:'paymentAmt',type:'money' },
  { title:'其中：贴息', prop:'paymentDate', type:'time' },
  { title:'要求付款日期', prop:'fileInfos', useIf:'files' },
  { title:'收款方银行账户', prop:'paymentMode',type:'PaymentModeEnum', useLocalEnum:true, },
  { title:'收款方收款银行 ', prop:'paymentBank', },
  { title:' 附件 ', prop:'paymentAccount', },
  { title:' 付款相关信息 ', prop:'paymentAccount', },
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

export const realPay=[//操作记录
  { title:'付款日期',prop:'invoiceNo'},
  { title:'付款人',prop:'applyCode'},
  { title:'付款金额 ',prop:'applyCode'},
  { title:'备注',prop:'cusName',type:'time',}
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]