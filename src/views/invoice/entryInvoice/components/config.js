//发票登记列表页面 表格配置
export  const listIndexConfig=[
  { label:'收票单号',prop:'finaPurchaseInvoiceId',},
  { label:'客户',prop:'ownerName',},
  { label:'订单编号',prop:'',},
  { label:'业务板块',prop:'',},
  { label:'发票号',prop:'',},
  { label:'开票金额',prop:'invoiceAmt',},
  { label:'开票数量',prop:'',},
  { label:'发票收到日期',prop:''},
  { label:'发票开具日期',prop:''},
  { label:'发票类型',prop:'invoiceType',useLocalEnum:true,type:'InvoiceType'},
  { label:'发票状态',prop:'invoiceStatus',useLocalEnum:true,type:'InvoiceStatus'},
  { label:'单据状态',prop:'ticketStatus',useLocalEnum:true,type:'entryInvoiceTicketStatus'},
  { label:'操作',prop:'',},
]

//发票作废列表页面 表格配置
export  const voidIndexConfig=[
  { label:'作废申请单号',prop:'',},
  { label:'作废发票号',prop:'',},
  { label:'客户',prop:'',},
  { label:'订单编号',prop:'',},
  { label:'开票金额',prop:'',},
  { label:'开票数量',prop:'',},
  { label:'发票类型',prop:'',},
  { label:'单据状态',prop:'',},
  { label:'申请人',prop:'',},
  { label:'操作',prop:'',},
]

//详情页基本信息
export  const listDetailConfig=[
  { title:'供应商名称',prop:'',},
  { title:'订单编号',prop:'',},
  { title:'发票种类',prop:'',},
  { title:'发票性质',prop:'',},
  { title:'发票号码',prop:'',},
  { title:'实际开票金额',prop:'',},
  { title:'税额',prop:'',},
  { title:'发票开具日期',prop:'',},
  { title:'到票日期',prop:'',},
  { title:'不含税金额',prop:'',}
]

//详情页表格信息
  export  const listDetailTableConfig=[
    { label:'商品编码',prop:'',},
    { label:'规格型号',prop:'',},
    { label:'单位',prop:'',},
    { label:'单价',prop:'',},
    { label:'已入库数量',prop:'',},
    { label:'已入库金额',prop:'',},
    { label:'已开票数量',prop:'',},
    { label:'已开票金额',prop:'',},
    { label:'税率',prop:'',},
    { label:'本次开票数量',prop:'',},
    { label:'本次开票金额',prop:'',}
  ]

  //签收明细弹框表格配置
  export  const addAlertTableConfig=[
    { label:'序号',type:'index',columnType:'selection'},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'单价',prop:'taxPrice',},
    { label:'已入库数量',prop:'realInQty',},
    { label:'已开票数量',prop:'invoicedQty',},
    { label:'已入库金额',dom:formatter(1)},
    { label:'已开票金额',dom:formatter(2),},
  ]

 
  function formatter(type){
    return (row, column, cellValue, index)=>{
      switch(type){
        case 1:return row.realInQty*row.taxPrice;break;
        case 2:return row.invoicedQty*row.taxPrice;break;
      }
    }
  }

 
