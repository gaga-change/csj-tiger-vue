export  const listIndexConfig=[ //列表页表格配置
    { label:'异常签收登记单号',prop:'',},
    { label:'客户名称',prop:'',},
    { label:'订单编号',prop:'',},
    { label:'合同编号',prop:'',},
    { label:'申请数量',prop:'',},
    { label:'金额',prop:'',},
    { label:'单据状态',prop:'',},
    { label:'返回日期',prop:'',},
    { label:'操作',useLink:true},
  ]

  export  const detailBaseInfo=[ //详情页基本信息
    { title:'客户',prop:'',},
    { title:'订单编号',prop:'',},
    { title:'合同编号',prop:'',},
    { title:'异常商品处理建议',prop:'',},
    { title:'具体原因',prop:'',},
    { title:'退回地址',prop:'',},
    { title:'计划退回日期',prop:'',},
    { title:'联系电话',prop:'',},
  ]

  export  const detailReturnBaseInfo=[ //详情页退回商品的采购信息
    { title:'供应商',prop:'',},
    { title:'采购订单编号',prop:'',},
    { title:'采购合同编号',prop:'',},
    { title:'发票状态',prop:'',},
    { title:'付款状态',prop:'',},
    { title:'已入库数量',prop:'',},
    { title:'已入库金额',prop:'',},
    { title:'已收票金额',prop:'',},
    { title:'已付贷款',prop:'',},
  ]



  export  const detailAbnormalReceipt=[ //异常签收商品明细
    { label:'序号',type:'index'},
    { label:'商品编码',prop:'',},
    { label:'商品名称',prop:'',},
    { label:'规格型号',prop:'',},
    { label:'单位',prop:'',},
    { label:'申请数量',prop:'',},
  ]
  
  export  const detailReturnGoods=[ //采购退货申请单
    { label:'采购退货申请单',prop:'',},
    { label:'创建日期',prop:'',},
    { label:'单据状态',prop:'',},
  ]