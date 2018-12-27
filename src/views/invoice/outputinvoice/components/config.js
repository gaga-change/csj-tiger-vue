import { NatureInvoice, InvoiceStatus, TicketStatus, InvoiceType} from '@/utils/enum'
import Moment  from 'moment'
export const indexTableConfigApply=[//申请列表
  { label:'开票申请单号',prop:'applyCode',fixed:true, width:120 ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'客户名称',prop:'cusName', width:120 },
  { label:'计划开票金额',prop:'realInvoiceAmt',type:'money', width:120 },
  { label:'计划开票数量',prop:'numberOfInvoices', width:120 },
  { label:'单据创建时间',prop:'gmtCreate',type:'time', width:120 },
  { label:'创建人',prop:'createrName', width:120 },
  { label:'发票类型',prop:'invoiceType',type:'InvoiceType', useLocalEnum:true, width:120 },
  { label:'发票性质',prop:'invoiceNature',type:'NatureInvoice', useLocalEnum:true, minWidth:90},
  { label:'发票状态',prop:'invoiceStatus', width:120, type:'InvoiceStatus', useLocalEnum:true},
  { label:'单据状态',prop:'ticketStatus', type:'TicketStatus', useLocalEnum:true, minWidth:90 },
  { label:'申请人',prop:'issuer', minWidth:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const indexTableConfigRegistration=[//登记列表
  { label:'开票单号',prop:'invoiceNo',fixed:true, width:120,linkTo:'/invoice/outputinvoice/invoiceregistration/detail',query:[{key:'id',value:'id'}] },
  { label:'开票申请单号',prop:'applyCode', width:120 },
  { label:'客户名称',prop:'cusName', width:120 },
  { label:'订单编号',prop:'outBusiBillNo', width:150  },
  { label:'合同编号',prop:'contractNo', width:120 },
  { label:'单据创建时间',prop:'gmtCreate',type:'time', width:120 },
  { label:'创建人',prop:'createrName', width:120 },
  // { label:'业务板块',prop:'cusName2', width:80 },
  { label:'发票号',prop:'invoiceCode', width:120 },
  { label:'发票申请日期',prop:'applyTime', width:100, dom: (row, column, cellValue, index)=>{
    return cellValue ? Moment(cellValue).format('YYYY-MM-DD') : ''
  } },
  { label:'发票开具日期',prop:'ticketTime',width:100,dom: (row, column, cellValue, index)=>{
    return cellValue ? Moment(cellValue).format('YYYY-MM-DD') : ''
  }},
  { label:'开票金额',prop:'realInvoiceAmt',type:'money', minWidth:90},
  { label:'开票数量',prop:'numberOfInvoices', minWidth:90},
  { label:'发票类型',prop:'invoiceType',type:'InvoiceType', useLocalEnum:true, width:120 },
  { label:'发票性质',prop:'invoiceNature',type:'NatureInvoice', useLocalEnum:true, minWidth:90},
  { label:'发票状态',prop:'invoiceStatus', width:120, type:'InvoiceStatus', useLocalEnum:true},
  { label:'单据状态',prop:'ticketStatus', type:'TicketStatus', useLocalEnum:true , minWidth:90},
  { label:'开票人',prop:'issuer', width:90,type:'outbusibillstate',useApi:true, minWidth:90},
  { label:'操作',fixed:'right',userLink:true, width:100},
]
export const indexTableConfigInvalid=[//待改
  { label:'开票单号',prop:'invoiceNo',fixed:true, width:120,linkTo:'/invoice/outputinvoice/invoiceinvalid/detail',query:[{key:'id',value:'id'}] },
  { label:'开票申请单号',prop:'applyCode', width:120},
  { label:'客户名称',prop:'cusName', width:120  },
  { label:'开票金额',prop:'realInvoiceAmt',type:'money', minWidth:90},
  { label:'开票数量',prop:'numberOfInvoices', minWidth:90 },
  { label:'发票类型',prop:'invoiceType',type:'InvoiceType', useLocalEnum:true, width:120 },
  { label:'发票性质',prop:'invoiceNature',type:'NatureInvoice', useLocalEnum:true, minWidth:90},
  { label:'申请作废状态',prop:'invoiceCancelStatus', width:120, type:'invoiceCancelStatusConfig', useLocalEnum:true},
  { label:'单据状态',prop:'ticketStatus', type:'TicketStatus', useLocalEnum:true, minWidth:90 },
  { label:'开票人',prop:'issuer', minWidth:120 },
  { label:'操作', width:100,fixed:'right',userLink:true},
]

//detailtableConfig,applyinfoConfig, detailinfoConfig, recordConfig
export const applyinfoConfig=[//发票申请信息
  { title:'开票单号',prop:'invoiceNo', show:'register+invalid' },
  { title:'发票申请单号',prop:'applyCode', show:'apply+register+invalid+billing' },
  { title:'客户名称',prop:'cusName', show:'apply+register+invalid+billing',width:120},
  { title:'订单编号',prop:'outBusiBillNo',  show:'apply+register+invalid+billing',useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'outBusiBillNo'}]  },
  { title:'合同编号',prop:'contractNo', show:'apply+register+invalid+billing' },
  { title:'发票种类',prop:'invoiceType', userFormatter: (cellValue)=>{
    let invoice = ''
    InvoiceType.map(item => {if(item.value == cellValue){invoice = item.name}})
    return invoice}, show:'apply+register+invalid+billing'
  },
  { title:'发票性质',prop:'invoiceNature', userFormatter: ( cellValue)=>{
    let invoiceNature = ''
    NatureInvoice.map(item => {if(item.value == cellValue){invoiceNature = item.name}})
    return invoiceNature}, show:'apply+register+invalid+billing'
  },
  { title:'蓝票票号',prop:'oldInvoiceCode',show:'apply+register+invalid+billing'},
  { title:'发票最迟开具日期',prop:'applyLastAllowTime',type:'time', show:'apply+register+invalid+billing' },
  { title:'发票申请日期',prop:'applyTime',type:'time', show:'apply+register+invalid+billing' },
  { title:'发票开具金额',prop:'applyInvoiceAmt',userFormatter: (cellValue)=>{
    return (cellValue-0).toFixed(2)}, show:'apply+register+invalid+billing'
  },
  { title:'税额',prop:'realInvoiceTaxAmt',userFormatter: (cellValue)=>{
    return (cellValue-0).toFixed(2)}, show:'apply+register+invalid'
  },
  { title:'不含税金额',prop:'actualNoTaxAmt',userFormatter: (cellValue)=>{
    return (cellValue-0).toFixed(2)}, show:'apply+register+invalid'
  },
  { title:'单据状态',prop:'ticketStatus', userFormatter: (cellValue)=>{
    let status = ''
    TicketStatus.map(item => {if(item.value == cellValue){status = item.name}})
    return status
    }, show:'apply+register+invalid+billing'
  },
  // { title:'开票人',prop:'drawerName', show:'apply' },
  { title:'申请人',prop:'applicantName', show:'apply+register+invalid+billing'},
]
export const detailinfoConfig=[//发票详情信息
  { title:'发票登记号',prop:'invoiceNo', show:'apply', span:6 },
  { title:'发票号',prop:'invoiceCode', show:'apply+register+invalid', span:6 },
  { title:'发票日期',prop:'ticketTime',type:'time', show:'register+invalid', span:6 },
  { title:'备注',prop:'ticketRemark', show:'register+invalid',span:10},
]
export const detailtableConfig=[//详情表格
  { label:'序号',type:'index', width:50 },
  { label:'商品分类',prop:'skuCategoryno', minWidth:120 },
  { label:'商品编码',prop:'skuCode', minWidth:120 },
  { label:'商品名称',prop:'skuName', minWidth:160},
  { label:'税务编码',prop:'taxCode', minWidth:120},
  { label:'规格型号',prop:'skuFormat', minWidth:90},
  { label:'单位',prop:'skuUnitName', minWidth:90}, 
  { label:'签收数量',prop:'numberOfReceipts', minWidth:90},
  { label:'单价',prop:'taxPrice', minWidth:90},
  { label:'税率',prop:'taxRate', minWidth:90},
  { label:'开票数量',prop:'actualInvoiceNumber', minWidth:90},
  { label:'含税金额',prop:'actualAmt', minWidth:90},
  { label:'税额',prop:'invoiceTax', minWidth:90},
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]