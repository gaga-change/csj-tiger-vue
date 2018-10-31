export   const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'规格',prop:'skuFormat',},
  { label:'单位',prop:'skuUnitName'},
  { label:'单价',prop:'skuPrice'},
  { label:'转换率',prop:'skuUnitConvert'},
  { label:'签收数量',prop:'signQty'},
  { label:'拒收数量',prop:'rejectQty'},
];


export   const infoConfig=[
  {title:'回单号',prop:'signNo',useIf:'linkDom',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'signNo'}],linkText:'查看入库详情'},
  {title:'出库计划单号',prop:'outPlanCode',useIf:'link',linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'outPlanCode'}]},
  {title:'客户名称',prop:'arrivalName'},
  {title:'货主',prop:'ownerName'},
  {title:'发货仓库',prop:'planWarehouseName'},
  {title:'签收人',prop:'signName'},
  {title:'签收人电话',prop:'signTel'},
  {title:'签收日期',prop:'signCreateTime', type:'time'},
  {title:'审核人',prop:'approveName'},
  {title:'审核日期',prop:'approveCreateTime', type:'time'},
  {title:'附件',prop:'files',useIf:'files'},
];
