export  const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName',width:120},
  { label:'规格型号',prop:'skuFormat',},
  { label:'品牌',prop:'skuBrandName',},
  { label:'单位',prop:'skuUnitName',},
  { label:'单价',prop:'outStorePrice',},
  { label:'签收量',prop:'signQty'},
  { label:'拒收量',prop:'rejectQty'},
  { label:'回收量',prop:'recoverQty'},
  { label:'待回收量',prop:'toRecoverQty'},
  { label:'已出/应出',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
  }},
  { label:'转换比',prop:'skuUnitConvert',width:"80"},
];

export const infoConfig=[
  {title:'业务单号',prop:'busiBillNo'},
  {title:'业务类型',prop:'busiBillType', type:'getBillType',useApi:true},
  {title:'来源系统',prop:'fromSysCode'},
  {title:'制单人',prop:'busiBillCreater'},
  { title:'出库金额',prop:'realOutAmt'},
  { title:'出库数量',prop:'realOutQty'},
  {title:'状态',prop:'billState',type:'outbusibillstate',useApi:true},
  {title:'是否越库',prop:'isCross',type:'boolean'},
  {title:'是否可分批',prop:'isBatch',type:'boolean'},
  {title:'制单时间',prop:'busiBillCreateTime',type:'time',},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'客户地址',prop:'arrivalAddress',span:12},
]

export const outgoingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'出库单号',prop:'warehouseExeCode',linkTo:'/outgoing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'计划单号',prop:'planCode',linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'货主',prop:'ownerName'},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'出库仓库编号',prop:'warehouseCode',},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'}
]


export const planTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'计划单号',prop:'planCode',linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}] },
  { label:'货主',prop:'ownerName'},
  { label:'计划出库仓库',prop:'planWarehouseName'},
  { label:'下推状态',prop:'issuedState',type:'getIssuedState',useApi:true},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
  { label:'计划出库日期',prop:'planOutTime',type:'time'},
]

export const indexTableConfig=[
  { label:'业务单号',prop:'busiBillNo',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  { label:'合同编号',prop:'contractNo'},
  { label:'客户名称',prop:'arrivalName'},
  { label:'货主名称',prop:'ownerName'},
  { label:'出库金额',prop:'realOutAmt'},
  { label:'出库数量',prop:'realOutQty'},
  { label:'制单人',prop:'busiBillCreater'},
  { label:'是否越库',prop:'isCross',type:'Boolean'},
  { label:'制单时间',prop:'busiBillCreateTime',type:'time'},
  { label:'操作',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}],linkText:'查看'},
]