export  const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品分类',prop:'skuSort',},
  { label:'SKU名称',prop:'skuName',},
  { label:'规格型号',prop:'skuFormat',},
  { label:'生产厂家',prop:'productFactory'},
  { label:'品牌名',prop:'skuBrandName',},
  { label:'单位',prop:'skuUnitName',},
  { label:'出单价格',prop:'outStorePrice',},
  { label:'已出/应出(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
  }},
  { label:'转换比',prop:'skuUnitConvert',width:"80"},
];

export const infoConfig=[
  {title:'业务单号',prop:'busiBillNo'},
  {title:'业务类型',prop:'busiBillType', type:'getBillType',useApi:true},
  {title:'来源系统',prop:'fromSysCode'},
  {title:'制单时间',prop:'busiBillCreateTime',type:'time',},
  {title:'制单人',prop:'busiBillCreater'},
  {title:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  {title:'是否越库',prop:'isCross',type:'boolean'},
  {title:'是否可分批',prop:'isBatch',type:'boolean'},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'客户地址',prop:'arrivalAddress',span:12},
  {title:'其他信息',prop:'otherInfo',span:12},
]

export const outgoingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'出库单号',prop:'warehouseExeCode'},
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode'},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'出库仓库编号',prop:'warehouseCode',},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'}
]


export const planTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'计划单号',prop:'planCode'},
  { label:'货主',prop:'ownerName'},
  { label:'计划出库仓库',prop:'planWarehouseName'},
  { label:'制定时间',prop:'gmtCreate',type:'time'},
  { label:'计划出库日期',prop:'planOutTime',type:'time'},
  { label:'最晚出库日期',prop:'lastOutTime',type:'time'},
  { label:'下推状态',prop:'issuedState',type:'getIssuedState',useApi:true},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
]


export const indexTableConfig=[
  { label:'业务单号',prop:'busiBillNo',link:'/outgoing/businessorder-detail'},
  { label:'货主编号',prop:'ownerCode'},
  { label:'货主名称',prop:'ownerName'},
  { label:'制单人',prop:'busiBillCreater'},
  { label:'制单时间',prop:'busiBillCreateTime',type:'time'},
  { label:'是否越库',prop:'isCross',type:'Boolean'},
  { label:'操作',link:'/outgoing/businessorder-detail',linkText:'查看'},
]