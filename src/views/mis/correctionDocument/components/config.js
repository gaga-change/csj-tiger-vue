//入库订正
export  const carrierListConfig=[
  { label:'订正类型',prop:'revisalType', useLocalEnum: true, type: 'misRevisalTypeEnum'},
  { label:'业务单号',prop:'busiBillNo',width:150},
  { label:'货主编码',prop:'ownerCode',width:150},
  { label:'货主名称',prop:'ownerName',width:180},
  { label:'入库单号',prop:'warehouseExeCode',width:170},
  { label:'订正单号',prop:'revisalCode',width:170},
  { label:'单据状态',prop:'revisalState', useLocalEnum:true, type:'misRevisalStateEnum'},
  { label:'创建日期',prop:'gmtCreate', type:'time',width:140},
  { label:'审核日期',prop:'approveDate',type:'time',width:140},
  { label:'审核人',prop:'approveName'},
  { label:'操作',fixed:'right',useLink:true,width:180},
]


export  const carrierrecords_Config=[
  { label:'入库单号',prop:'warehouseExeCode'},
  { label:'商品编号',prop:'skuCode'},
  { label:'订正数量',prop:'revisalQty'},
  { label:'订正金额 ',prop:'revisalAmt'},
  { label:'订正时间',prop:'revisalTime',type:'time',width:140},
  { label:'订正人 ',prop:'revisalByName'},
]

export  const carrierDetail_Config=[
  { label:'序号',prop:'',type:'index'},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'订正审核',prop:'isApproved',  useLocalEnum:true, type:'isApprovedEnum'},
  { label:'入库数量 ',prop:'inStoreQty'},
  { label:'入库金额',prop:'inStoreAmt'},
]




//出库订正
export  const outgoing_carrierListConfig=[
  { label:'订正类型',prop:'revisalType', useLocalEnum: true, type: 'misRevisalTypeEnum'},
  { label:'业务单号',prop:'busiBillNo',width:150},
  { label:'出库单号',prop:'warehouseExeCode',width:170},
  { label:'订正单号',prop:'revisalCode',width:170},
  { label:'单据状态',prop:'revisalState', useLocalEnum:true, type:'misRevisalStateEnum'},
  { label:'创建日期',prop:'gmtCreate', type: 'time',width:140},
  { label:'审核日期',prop:'approveDate', type: 'time',width:140},
  { label:'审核人',prop:'approveName'},
  { label:'操作',fixed:'right',useLink:true,width:180},
]

export  const outgoing_carrierrecordsConfig=[
  { label:'出库单号',prop:'warehouseExeCode'},
  { label:'商品编号',prop:'skuCode'},
  { label:'订正数量',prop:'revisalQty'},
  { label:'订正金额 ',prop:'revisalAmt'},
  { label:'订正时间',prop:'revisalTime',type:'time',width:140},
  { label:'订正人 ',prop:'revisalByName'},
]

export  const outgoing_carrierDetailConfig=[
  { label:'序号',prop:'',type:'index'},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName'},
  { label:'规格',prop:'skuFormat'},
  { label:'订正审核',prop:'isApproved',  useLocalEnum:true, type:'isApprovedEnum'},
  { label:'出库数量 ',prop:'outStoreQty'},
  { label:'出库金额',prop:'outStoreAmt'},
]
