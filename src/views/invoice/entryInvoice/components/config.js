//发票登记列表页面 表格配置
export  const listIndexConfig=[
  { label:'收票单号',prop:'registerCode',fixed:true,width:120,linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}]},
  { label:'供应商',prop:'providerName',width:120},
  { label:'货主',prop:'ownerName',minWidth:120},
  { label:'订单编号',prop:'busiBillNo',width:120},
  { label:'合同编号',prop:'contractNo',width:120},
  { label:'业务板块',prop:'busiPlate',useLocalEnum:true,type:'busiPlateConfig',},
  { label:'发票号',prop:'invoiceNo',width:120},
  { label:'发票金额',prop:'invoiceAmt',type:'toFixed'},
  { label:'数量',prop:'invoicedQty',},
  { label:'发票收到日期',prop:'arriveDate',width:150,type:'time',format:'YYYY-MM-DD'},
  { label:'发票开具日期',prop:'makeDate',width:150,type:'time',format:'YYYY-MM-DD'},
  { label:'单据创建日期',prop:'gmtCreate',width:150,type:'time',format:'YYYY-MM-DD'},
  { label:'发票类型',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType',width:150},
  { label:'发票性质',prop:'invoiceNature',useLocalEnum:true,type:'NatureInvoice'},
  { label:'发票状态',prop:'invoiceStatus',useLocalEnum:true,type:'InvoiceStatus'},
  { label:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { label:'操作',fixed:'right',useLink:true,width:120},
]

//发票作废列表页面 表格配置
export  const voidIndexConfig=[
  { label:'作废申请单号',prop:'registerCode',width:150,fixed:true,linkTo:'/invoice/entryInvoice/registrationDetail',query:[{key:'finaPurchaseInvoiceId',value:'finaPurchaseInvoiceId'}]},
  { label:'作废发票号',prop:'invoiceNo',width:150},
  { label:'供应商',prop:'providerName',width:150},
  { label:'货主',prop:'ownerName',width:120},
  { label:'订单编号',prop:'busiBillNo',width:150},
  { label:'发票金额',prop:'invoiceAmt',type:'toFixed'},
  { label:'数量',prop:'invoicedQty',},
  { label:'发票类型',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType',width:150},
  { label:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { label:'作废状态',prop:'cancelApplyStatus',useLocalEnum:true,type:'invoiceCancelStatusConfig'},
  { label:'发票性质',prop:'invoiceNature',useLocalEnum:true,type:'NatureInvoice'},
  { label:'申请人',prop:'cancelApplyName',},
  { label:'操作',fixed:'right',useLink:true,width:120},
]

//详情页基本信息
export  const listDetailConfig=[
  { title:'供应商名称',prop:'providerName',},
  { title:'订单编号',prop:'busiBillNo',},
  { title:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { title:'作废状态',prop:'cancelApplyStatus',useLocalEnum:true,type:'invoiceCancelStatusConfig'},
  { title:'发票种类',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType'},
  { title:'发票性质',prop:'invoiceNature',useLocalEnum:true,type:'NatureInvoice'},
  { title:'发票状态',prop:'invoiceStatus',useLocalEnum:true,type:'InvoiceStatus'},
  { title:'蓝票票号',prop:'oldInvoiceNo'},
  { title:'发票号码',prop:'invoiceNo',},
  { title:'实际开票金额',prop:'invoiceAmt',},
  { title:'税额',prop:'invoiceTaxAmt',},
  { title:'发票开具日期',prop:'makeDate',type:'time',format:'YYYY-MM-DD'},
  { title:'到票日期',prop:'arriveDate',type:'time',format:'YYYY-MM-DD'},
  { title:'不含税金额',prop:'notInvoiceAmt'}
]

//详情页表格信息
  export  const listDetailTableConfig=[
    { label:'商品信息',children:[
      { label:'序号',type:'index',width:50},
      { label:'商品编码',prop:'skuCode',},
      { label:'商品名称',prop:'skuName',},
      { label:'规格型号',prop:'skuFormat',},
      { label:'已收票数量',dom:formatter(3)},
      { label:'单位',prop:'skuUnitName',},
    ]},
    { label:'入库信息',children:[
      { label:'入库单价',prop:'incomingUnitPrice',},
      { label:'已入库数量',prop:'realInQty',useSum:true},
      { label:'已入库金额',dom:formatter(9),useSum:'incomingUnitPrice,realInQty',unitName:'元'},
    ]},
    { label:'本张发票商品信息',children:[
      { label:'单价',prop:'taxPrice',},
      { label:'数量',prop:'invoiceQty',useSum:true},
      { label:'金额',dom:formatter(8),useSum:'invoiceQty,taxPrice',unitName:'元'},
    ]}
  ]

  //签收明细弹框表格配置
  export  const addAlertTableConfig=[
    { label:'序号',type:'index',columnType:'selection'},
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'单价',prop:'inPrice',},
    { label:'已入库数量',prop:'realInQty',},
    { label:'已收票数量',dom:formatter(3),},
    { label:'已入库金额',dom:formatter(1)},
  ]


  function formatter(type){
    return (row, column, cellValue, index)=>{
      switch(type){
        case 1:return !isNaN(Number(row.realInQty*row.inPrice))?Number(row.realInQty*row.inPrice).toFixed(2):0;break;
        case 2:return !isNaN(Number(row.invoicedQty*row.inPrice))?Number(row.invoicedQty*row.inPrice).toFixed(2):0;break;
        case 3:return !isNaN(Number(row.invoicedQty))?Number(row.invoicedQty).toFixed(2):0;break;
        case 4:return !isNaN(Number(row.taxPrice*row.invoiceQty))?Number(row.taxPrice*row.invoiceQty).toFixed(2):0;break;
        case 5:return !isNaN(Number(row.taxRate/100))?Number(row.taxRate/100).toFixed(2):0;break;
        case 6:return !isNaN(Number(row.taxPrice*row.realInQty))?Number(row.taxPrice*row.realInQty).toFixed(2):0;break;
        case 7:return !isNaN(Number(row.taxPrice*row.invoicedQty))?Number(row.taxPrice*row.invoicedQty).toFixed(2):0;break;
        case 8:return !isNaN(Number(row.invoiceQty*row.taxPrice))?Number(row.invoiceQty*row.taxPrice).toFixed(2):0;break;
        case 9:return !isNaN(Number(row.incomingUnitPrice*row.realInQty))?Number(row.incomingUnitPrice*row.realInQty).toFixed(2):0;break;
      }
    }
  }

 
