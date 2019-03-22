export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'数量',prop:''},
  { label:'供应商编码',prop:''},
  { label:'供应商名称',prop:''},
  { label:'订货进价',prop:''},
  { label:'金额',prop:''},
  { label:'入库仓库',prop:''},
];

export  const infoConfig=[
  {title:'业务单号',prop:'',},
  {title:'外部订单号',prop:'',},
  {title:'货主编号',prop:''},
  {title:'货主名称',prop:''},
  {title:'订单来源',prop:''},
  {title:'订货日',prop:''},
  {title:'到货预定日',prop:''},
  {title:'创建日期',prop:'',type:'time'},
  {title:'采购员ID',prop:''},
  {title:'采购员',prop:''},
  {title:'审核人',prop:''},
  {title:'审核日期',prop:''},
  {title:'入库仓库',prop:''},
]

export  const addPlanInfoConfig=[
  {title:'订单号',prop:'',},
  {title:'外部订单号',prop:'',},
  {title:'货主编号',prop:''},
  {title:'货主名称',prop:''},
  {title:'订单来源',prop:''},
  {title:'订货日',prop:''},
  {title:'到货预定日',prop:''},
  {title:'创建日期',prop:'',type:'time'},
  {title:'采购员ID',prop:''},
  {title:'采购员',prop:''},
  {title:'审核人',prop:''},
  {title:'审核日期',prop:''},
]

export const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'计划单号',prop:'planCode',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  // { label:'货主',prop:'ownerName'},
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
  { label:'合同编号',prop:'contractNo'},
  { label:'货主',prop:'ownerName'},
  { label:'供应商名称',prop:'providerName'},
  { label:'应入库数量',prop:''},
  { label:'已计划入库数量',prop:'',width:180},
  { label:'实际入库数量',prop:''},
  { label:'单据状态',prop:''},
  { label:'执行状态',prop:'',},
  { label:'制单人',},
  { label:'制单时间',},
  { label:'操作',fixed:'right',useLink:true,width:240},
 ]

 export const addtable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'客户商品编码',prop:''},
  { label:'客户商品名称',prop:''},
  { label:'客户商品分类',prop:''},
  { label:'规格',prop:''},
  { label:'型号',prop:''},
  { label:'数量',prop:'num',useEdit:true,width:100},
  { label:'进货价',prop:''},
  { label:'客户销价',prop:''},
  { label:'金额',prop:''},
]

export const printingTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'物料编号',prop:'',type:'code'},
  { label:'物料名称',prop:''},
  { label:'规格',prop:''},
  { label:'品牌',prop:''},
  { label:'单位',prop:''},
  { label:'订货数量',prop:''},
  { label:'含税进价',prop:''},
  { label:'订货金额',prop:''},
  { label:'备注',prop:''},
]


export const addPlanOrder_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'数量',prop:''},
  { label:'计划出库数量',prop:'num'},
  { label:'供应商编码',prop:''},
  { label:'供应商名称',prop:''},
  { label:'订货进价',prop:''},
  { label:'金额',prop:''},
  { label:'入库仓库',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:140}
]

export const alertTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'仓库编码',prop:''},
  { label:'仓库名称',prop:''},
  { label:'可用库存',prop:''},
  { label:'计划出库数量',prop:'num',useEdit:true,width:150},
]


