export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'商品分类',prop:'skuCategoryno'},
  { label:'品牌名',prop:'skuBrandName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'出单价格',prop:'inPrice'},
  { label:'已入/应入(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
  }},
 
];

export  const infoConfig=[
  {title:'业务单号',prop:'busiBillNo',},
  {title:'业务类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'来源系统',prop:'fromSystemId'},
  {title:'制单时间',prop:'gmtCreate',type:'time'},
  {title:'制单人',prop:'createrName'},
  {title:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  {title:'产品线',prop:'productLine'},
  {title:'业务模式',prop:'businessModel'},
  {title:'供应商编号',prop:'providerCode'},
  {title:'供应商名称',prop:'providerName'},
  {title:'联系电话',prop:'providerLinkTel'},
  {title:'其他信息',prop:'otherInfo'},
]

export const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode'},
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode'},
  { label:'仓库',prop:'warehouseName'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time'},
];

export const planTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'计划单号',prop:'planCode'},
  { label:'货主',prop:'ownerName'},
  { label:'制单人',prop:'createrName'},
  { label:'计划入库仓库',prop:'planWarehouseName'},
  { label:'制定时间',prop:'gmtCreate',type:'time'},
  { label:'计划入库日期',prop:'planTime',type:'time'},
  { label:'下推状态',prop:'issuedState',type:'getIssuedState',useApi:true},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
]

export const indexTableConfig=[
  { label:'业务单号',prop:'busiBillNo',link:'warehousing' },
  { label:'货主编号',prop:'ownerCode'},
  { label:'货主名称',prop:'ownerName'},
  { label:'制单人',prop:'createrName'},
  { label:'制单时间',prop:'gmtCreate',type:'time'},
  { label:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  { label:'操作',link:'warehousing',linkText:'查看'},
 ]
