export   const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'SKU名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'入库单价',prop:'inPrice',type:'toFixed'},

  { label:'已入/总数(单位)',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realInQty&&Math.round(row.realInQty)}/${row.planInQty&&Math.round(row.planInQty)}(${row.skuUnitName})`
  }},

  { label:'还应入',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.planInQty-row.realInQty}(${row.skuUnitName})`
  }},
 
];


export   const infoConfig=[
  {title:'计划单号',prop:'planCode'},
  {title:'入库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'业务单号',prop:'busiBillNo'},
  {title:'计划制定时间',prop:'busiBillCreaterTime',type:'time'},
  {title:'计划人',prop:'busiBillCreater'},
  {title:'计划仓库',prop:'planWarehouseName'},
  {title:'货主编号',prop:'ownerCode'},
  {title:'货主名称',prop:'ownerName'},
  {title:'供应商名称',prop:'providerName'},
  {title:'供应商编号',prop:'providerCode'},
  {title:'联系电话',prop:'linkTel'},
  {title:'下推状态',prop:'issuedState', type:'getIssuedState',useApi:true},
  {title:'执行状态',prop:'execStatus', type:'outbusibillstate',useApi:true},
];

export   const warehousingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'入库单号',prop:'warehouseExeCode'},
  { label:'业务单号',prop:'busiBillNo' },
  { label:'货主',prop:'ownerName'},
  { label:'计划单号',prop:'planCode'},
  { label:'仓库',prop:'warehouseName'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time'},
]

export   const indexTableConfig=[
  { label:'计划单号',prop:'planCode',width:'150',fixed:true,link:'/warehousing/plan-detail'},
  { label:'业务单号',prop:'busiBillNo',width:'150' },
  { label:'货主',prop:'ownerName',width:'180'},
  { label:'制单人',prop:'createrName',width:'180'},
  { label:'计划入库仓库',prop:'planWarehouseName',width:'180'},
  { label:'制定时间',prop:'gmtCreate',type:'time',width:'180'},
  { label:'计划入库日期',prop:'planTime',type:'time',width:'180'},
  { label:'下推状态',prop:'issuedState',width:'180'},
  { label:'执行状态',prop:'execStatus',width:'150'},
  { label:'操作',width:'150px',fixed:'right',link:'/warehousing/plan-detail',linkText:'查看' },
]