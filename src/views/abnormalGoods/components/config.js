export  const listIndexConfig=[ //列表页表格配置
    { label:'异常签收登记单号',prop:'registerCode',linkTo:'/abnormalGoods/detail',query:[{key:'id',value:'id'}]},
    { label:'客户名称',prop:'customerName',},
    { label:'订单编号',prop:'outBillNo',},
    { label:'合同编号',prop:'outContractNo',},
    { label:'申请数量',prop:'numberOfApplications',},
    { label:'金额',prop:'amount',type:'toFixed'},
    { label:'单据状态',prop:'billStatus',useLocalEnum:true,type:'billStatusEnum'},
    { label:'计划退回日期',prop:'planReturnDate',type:'time'},
    { label:'操作',useLink:true},
  ]

  export  const detailBaseInfo=[ //详情页基本信息
    { title:'客户',prop:'customerName',},
    { title:'订单编号',prop:'outBillNo',},
    { title:'合同编号',prop:'outContractNo',},
    { title:'单据状态',prop:'billStatus',useLocalEnum:true,type:'billStatusEnum'},
    { title:'退回地址',prop:'returnAddress',},
    { title:'计划退回日期',prop:'planReturnDate',type:'time'},
    { title:'联系电话',prop:'linkTel',},
    { title:'异常商品处理建议',prop:'handleOpinion',span:24,useLocalEnum:true,type:'handleOpinionConfig'},
    { title:'具体原因',span:24,prop:'rejectReason',},
  ]

  export  const detailReturnBaseInfo=[ //详情页退回商品的采购信息
    { title:'供应商',prop:'providerName',},
    { title:'采购订单编号',prop:'busiBillNo',},
    { title:'采购合同编号',prop:'contractNo',},
    // { title:'发票状态',prop:'invoiceStatus',useLocalEnum:true,type:'invoiceStatusConfig'},
    // { title:'付款状态',prop:'paymentStatus',useLocalEnum:true,type:'paymentStatusConfig'},
    // { title:'已入库数量',prop:'realInQty',},
    { title:'已入库金额',prop:'inboundAmount',type:'toFixed'},
    // { title:'已收票金额',prop:'invoicedAmount',type:'toFixed'},
    { title:'已付贷款',prop:'paidPayment',type:'toFixed'},
  ]



  export  const detailAbnormalReceipt=[ //异常签收商品明细
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'单位',prop:'skuUnitName',},
    { label:'单价',prop:'taxPrice',},
    { label:'申请数量',prop:'returnQty',},
    { label:'金额',dom:formatter(1)},
  ]
  

  export  const addAlertTableConfig=[ //商品明细table
    { label:'序号',type:'index',columnType:'selection'},
    { label:'序号',type:'index',width:50},
    { label:'商品编号',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'采购单价',prop:'costPrice',},
    { label:'供应商名称',prop:'providerName',},
    { label:'采购合同编号',prop:'purcBatchContractNo',},
    { label:'仓库',prop:'warehouseName',},
    { label:'可用库存数量',prop:'refundQty',},
  ]


  export  const todoDetailInfoConfig=[ //采购退货单详情配置
    { title:'采购合同',prop:'contractno',},
    { title:'采购单号',prop:'purchorder',},
    { title:'退货申请日期',prop:'backapplydate',type:'time'},
    { title:'供应商名称',prop:'servicername'},
    { title:'开票状态',prop:'invoicestatus'},
    { title:'开票金额',prop:'invoiceamount'},
    { title:'付款状态',prop:'paystatus',useLocalEnum:true, type:'paymentStatusConfig'},
    { title:'付款金额',prop:'payamount',},
    { title:'退货金额',prop:'sumbackamount'},
    { title:'退货原因',prop:'backreason'},
   
  ]


  export  const todoDetailTableConfig=[ //列表页表格配置
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'materialno',},
    { label:'商品名称',prop:'materialname',},
    { label:'品牌',prop:'materialtag',},
    { label:'规格',prop:'materialrule',},
    { label:'单位',prop:'orderunit',},
    { label:'单价',prop:'price',},
    { label:'出库数量',prop:'outnum',},
    { label:'退货数量',prop:'backnum',},
    { label:'出库金额',prop:'outamount',},
    { label:'退货金额',prop:'backamount',},
  ]


  function formatter(type){
    return (row, column, cellValue, index)=>{
      switch(type){
        case 1:return !isNaN(Number(row.taxPrice*row.returnQty))?Number(row.taxPrice*row.returnQty).toFixed(2):0;break;  
      }
    }
  }
