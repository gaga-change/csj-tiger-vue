export   const tableConfig=[
  { label:'序号',fixed:true,type:'index'},
  { label:'商品编码',prop:'skuCode',fixed:false,},
  { label:'商品名称',prop:'skuName',fixed:false,},
  { label:'品牌',prop:'skuBrandName',fixed:false,},
  { label:'规格',prop:'skuFormat',fixed:false,},
  { label:'单位',prop:'skuUnitName',fixed:false,},
  { label:'单价',prop:'skuPrice',fixed:false},
  { label:'转换率',prop:'skuUnitConvert',fixed:false},
  { label:'签收数量',prop:'signQty',fixed:false},
  { label:'拒收数量',prop:'rejectQty',fixed:false},
];


export   const infoConfig=[
  {title:'回单号',prop:'signNo'},
  {title:'出库计划单号',prop:'outPlanCode'},
  {title:'货主',prop:'ownerName'},
  {title:'发货仓库',prop:'planWarehouseName'},
  {title:'签收人',prop:'signName'},
  {title:'签收人电话',prop:'signTel'},
  {title:'签收日期',prop:'signCreateTime', type:'time'},
  {title:'审核人',prop:'approveName'},
  {title:'审核日期',prop:'approveCreateTime', type:'time'},
  {title:'附件',prop:'files',useIf:'files'},
];
