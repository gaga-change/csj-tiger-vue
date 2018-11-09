export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  // { label:'生产厂家',prop:'productFactory'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'单价',prop:'inPrice'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'已入/应入',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
  }},
 
];

export  const infoConfig=[
  {title:'业务单号',prop:'busiBillNo',},
  {title:'业务类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'来源系统',prop:'fromSystemId'},
  {title:'制单人',prop:'createrName'},
  {title:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  {title:'制单时间',prop:'gmtCreate',type:'time'},
  {title:'供应商编号',prop:'providerCode'},
  {title:'供应商名称',prop:'providerName'},
  {title:'联系电话',prop:'providerLinkTel'},
]

export const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'计划单号',prop:'planCode',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'货主',prop:'ownerName'},
  { label:'仓库',prop:'warehouseName'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time'},
];

export const planTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'计划单号',prop:'planCode',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'货主',prop:'ownerName'},
  { label:'制单人',prop:'createrName'},
  { label:'计划入库仓库',prop:'planWarehouseName'},
  { label:'下推状态',prop:'issuedState',type:'getIssuedState',useApi:true},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
  { label:'制定时间',prop:'gmtCreate',type:'time'},
  { label:'计划入库日期',prop:'planTime',type:'time'},
]

export const indexTableConfig=[
  { label:'业务单号',prop:'busiBillNo',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  { label:'货主名称',prop:'ownerName'},
  { label:'供应商名称',prop:'providerName'},
  { label:'制单人',prop:'createrName'},
  { label:'制单时间',prop:'gmtCreate',type:'time'},
  { label:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  { label:'操作',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}],linkText:'查看'},
 ]
