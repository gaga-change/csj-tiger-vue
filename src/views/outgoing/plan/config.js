export const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品分类',prop:'skuCategoryName'},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'品牌名',prop:'skuBrandName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'已出/应出',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
  }},
];

export  const infoConfig=[
  {title:'计划单号',prop:'planCode'},
  {title:'业务单号',prop:'busiBillNo',useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'计划制定时间',prop:'planTime',type:'time'},
  {title:'计划人',prop:'planName'},
  {title:'计划仓库',prop:'planWarehouseName'},
  {title:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]


export const outgoingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'出库单号',prop:'warehouseExeCode',linkTo:'/outgoing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode',linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'出库仓库编号',prop:'warehouseCode'},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'},
]


export const indexTableConfig=[
  { label:'计划单号',prop:'planCode',fixed:true,linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}] },
  { label:'业务单号',prop:'busiBillNo',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  { label:'客户名称',prop:'arrivalName'},
  { label:'货主',prop:'ownerName'},
  { label:'计划出库仓库',prop:'planWarehouseName'},
  { label:'计划出库日期',prop:'planOutTime',type:'time'},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true,},
  { label:'操作',fixed:'right',type:'outgoing+reply'},
]