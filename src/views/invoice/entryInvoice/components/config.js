//发票登记列表页面 表格配置
export  const listIndexConfig=[
  { label:'收票单号',prop:'finaPurchaseInvoiceId',fixed:true,width:120,linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}]},
  { label:'客户',prop:'ownerName',width:150},
  { label:'订单编号',prop:'busiBillNo',width:150},
  { label:'业务板块',prop:'busiPlate',useLocalEnum:true,type:'busiPlateConfig',},
  { label:'发票号',prop:'invoiceNo',},
  { label:'开票金额',prop:'invoiceAmt',},
  { label:'开票数量',prop:'invoiceNum',},
  { label:'发票收到日期',prop:'arriveDate',width:150,type:'time'},
  { label:'发票开具日期',prop:'makeDate',width:150,type:'time'},
  { label:'发票类型',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType',width:150},
  { label:'发票状态',prop:'invoiceStatus',useLocalEnum:true,type:'InvoiceStatus'},
  { label:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { label:'操作',linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}],linkText:'查看',fixed:'right'},
]

//发票作废列表页面 表格配置
export  const voidIndexConfig=[
  { label:'作废申请单号',prop:'finaPurchaseInvoiceId',fixed:true,linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}]},
  { label:'作废发票号',prop:'invoiceNo',},
  { label:'客户',prop:'ownerName',width:150},
  { label:'订单编号',prop:'busiBillNo',width:150},
  { label:'开票金额',prop:'invoiceAmt',},
  { label:'开票数量',prop:'invoiceNum',},
  { label:'发票类型',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType',width:150},
  { label:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { label:'作废状态',prop:'cancelApplyStatus',useLocalEnum:true,type:'invoiceCancelStatusConfig'},
  { label:'申请人',prop:'cancelApplyName',},
  { label:'操作',fixed:'right',linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}],linkText:'查看'},
]

//详情页基本信息
export  const listDetailConfig=[
  { title:'供应商名称',prop:'providerName',},
  { title:'订单编号',prop:'providerCode',},
  { title:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { title:'作废状态',prop:'cancelApplyStatus',useLocalEnum:true,type:'invoiceCancelStatusConfig'},
  { title:'发票种类',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType'},
  { title:'发票性质',prop:'invoiceNature',useLocalEnum:true,type:'NatureInvoice'},
  { title:'发票号码',prop:'invoiceNo',},
  { title:'实际开票金额',prop:'invoiceAmt',},
  { title:'税额',prop:'invoiceTaxAmt',},
  { title:'发票开具日期',prop:'makeDate',type:'time'},
  { title:'到票日期',prop:'arriveDate',type:'time'},
  { title:'不含税金额',prop:''}
]

//详情页表格信息
  export  const listDetailTableConfig=[
    { label:'商品编码',prop:'skuCode',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'单位',prop:'skuUnitName',},
    { label:'单价',prop:'taxPrice',},
    { label:'已入库数量',prop:'',},
    { label:'已入库金额',prop:'',},
    { label:'已开票数量',prop:'',},
    { label:'已开票金额',prop:''},
    { label:'税率',prop:'',},
    { label:'本次开票数量',prop:'invoiceQty',},
    { label:'本次开票金额',dom:formatter(4)}
  ]

  //签收明细弹框表格配置
  export  const addAlertTableConfig=[
    { label:'序号',type:'index',columnType:'selection'},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'单价',prop:'inPrice',},
    { label:'已入库数量',prop:'realInQty',},
    { label:'已开票数量',dom:formatter(3),},
    { label:'已入库金额',dom:formatter(1)},
    { label:'已开票金额',dom:formatter(2),},
  ]

  function formatter(type){
    return (row, column, cellValue, index)=>{
      switch(type){
        case 1:return row.realInQty*row.inPrice||0;break;
        case 2:return row.invoicedQty*row.inPrice||0;break;
        case 3:return row.invoicedQty||0;break;
        case 4:return row.taxPrice*row.invoiceQty||0;break
      }
    }
  }

 
