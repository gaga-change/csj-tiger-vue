export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'单价',prop:'inPrice',type:'toFixed'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'已入/总数',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
  }},

  { label:'还应入',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.planInQty-row.realInQty}(${row.skuUnitName})`
  }},
 
];


export   const infoConfig=[
  {title:'计划单号',prop:'planCode'},
  {title:'业务单号',prop:'busiBillNo',useIf:'link',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  {title:'入库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'计划人',prop:'busiBillCreater'},
  {title:'计划仓库',prop:'planWarehouseName'},
  {title:'计划制定时间',prop:'busiBillCreaterTime',type:'time'},
  {title:'货主编号',prop:'ownerCode'},
  {title:'货主名称',prop:'ownerName'},
  {title:'供应商名称',prop:'providerName'},
  {title:'供应商编号',prop:'providerCode'},
  {title:'联系电话',prop:'linkTel'},
  {title:'下推状态',prop:'issuedState', type:'getIssuedState',useApi:true},
  {title:'执行状态',prop:'execStatus', type:'outbusibillstate',useApi:true},
];

export   const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'业务单号',prop:'busiBillNo' ,linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  { label:'货主',prop:'ownerName'},
  { label:'仓库',prop:'warehouseName'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time'},
]

export   const indexTableConfig=[
  { label:'计划单号',prop:'planCode',fixed:true,linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'业务单号',prop:'busiBillNo',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  { label:'供应商名称',prop:'providerName'},
  { label:'货主',prop:'ownerName'},
  { label:'制单人',prop:'createrName'},
  { label:'计划入库仓库',prop:'planWarehouseName'},
  { label:'执行状态',width:100,prop:'execStatus',type:'outbusibillstate',useApi:true},
  { label:'计划入库日期',prop:'planTime',type:'time'},
  { label:'操作',width:50,fixed:'right',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}],linkText:'查看' },
]
