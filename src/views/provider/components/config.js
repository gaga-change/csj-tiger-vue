export  const listIndexConfig=[ //list页配置
    { label:'客户收款登记号',prop:'',},
    { label:'出库计划单号',prop:'',},
    { label:'销售合同号',prop:'',},
    { label:'供应商',prop:'',},
    { label:'入库业务单',prop:'',},
    { label:'创建日期',prop:'',},
    { label:'收货日期',prop:'',},
    { label:'单据状态',prop:'',},
    { label:'操作',prop:'',},
  ]


  export  const detailBaseInfoConfig=[ //detail页基本信息配置
    { title:'收货企业',prop:'',},
    { title:'销售订单号',prop:'',},
    { title:'销售合同号',prop:'',},
    { title:'收货日期',prop:'',},
    { title:'收货地址',prop:'',},
    { title:'收货人',prop:'',},
    { title:'联系电话',prop:'',},
    { title:'上传附件',prop:'',},
   
  ]


  export  const detailTableConfig=[ //list页配置
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'',},
    { label:'商品名称',prop:'',},
    { label:'规格型号',prop:'',},
    { label:'品牌',prop:'',},
    { label:'计划出库量',prop:'',},
    { label:'收货数量',prop:'',},
    { label:'操作',prop:'',},
  ]


  export  const addTableConfig=[ //登记页table配置
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'ceshi',},
    { label:'商品名称',prop:'',},
    { label:'规格型号',prop:'',},
    { label:'品牌',prop:'',},
    { label:'计划出库量',prop:'',},
    { label:'本次收货数量',prop:'',},
    { label:'操作',prop:'',},
  ]

  export  const addChildTableConfig=[ //登记页子表配置
    { label:'序号',type:'index',width:50},
    { label:'供应商',prop:'',},
    { label:'采购单',prop:'',},
    { label:'采购数量',prop:'',},
    { label:'客户已收数量',prop:'',},
    { label:'本次收货数量',prop:'',},
  ]
