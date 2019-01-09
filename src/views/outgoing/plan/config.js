export const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'已出/应出',fixed:false,dom:(row, column, cellValue, index)=>{
      return `${row.realOutQty}/${row.planOutQty}(${row.skuUnitName})`
  }},
];

export  const infoConfig=[
  {title:'计划单号',prop:'planCode'},
  {title:'业务单号',prop:'busiBillNo',useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  {title:'出库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'计划人',prop:'planName'},
  {title:'计划仓库',prop:'planWarehouseName'},
  {title:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true},
  {title:'计划制定时间',prop:'planTime',type:'time'},
  {title:'客户编号',prop:'arrivalCode'},
  {title:'客户名称',prop:'arrivalName'},
  {title:'联系电话',prop:'arrivalLinkTel'},
  {title:'客户地址',prop:'arrivalAddress'},
]

export const outgoingTableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'出库单号',prop:'warehouseExeCode',linkTo:'/outgoing/quiry-detail',query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'货主',prop:'ownerName'},
  { label:'出库仓库名称',prop:'warehouseName'},
  { label:'出库仓库编号',prop:'warehouseCode'},
  { label:'是否越库',prop:'isCross',type:'Boolean',},
  { label:'出库日期',prop:'outStoreTime',type:'time'},
]


export const indexTableConfig=[
  { label:'计划单号',prop:'planCode',fixed:true,linkTo:'/outgoing/plan-detail',query:[{key:'planCode',value:'planCode'}] },
  { label:'业务单号',prop:'busiBillNo',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  { label:'客户名称',prop:'arrivalName'},
  { label:'货主',prop:'ownerName'},
  { label:'计划出库仓库',prop:'planWarehouseName'},
  { label:'执行状态',prop:'execStatus',type:'outbusibillstate',useApi:true,},
  { label:'计划出库日期',prop:'planOutTime',type:'time'},
  { label:'操作',fixed:'right',useLink:true,minWidth:120},
]

//手工出库页面基本配置
//出库计划
export  const manualBaseInfoConfigLeft=[
  {title:'业务单号',prop:'busiBillNo',span:12,useIf:'link',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}] },
  {title:'总明细数',prop:'itemCount',span:12},
  {title:'已匹配',prop:'matchCount',span:12},
  {title:'未匹配',prop:'notMatchCount',span:12},
]

//table配置
export const manualBaseInfoTableConfig=[
  { label:'业务单号',prop:'busiBillNo',linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}]},
  { label:'供应商名称',prop:'providerName'},
  { label:'制单时间',prop:'gmtCreate',type:'time'},
]

//出库匹配详情配置
export const matchingTableConfig=[
  { label:'编号',prop:'skuCode',fixed:true,linkTo:'/inventory/quiry-detail',query:[{key:'warehouseCode',value:'warehouseCode'},{key:'skuCode',value:'skuCode'}]},
  { label:'名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'单位',prop:'skuUnitName'},
  { label:'计划出库数量',prop:'planOutQty'},
  { label:'对应采购单号',prop:'matchPurNo',minWidth:120,linkTo:'/warehousing/businessorder-detail',query:[{key:'busiBillNo',value:'matchPurNo'}]},
  { label:'对应编码',prop:'matchSkuCode',linkTo:'/inventory/quiry-detail',query:[{key:'warehouseCode',value:'warehouseCode'},{key:'skuCode',value:'matchSkuCode'}]},
  { label:'对应名称',prop:'matchSkuName'},
  { label:'对应规格',prop:'matchSkuFormat'},
  { label:'对应单位',prop:'matchSkuUnitName'},
  { label:'已入/计划',fixed:false,dom:(row, column, cellValue, index)=>{
    if(row.realInQty!==null&&!isNaN(row.realInQty)&&row.planInQty!==null&&!isNaN(row.planInQty)){
       return `${row.realInQty}/${row.planInQty}(${row.skuUnitName})`
    } else{
       return ''
    }
    
  }},
  { label:'操作',prop:'',fixed:'right',useLink:true},
]


//出库商品弹框配置左
export  const alertTopConfig=[
  {title:'名称',prop:'skuName',span:12},
  {title:'编号',prop:'skuCode',span:12},
  {title:'规格',prop:'skuFormat',span:12},
  {title:'计划数量',prop:'planOutQty',span:12},
]


//出库商品弹框配置右
export  const alertBottomConfig=[
  {title:'名称',prop:'matchSkuName',span:12},
  {title:'编号',prop:'matchSkuCode',span:12},
  {title:'规格',prop:'matchSkuFormat',span:12},
  {title:'计划采购量',prop:'planInQty',span:12},
  {title:'入库量',prop:'realInQty',span:12},
]


//采购单明细片配置
export  const detailsConfig=[
  {label:'单号',prop:'purcticketno',},
  {label:'商品编号',prop:'skuCode',},
  {label:'商品名称',prop:'skuName',},
  {label:'规格',prop:'skuFormat',},
  {label:'单位',prop:'skuUnit',},
  {label:'采购数量',prop:'planInQty',},
  {label:'入库数量',prop:'realInQty',},
  {label:'是否匹配',useIcon:true,width:100,align:'center'},
]

