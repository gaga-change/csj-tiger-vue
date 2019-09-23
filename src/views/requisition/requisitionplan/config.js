export  const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName',width:120},
  { label:'调拨数量',prop:'transferQty'},
  { label:'已出库数量',prop:'realOutQty'},
  { label:'已出库金额',prop:'realOutAmt'},
  { label:'已入库数量',prop:'realInQty'},
  { label:'已入库金额',prop:'realInAmt'},  
  { label:'备注',prop:'remarkInfo'}
];

export const infoConfig=[
  {title:'调拨单号',prop:'transferNo'},
  {title:'货主',prop:'ownerName'},
  {title:'调出仓库',prop:'outWarehouseName'},
  {title:'调出日期',prop:'outDate',type:'time'},
  {title:'调入仓库',prop:'inWarehouseName'},
  {title:'调入日期',prop:'inDate',type:'time'},
  {title:'接收人',prop:'warehouseLinkName'},
  {title:'所在地区',prop:'area'},
  {title:'详细地址',prop:'warehouseAddress'},
  {title:'联系方式',prop:'linkTel'},
  {title:'备注',prop:'remarkInfo',span:12},
]


export const indexTableConfig=[
  { label:'调拨单号',fixed:true,prop:'transferNo',width:160},
  { label:'出库仓库',prop:'outWarehouseName'},
  { label:'入库仓库',prop:'inWarehouseName'},
  { label:'货主',prop:'ownerName',width:180},
  { label:'单据状态',prop:'transferStatus',type:'transferBillStatusEnum',useLocalEnum:true,width:100},
  { label:'出库状态',prop:'outStatus',type:'outWarehouseStatus',useLocalEnum:true,width:100},
  { label:'入库状态',prop:'inStatus',type:'inWarehouseStatus',useLocalEnum:true,width:100},
  { label:'创建时间',prop:'gmtCreate',type:'time',width:140}
]


export const addtable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'型号',prop:'skuModel'},
  { label:'调拨数量',prop:'transferQty',useEdit:true,width:120},
  { label:'备注',prop:'remarkInfo'},
]


export const detail_planTableConfig=[
  { label:'序号',type:'index',fixed:true,width:50},
  { label:'业务类型',prop:'busiBillType', type:'billTypeFilter',useLocalEnum:true },
  { label:'计划单号',prop:'planCode'},
  { label:'数量',prop:'planQty'},
  { label:'金额',prop:'planAmt'}
]

export const detail_outGoingTableConfig=[
  { label:'序号',type:'index',fixed:true,width:50},
  { label:'业务类型',prop:'busiBillType', type:'billTypeFilter',useLocalEnum:true },
  { label:'单号',prop:'warehouseExeCode'},
  { label:'计划单号',prop:'planCode'},
  { label:'数量',prop:'planQty'},
  { label:'金额',prop:'planAmt'}
]
