export  const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName',width:120},
  { label:'客户商品编码',prop:'customerSkuCode'},
  { label:'客户商品名称',prop:'customerSkuName'},
  { label:'客户商品分类',prop:'customerSkuType'},
  { label:'规格',prop:'skuFormat',},
  { label:'型号',prop:'skuModel',},
  { label:'数量',prop:'skuOutQty',},
  { label:'客户销价',prop:'outStorePrice',},
  { label:'金额',prop:'planOutAmt',}
];

export const infoConfig=[
  {title:'业务单类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'业务单号',prop:'billNo'},
  {title:'外部订单号',prop:'busiBillNo'},
  {title:'货主编号',prop:'ownerCode'},
  {title:'货主名称',prop:'ownerName'},
  {title:'客户编码',prop:'arrivalCode'},
  { title:'客户名称',prop:'arrivalName'},
  { title:'客户地址',prop:'arrivalAddress'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'到货预定日',prop:'arrivalPreDate',type:'time'},
  {title:'到货有效日',prop:'arrivalEffectDate',type:'time'},
  {title:'创建人',prop:'createrName'},
  {title:'创建日期',prop:'gmtCreate'},
  {title:'合同号',prop:'contractNo'},
  {title:'发货要求',prop:'sendOutRequire',type:'sendOutRequireEnum',useLocalEnum:true},
  {title:'询价单号',prop:'inquiryNo'},
  {title:'订单来源',prop:'fromSysCode'},
]


export const indexTableConfig=[
  { label:'业务单号',fixed:true,prop:'billNo',linkTo:'/outgoing/businessorder-detail',query:[{key:'id',value:'id'},{key:'busiBillNo',value:'busiBillNo'}],width:160},
  { label:'合同编号',prop:'contractNo',width:120},
  { label:'货主',prop:'ownerName',width:180},
  { label:'客户名称',prop:'arrivalName',width:180},
  { label:'计划出库数量',prop:'planOutQty',width:100},
  { label:'计划出库金额',prop:'planOutAmt',width:100},
  { label:'实际出库数量',prop:'realOutQty',width:100},
  { label:'单据状态',prop:'billStatus',type:'outBillStatusEnum',useLocalEnum:true},
  { label:'执行状态',prop:'billState',type:'outBillStateEnum',useLocalEnum:true},
  { label:'制单人',prop:'busiBillCreater',width:180},
  { label:'制单时间',prop:'busiBillCreateTime',type:'time'},
  { label:'操作',fixed:'right',useLink:true,width:300},
]


export const addtable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName',width:120},
  { label:'客户商品编码',prop:'customerSkuCode',width:100},
  { label:'客户商品名称',prop:'customerSkuName',width:120},
  { label:'规格',prop:'skuFormat',width:120},
  { label:'型号',prop:'skuModel',width:120},
  { label:'数量',prop:'planOutQty',useEdit:true,width:120},
  { label:'客户销价',prop:'sellPrice',},
]

export const addPlanOrder_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'型号',prop:'skuModel'},
  { label:'数量',prop:'skuOutQty'},
  { label:'客户销价',prop:'outStorePrice',className:'Price'},
  { label:'计划出库数量',prop:'planOutQty'},
  { label:'出库仓库',prop:'warehouseName'},
  { label:'操作',fixed:'right',width:120},
]

export const alertTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'仓库编码',prop:'warehouseCode'},
  { label:'仓库名称',prop:'warehouseName'},
  { label:'可用库存',prop:'canUseSkuQty'},
  { label:'计划出库数量',prop:'planOutQty',useEdit:true,width:150},
]

