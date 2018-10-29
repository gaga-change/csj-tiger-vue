export   const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'商品分类',prop:'skuCategoryno'},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'品牌名',prop:'skuBrandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'入库单价',prop:'inPrice'},
  { label:'入库数量',prop:'inStoreQty'},
];


export   const infoConfig=[
  {title:'入库单号',prop:'warehouseExeCode'},
  {title:'入库日期',prop:'inWarehouseTime',type:'time'},
  {title:'计划单号',prop:'planCode'},
  {title:'入库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'业务单号',prop:'busiBillNo'},
  {title:'供应商编号',prop:'providerCode'},
  {title:'供应商名称',prop:'providerName'},
  {title:'联系电话',prop:'providerLinkTel'},
]

export   const indexTableConfig=[
  { label:'入库单号',fixed:true,prop:'warehouseExeCode',link:'/warehousing/quiry-detail'},
  { label:'业务单号',prop:'busiBillNo' },
  { label:'供应商名称',prop:'warehouseName' },
  { label:'供应商编号',prop:'warehouseCode' },
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode'},
  { label:'仓库',prop:'warehouseName'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time'},
  { label:'操作',fixed:'right',link:'/warehousing/quiry-detail',linkText:'查看'},
]

