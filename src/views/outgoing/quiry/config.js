export const tableConfig=[
  { label:'序号',fixed:true,type:'index'},
  { label:'SKU名称',prop:'skuName',fixed:false,},
  { label:'规格型号',prop:'skuFormat',fixed:false,},
  { label:'生产厂家',prop:'productFactory',fixed:false,},
  { label:'商品分类',prop:'skuCskuCategoryno',fixed:false,},
  { label:'品牌名',prop:'skuBrandName',fixed:false,},
  { label:'单位',prop:'skuUnitName',fixed:false},
  { label:'转换比',prop:'skuUnitConvert',fixed:false},
  { label:'出库单价',prop:'skuOutPrice',fixed:false},
  { label:'出库数量',prop:'outStoreQty',fixed:false},
];

export  const infoConfig=[
  {title:'出库单号',prop:'warehouseExeCode',},
  {title:'出库日期',prop:'outStoreTime',type:'time'},
  {title:'计划单号',prop:'planCode'},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'业务单号',prop:'busiBillNo'},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]

export const indexTableConfig=[
  { label:'出库单号',prop:'warehouseExeCode',width:'180px',fixed:true,link:'/outgoing/quiry-detail'},
  { label:'业务单号',prop:'busiBillNo',width:'150px' },
  { label:'计划单号',prop:'planCode',width:'150px'},
  { label:'客户名称',prop:'arrivalName',width:'150px' },
  { label:'货主',prop:'ownerName',width:'180px'},
  { label:'出库仓库名称',prop:'warehouseName',width:'180px'},
  { label:'是否越库',prop:'isCross',width:'150px',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time',width:'160px'},
  { label:'操作',width:'150px',fixed:'right',link:'/outgoing/quiry-detail',linkText:'查看' },
]
