export  const listIndexConfig=[ //list页配置
    { label:'对账单号',prop:'billNo',linkTo:'/reconciliation/detail',query:[{key:'id',value:'id'}]},
    { label:'对账单标题',prop:'billTitle',},
    { label:'交易主体',prop:'ownerName',},
    { label:'对账起始日期',prop:'startTime',type:'time'},
    { label:'对账结束日期',prop:'endTime',type:'time'},
    { label:'创建时间',prop:'gmtCreate',type:'time'},
    { label:'对账金额',prop:'billAmt',},
    { label:'服务费金额',prop:'serviceChargeAmt',},
    { label:'操作',useLink:true},
  ]


  export  const detailBaseInfoConfig=[ //detail页基本信息配置
    { title:'对账起始日期',prop:'startTime',type:'time'},
    { title:'对账结束日期',prop:'endTime',type:'time'},
    { title:'交易主体',prop:'ownerName',},
    { title:'服务费百分比',prop:'serviceRate',type:'rate'},
  ]

  export  const detailTableConfig=[ //detail页list配置
    { label:'日期',prop:'makeDate',type:'time'},
    { label:'操作',prop:'invoiceStatus',useLocalEnum:true,type:'InvoiceStatus',},
    { label:'发票性质',prop:'invoiceNature',useLocalEnum:true,type:'NatureInvoice',},
    { label:'发票号',prop:'invoiceNo'},
    { label:'发票金额',prop:'invoiceAmt'},
  ]