//入库订正
export  const carrierListConfig=[ 
  { label:'订正类型',prop:'id'},
  { label:'业务单号',prop:''},
  { label:'货主编码',prop:''},
  { label:'货主名称',prop:''},
  { label:'入库单号',prop:''},
  { label:'订正单号',prop:''},
  { label:'单据状态',prop:''},
  { label:'创建日期',prop:''},
  { label:'审核日期',prop:''},
  { label:'审核人',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:180},
]


export  const carrierrecords_Config=[ 
  { label:'入库单号',prop:''},
  { label:'商品编号',prop:''},
  { label:'订正数量',prop:''},
  { label:'订正金额 ',prop:''},
  { label:'订正时间',prop:''},
  { label:'订正人 ',prop:''},
]

export  const carrierDetail_Config=[ 
  { label:'序号',prop:'',type:'index'},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'规格',prop:''},
  { label:'入库数量 ',prop:''},
  { label:'入库金额',prop:''},
  { label:'调整金额 ',prop:'调整金额',useEdit:true,width:150},
]




//出库订正
export  const outgoing_carrierListConfig=[ 
  { label:'订正类型',prop:'id'},
  { label:'业务单号',prop:''},
  { label:'出库单号',prop:''},
  { label:'订正单号',prop:''},
  { label:'单据状态',prop:''},
  { label:'创建日期',prop:''},
  { label:'审核日期',prop:''},
  { label:'审核人',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:180},
]

export  const outgoing_carrierrecordsConfig=[ 
  { label:'出库单号',prop:''},
  { label:'商品编号',prop:''},
  { label:'订正数量',prop:''},
  { label:'订正金额 ',prop:''},
  { label:'订正时间',prop:''},
  { label:'订正人 ',prop:''},
]

export  const outgoing_carrierDetailConfig=[ 
  { label:'序号',prop:'',type:'index'},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'规格',prop:''},
  { label:'出库数量 ',prop:''},
  { label:'出库金额',prop:''},
  { label:'调整金额 ',prop:'调整金额',useEdit:true,width:150},
]

