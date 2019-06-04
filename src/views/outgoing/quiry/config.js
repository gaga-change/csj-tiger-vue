export const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50,prop:'index'},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'单价',prop:'skuOutPrice'},
  { label:'出库数量',prop:'outStoreQty'},
  { label:'出库金额',prop:'outStoreAmt',dom:(row, column, cellValue, index)=>{
    let amount = row.skuOutPrice
    if (row.settleUnit ===2) {
      amount = amount * (row.outStoreWeight || 0)
    }
    return amount.toFixed(2)
  }},
];

export  const infoConfig=[
  {title:'出库单号',prop:'warehouseExeCode',},
  {title:'业务单号',prop:'billNo'},
  {title:'计划单号',prop:'planCode',useIf:'link',linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}] },
  {title:'外部订单号',prop:'busiBillNo'},
  { title:'出库数量合计',prop:'outQty'},
  { title:'出库金额合计',prop:'outAmt'},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'出库日期',prop:'outStoreTime',type:'time'},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]

export const indexTableConfig=[
  { label:'出库单号',prop:'warehouseExeCode', minWidth:150,fixed:true,linkTo:'/outgoing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'业务单号',prop:'billNo',minWidth:170 },
  { label:'计划单号',prop:'planCode',minWidth:150,linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}] },
  { label:'外部订单号',prop:'busiBillNo',width:160},
  { label:'合同编号',prop:'contractNo',minWidth:120 },
  { label:'客户名称',prop:'arrivalName' ,width:180},
  { label:'货主',prop:'ownerName',width:180},
  { label:'出库仓库名称',prop:'warehouseName',minWidth:180 },
  { label:'出库数量',prop:'outQty'},
  { label:'出库金额',prop:'outAmt'},
  { label:'是否越库',prop:'isCross',width:100,type:'Boolean',},
  { label:'业务板块',prop:'busiPlate',width:100,useLocalEnum:true,type:'busiPlateConfig'},
  { label:'出库日期',prop:'outStoreTime',type:'time',minWidth:140 },
  { label:'操作', prop:'oprate',fixed:'right',width:140},
]

export const record_config=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'调整类型',prop:'improveReason'},
  { label:'业务单号',prop:'billNo'},
  { label:'调整人',prop:'createrName'},
  { label:'调整日期',prop:'gmtCreate',type:'time'}
]


export const recordDetailConfig=[
  {title:'调整原因',prop:'improveReason'},
  {title:'业务单类型',prop:'busiBillType'},
  {title:'业务单号',prop:'billNo'},
  {title:'外部订单号',prop:'busiBillNo'},
  {title:'货主',prop:'ownerName'},
  { title:'供应商',prop:'arrivalName'},
  { title:'供应商地址',prop:'arrivalAddress'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'创建人',prop:'createrName'},
  {title:'到货预定日',prop:'arrivalPreDate',type:'time'},
  {title:'到货有效日',prop:'arrivalEffectDate',type:'time'},
  {title:'创建日期',prop:'gmtCreate',type:'time'},
  {title:'合同号',prop:'contractNo'},
  {title:'发货要求',prop:'sendOutRequire',useLocalEnum:true,type:'sendOutRequireEnum'},
  {title:'订单来源',prop:'fromSysCode'},
]

export const recordDetailTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'客户商品编码',prop:'customerSkuCode'},
  { label:'客户商品名称',prop:'customerSkuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'型号',prop:'skuModel'},
  { label:'数量',prop:'skuOutQty'},
  { label:'客户销价',prop:'sellPrice',},
]

export const printingTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'型号',prop:'skuModel'},
  { label:'单位',prop:'skuUnitName'},
  { label:'发货数量',prop:'outStoreQty', useSum: true, toFixed: 0},
]
