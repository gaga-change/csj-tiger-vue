export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'数量',prop:'skuInQty'},
  { label:'已入',prop:'realInQty'},
  { label:'供应商商品编码',prop:'customerSkuCode'},
  { label:'供应商商品名称',prop:'customerSkuName'},
  { label:'订货进价',prop:'inPrice'},
  { label:'金额',prop:'planInAmt'},
];

export  const infoConfig=[
  {title:'业务单号',prop:'billNo',},
  {title:'外部订单号',prop:'busiBillNo',},
  {title:'货主编号',prop:'ownerCode'},
  {title:'货主名称',prop:'ownerName'},
  {title:'订单来源',prop:'fromSystemId'},
  {title:'合同号',prop:'contractNo'},
  {title:'供应商编码',prop:'providerCode'},
  {title:'供应商名称',prop:'providerName'},
  {title:'仓库',prop:'warehouseCode', type:'getWarehouse', useApi:true},
  {title:'预计到货日期',prop:'planInWarehouseTime',type:'time'},
  {title:'订单有效期',prop:'orderTime',type:'time'},
  {title:'创建日期',prop:'gmtCreate',type:'time'},
  {title:'审核人',prop:'auditName'},
  {title:'审核日期',prop:'auditDate',type:'time'},
  {title:'单据状态',prop:'billStatus',type:'misWarehousingBillStatusEnum',useLocalEnum:true},
]

export  const addPlanInfoConfig=[
  {title:'订单号',prop:'billNo',},
  {title:'外部订单号',prop:'busiBillNo',},
  {title:'货主编号',prop:'ownerCode'},
  {title:'货主名称',prop:'ownerName'},
  {title:'订单来源',prop:'fromSystemId'},
  {title:'预计到货日期',prop:'planInWarehouseTime',type:'time'},
  {title:'订单有效期',prop:'orderTime',type:'time'},
  {title:'审核人',prop:'auditName'},
]

export const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'计划单号',prop:'planCode',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
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
  { label:'执行状态',prop:'execStatus',type:'getExecState',useApi:true},
  { label:'制定时间',prop:'gmtCreate',type:'time'},
  { label:'计划入库日期',prop:'planTime',type:'time'},
]

export const indexTableConfig=[
  { label:'业务单号',fixed:true,prop:'billNo',width:180,linkTo:'/warehousing/businessorder-detail',query:[{key:'id',value:'id'}] },
  { label:'合同编号',prop:'contractNo',width:120},
  { label:'货主',prop:'ownerName',width:180},
  { label:'供应商名称',prop:'providerName',width:180},
  { label:'应入库数量',prop:'planInQty',width:120},
  { label:'已计划入库数量',prop:'planInQtyForPlan',width:130},
  { label:'实际入库数量',prop:'realInQty',width:120},
  { label:'单据状态',prop:'billStatus',type:'misWarehousingBillStatusEnum',useLocalEnum:true},
  { label:'执行状态',prop:'billState',type:'misWarehousingBillStateEnum',useLocalEnum:true},
  { label:'制单人',prop:'createrName'},
  { label:'制单时间',prop:'gmtCreate',type:'time',width:140},
  { label:'操作',fixed:'right',useLink:true,width:280},
 ]

 export const addtable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'数量',prop:'planInQty',useEdit:true,width:180},
  { label:'商品供应商编码',prop:'providerSkuCode'},
  { label:'商品供应商名称',prop:'providerSkuName'},
  { label:'进货价',prop:'purchasePrice'}
]

export const printingTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'物料编号',prop:'skuCode',type:'code'},
  { label:'物料名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'订货数量',prop:'planInQty'},
  { label:'含税进价',prop:'inPrice'}
]


export const addPlanOrder_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode',width:100},
  { label:'商品名称',prop:'skuName'},
  { label:'数量',prop:'skuInQty',width:100},
  { label:'计划入库数量',prop:'planInQty'},
  { label:'商品供应商编码',prop:'customerSkuCode'},
  { label:'商品供应商名称',prop:'customerSkuName'},
  { label:'订货进价',prop:'inPrice'},
  { label:'金额',prop:'planInAmt'},
  { label:'入库仓库',prop:'warehouseName',width:150},
  { label:'操作',fixed:'right',useLink:true,width:140}
]

export const alertTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'仓库编码',prop:'warehouseCode'},
  { label:'仓库名称',prop:'warehouseName'},
  { label:'计划入库数量',prop:'planInQty',useEdit:true,width:150},
]

export   const detail_planTableConfig=[
  { label:'计划单号',prop:'planCode',width:150,fixed:true,linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'业务单号',prop:'billNo',width:170},
  { label:'单据状态',prop:'planState', type:'warehousingPlanBillStatus',useLocalEnum:true,width:80},
  { label:'供应商名称',prop:'providerName',width:180},
  { label:'货主',prop:'ownerName',width:180},
  { label:'制单人',prop:'createrName'},
  { label:'计划入库仓库',prop:'planWarehouseName'},
  { label:'执行状态',width:80,prop:'execStatus',type:'getExecState',useApi:true},
  { label:'计划入库日期',prop:'planTime',type:'time',width:140}
]

export   const detail_warehousingTableConfig=[
  { label:'入库单号',fixed:true,prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',width:150,query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'业务单号',prop:'billNo',width:180 },
  { label:'计划单号',prop:'planCode',width:150,linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'合同编号',prop:'contractNo',width:100},
  { label:'供应商名称',prop:'providerName',width:180},
  { label:'货主',prop:'ownerName',width:180},
  { label:'仓库',prop:'warehouseName',width:140},
  { label:'入库金额',prop:'inAmt'},
  { label:'入库数量',prop:'inQty'},
  { label:'业务板块',prop:'busiPlate',width:100,useLocalEnum:true,type:'busiPlateConfig'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time',width:140},
]
