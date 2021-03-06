export   const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'商品名称',prop:'skuName'},
  { label:'商品编码',prop:'skuCode'},
  { label:'规格型号',prop:'skuFormat'},
  { label:'品牌',prop:'skuBrandName'},
  { label:'单位',prop:'skuUnitName'},
  { label:'单价',prop:'inPrice'},
  { label:'生产厂家',prop:'productFactory'},
  { label:'入库数量',prop:'inStoreQty'},
  { label:'入库金额',prop:'inStoreAmt',dom:(row, column, cellValue, index)=>{
    let amount = row.inStoreAmt
    if (row.settleUnit ===2) {
      amount = row.inPrice * (row.inStoreWeight || 0)
    }
    return amount.toFixed(2)
  }},
];


export   const infoConfig=[
  {title:'入库单号',prop:'warehouseExeCode'},
  {title:'计划单号',prop:'planCode',useIf:'link',linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  {title:'业务单号',prop:'billNo'},
  {title:'外部订单号',prop:'busiBillNo'},
  {title:'入库日期',prop:'inWarehouseTime',type:'time'},
  { title:'入库金额合计',prop:'inAmt'},
  { title:'入库数量合计',prop:'inQty'},
  {title:'入库类型',prop:'busiBillType',type:'getBillType',useApi:true},
  {title:'供应商编号',prop:'providerCode'},
  {title:'供应商名称',prop:'providerName'},
  {title:'联系电话',prop:'providerLinkTel'},
]

export   const indexTableConfig=[
  { label:'入库单号',fixed:true,prop:'warehouseExeCode',linkTo:'/warehousing/quiry-detail',width:150,query:[{key:'warehouseExeCode',value:'warehouseExeCode'}]},
  { label:'WMS单号',prop:'warehouseUk',width:180 },
  { label:'业务单号',prop:'billNo',width:180 },
  { label:'外部订单号',prop:'busiBillNo',width:160},
  { label:'计划单号',prop:'planCode',width:150,linkTo:'/warehousing/plan-detail',query:[{key:'planCode',value:'planCode'}]},
  { label:'合同编号',prop:'contractNo',width:100},
  { label:'供应商名称',prop:'providerName',width:180},
  { label:'货主',prop:'ownerName',width:180},
  { label:'仓库',prop:'warehouseName',width:140},
  { label:'入库金额',prop:'inAmt'},
  { label:'入库数量',prop:'inQty'},
  { label:'业务板块',prop:'busiPlate',width:100,useLocalEnum:true,type:'busiPlateConfig'},
  { label:'入库日期',prop:'inWarehouseTime',type:'time',width:140},
  { label:'操作',width:140,fixed:'right',prop:'oprate'},
]
