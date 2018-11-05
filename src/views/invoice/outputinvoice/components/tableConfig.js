import { NatureInvoice, InvoiceStatus, TicketStatus, InvoiceType} from '@/utils/enum'
import Moment  from 'moment'
export const indexTableConfigApply=[//申请列表
  { label:'开票申请单号',prop:'applyCode',fixed:true ,linkTo:'/invoice/outputinvoice/invoiceapply/detail',query:[{key:'id',value:'id'}] },
  { label:'客户名称',prop:'cusName' },
  { label:'计划开票金额',prop:'realInvoiceAmt',type:'money', },
  { label:'计划开票数量',prop:'numberOfInvoices', },
  { label:'发票类型',prop:'invoiceType', dom: (row, column, cellValue, index)=>{
      let type = ''
      InvoiceType.map(item => {if(item.value == cellValue){type = item.name}})
      return type
    }
  },
  { label:'发票性质',prop:'invoiceNature', dom: (row, column, cellValue, index)=>{
      let nature = ''
      NatureInvoice.map(item => {if(item.value == cellValue){nature = item.name}})
      return nature
    }
  },
  // { label:'发票状态',prop:'invoiceStatus', width:120, dom: (row, column, cellValue, index)=>{
  //     let status = ''
  //     InvoiceStatus.map(item => {if(item.value == cellValue){status = item.name}})
  //     return status
  //   }
  // },
  { label:'单据状态',prop:'ticketStatus',  dom: (row, column, cellValue, index)=>{
      let status = ''
      TicketStatus.map(item => {if(item.value == cellValue){status = item.name}})
      return status
    }
  },
  { label:'申请人',prop:'issuer', width:90},
  { label:'操作',width:150,fixed:'right',userLink:true},
]
export const indexTableConfigRegistration=[//登记列表
  { label:'开票单号',prop:'invoiceNo',fixed:true, width:120,linkTo:'/invoice/outputinvoice/invoiceregistration/detail',query:[{key:'id',value:'id'}] },
  { label:'开票申请单号',prop:'applyCode', width:120 },
  { label:'客户名称',prop:'cusName', width:90 },
  { label:'订单编号',prop:'outBusiBillNo', width:120 },
  // { label:'业务板块',prop:'cusName2', width:80 },
  { label:'发票号',prop:'invoiceCode', width:120 },
  { label:'发票申请日期',prop:'applyTime', width:120, dom: (row, column, cellValue, index)=>{
    return cellValue ? Moment(cellValue).format('YYYY-MM-DD') : ''
  } },
  { label:'发票开具日期',prop:'ticketTime', width:120,dom: (row, column, cellValue, index)=>{
    return cellValue ? Moment(cellValue).format('YYYY-MM-DD') : ''
  }},
  { label:'开票金额',prop:'realInvoiceAmt',type:'money'},
  { label:'开票数量',prop:'numberOfInvoices'},
  { label:'发票类型',prop:'invoiceType', width:120, dom: (row, column, cellValue, index)=>{
      let type = ''
      InvoiceType.map(item => {if(item.value == cellValue){type = item.name}})
      return type
    }
  },
  { label:'发票性质',prop:'invoiceNature', width:120, dom: (row, column, cellValue, index)=>{
      let nature = ''
      NatureInvoice.map(item => {if(item.value == cellValue){nature = item.name}})
      return nature
    }
  },
  { label:'单据状态',prop:'ticketStatus', width:120, dom: (row, column, cellValue, index)=>{
      let status = ''
      TicketStatus.map(item => {if(item.value == cellValue){status = item.name}})
      return status
    }
  },
  { label:'开票人',prop:'issuer', width:90,type:'outbusibillstate',useApi:true,},
  { label:'操作',fixed:'right',userLink:true},
]
export const indexTableConfigInvalid=[//待改
  { label:'开票单号',prop:'invoiceNo', width:120,fixed:true,linkTo:'/invoice/outputinvoice/invoiceinvalid/detail',query:[{key:'id',value:'id'}] },
  { label:'开票申请单号',prop:'applyCode', width:120 },
  { label:'客户名称',prop:'cusName', width:120 },
  { label:'开票金额',prop:'realInvoiceAmt',type:'money', width:90},
  { label:'开票数量',prop:'numberOfInvoices', width:90},
  { label:'发票类型',prop:'invoiceType', width:120, dom: (row, column, cellValue, index)=>{
      let type = ''
      InvoiceType.map(item => {if(item.value == cellValue){type = item.name}})
      return type
    }
  },
  { label:'发票性质',prop:'invoiceNature', width:80, dom: (row, column, cellValue, index)=>{
      let nature = ''
      NatureInvoice.map(item => {if(item.value == cellValue){nature = item.name}})
      return nature
    }
  },
  { label:'单据状态',prop:'ticketStatus', width:120, dom: (row, column, cellValue, index)=>{
      let status = ''
      TicketStatus.map(item => {if(item.value == cellValue){status = item.name}})
      return status
    }
  },
  { label:'开票人',prop:'issuer', width:90},
  { label:'操作',fixed:'right',userLink:true},
]

//detailtableConfig,applyinfoConfig, detailinfoConfig, recordConfig
export const applyinfoConfig=[//发票申请信息
  { title:'客户名称',prop:'cusName', show:'apply+register+invalid+billing' },
  { title:'订单编号',prop:'outBusiBillNo', show:'apply+register+invalid+billing' },
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
  { title:'开票人',prop:'drawerName', show:'apply' },
  { title:'申请人',prop:'applicantName', show:'register+invalid+billing'},
]
export const detailinfoConfig=[//发票详情信息
  { title:'发票登记号',prop:'applyCode', show:'apply', width:120 },
  { title:'发票号',prop:'invoiceCode', show:'apply+register+invalid', width:120 },
  { title:'发票日期',prop:'cusName',type:'time', show:'register+invalid', width:120 },
  { title:'备注',prop:'applyRemark', show:'register+invalid'},
]
export const detailtableConfig=[//详情表格
  // { label:'序号',prop:'invoiceNo',},
  { label:'商品分类',prop:'skuCategoryno' },
  { label:'商品编码',prop:'skuCode' },
  { label:'商品名称',prop:'skuName'},
  { label:'税务编码',prop:'taxCode'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'单位',prop:'skuUnitName'}, 
  { label:'签收数量',prop:'numberOfReceipts'},
  { label:'单价',prop:'taxPrice'},
  { label:'税率',prop:'taxRate'},
  { label:'开票数量',prop:'actualInvoiceNumber'},
  { label:'含税金额',prop:'actualAmt'},
  { label:'税额',prop:'invoiceTax'},
]
export const recordConfig=[//操作记录
  { label:'序号',prop:'invoiceNo'},
  { label:'操作',prop:'applyCode'},
  { label:'操作者',prop:'applyCode'},
  { label:'发票日期',prop:'cusName',type:'time',}
]