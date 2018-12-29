

  export  const baseInfoConfig=[ //基本信息
    { title:'销售单号',prop:'ticketno',},
    { title:'状态',prop:'status',useLocalEnum:true,type:'statusConfig'},
    { title:'计划单号',prop:'enquiryorder',},
    { title:'交货日期',prop:'planarrivedate',type:'time'},
    { title:'制单人',prop:'createuser'},
    { title:'客户',prop:'customername'},
    { title:'收款方式',prop:'recmethod',useLocalEnum:true,type:'recmethodConfig'},
    { title:'交货方式',prop:'deliverway',useLocalEnum:true,type:'deliverwayConfig'},
    { title:'合同编号',prop:'contractno'},
    { title:'客户合同编号',prop:'cuscontractno'},
    { title:'发出仓库',prop:'storename'},
    { title:'订单日期',prop:'orderdate',type:'time'},
    { title:'销售负责人',prop:'leader'},
    { title:'质保期限',prop:'warrantydate'},
    { title:'合同付款约定',prop:'pagreement'},
    { title:'合同开票约定',prop:'invoiceagreement'},
    { title:'质保期起算标准',prop:'warrantystandard'},
    { title:'质保金比例(%)',prop:'warrantyrate'},
    { title:'结算方式',prop:'settlementmethod',useLocalEnum:true,type:'settlementmethodConfig'},
    { title:'金额合计',prop:'sumorderamount'},
    { title:'合同金额',prop:'contractamount'},
    { title:'业务板块',prop:'businesstype',useLocalEnum:true,type:'busiPlateConfig'},
    { title:'已计划采购数量',prop:'sumplannum'},
    { title:'签收数量',prop:'sumreceiptnum'},
    { title:'签收金额',prop:'sumreceiptamount'},
    { title:'签收状态',prop:'recstatus',type:'recstatusConfig',useLocalEnum:true},
    { title:'附件',prop:'orgenclosure',useIf:'files'},
  ]

  export  const tabbelConfig=[ //表格
    {label:'序号',prop:'itemno',width:50},
    {label:'平台商品编码',prop:'materialno',},
    {label:'客户商品编码',prop:'custommaterialno',},
    {label:'商品名称',prop:'materialname',},
    {label:'规格',prop:'materialrule',},
    {label:'品牌',prop:'materialtag',},
    {label:'销售数量',prop:'ordernum',},
    {label:'签收数量',prop:'receiptnum',},
    {label:'签收金额',prop:'receiptamount',},
    {label:'单位',prop:'orderunit',},
    {label:'销售单价',prop:'saleprice',},
    {label:'销售金额',dom:(row, column, cellValue, index)=>{
        return (row.saleprice*row.ordernum).toFixed(2)
    }},
    {label:'已计划采购数量',prop:'plannum',},
    {label:'开票数量',prop:'invoicenum',},
    {label:'开票金额',prop:'invoiceamount',},
    {label:'税率',prop:'taxrate',},
    {label:'备注',prop:'memos',},

  ]