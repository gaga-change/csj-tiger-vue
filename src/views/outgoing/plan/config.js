export const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'商品分类',prop:'skuCategoryName'},
  { label:'品牌名',prop:'skuBrandName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'已出/应出(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
  }},
];

export  const infoConfig=[
  {title:'计划单号',prop:'planCode'},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'业务单号',prop:'busiBillNo'},
  {title:'计划制定时间',prop:'planTime',type:'time'},
  {title:'计划人',prop:'planName'},
  {title:'计划仓库',prop:'planWarehouseName'},
  {title:'下推状态',prop:'issuedState',type:'getIssuedState',useApi:true},
  {title:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]

export const outgoingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'出库单号',prop:'warehouseExeCode'},
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode'},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'出库仓库编号',prop:'warehouseCode'},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'},
]


export const indexTableConfig=[
  { label:'计划单号',prop:'planCode',width:'150px',fixed:true,link:'outgoing-plan' },
  { label:'业务单号',prop:'busiBillNo',width:'150px' },
  { label:'货主',prop:'ownerName',width:'180px'},
  { label:'计划出库仓库',prop:'planWarehouseName',width:'180px'},
  { label:'制定时间',prop:'gmtCreate',type:'time',width:'160px'},
  { label:'计划出库日期',prop:'planOutTime',type:'time',width:'160px'},
  { label:'最晚出库日期',prop:'lastOutTime',type:'time',width:'160px'},
  { label:'下推状态',prop:'issuedState',width:'180px',type:'getIssuedState',useApi:true,},
  { label:'执行状态',prop:'execStatus',width:'150px',type:'outbusibillstate',useApi:true,},
  { label:'操作',width:'150px',fixed:'right',link:'outgoing-plan+reply'},
]