export const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'商品分类',prop:'skuCskuCategoryno'},
  { label:'品牌名',prop:'skuBrandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'出库单价',prop:'skuOutPrice'},
  { label:'出库数量',prop:'outStoreQty'},
];

export  const infoConfig=[
  {title:'出库单号',prop:'warehouseExeCode',},
  {title:'业务单号',prop:'busiBillNo',useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  {title:'计划单号',prop:'planCode' },
  {title:'出库日期',prop:'outStoreTime',type:'time'},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]

export const indexTableConfig=[
  { label:'出库单号',prop:'warehouseExeCode',fixed:true,linkTo:'/outgoing/quiry-detail',query:[{key:'id',value:'id'}]},
  { label:'业务单号',prop:'busiBillNo' },
  { label:'计划单号',prop:'planCode'},
  { label:'客户名称',prop:'arrivalName'},
  { label:'货主',prop:'ownerName'},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'},
  { label:'操作',fixed:'right',linkTo:'/outgoing/quiry-detail',query:[{key:'id',value:'id'}],linkText:'查看' },
]
