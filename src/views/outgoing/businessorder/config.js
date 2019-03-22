export  const tableConfig=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:'skuCode'},
  { label:'商品名称',prop:'skuName',width:120},
  { label:'客户商品编码',prop:''},
  { label:'客户商品名称',prop:''},
  { label:'客户商品分类',prop:''},
  { label:'客户商品分类',prop:''},
  { label:'规格',prop:'',},
  { label:'型号',prop:'',},
  { label:'数量',prop:'',},
  { label:'进货价',prop:'',},
  { label:'客户询价',prop:'',},
  { label:'金额',prop:'',}
];

export const infoConfig=[
  {title:'业务单类型',prop:''},
  {title:'业务单号',prop:'busiBillNo'},
  {title:'外部订单号',prop:''},
  {title:'货主编号',prop:''},
  {title:'货主名称',prop:''},
  {title:'客户编码',prop:''},
  { title:'客户名称',prop:''},
  { title:'客户地址',prop:''},
  {title:'联系电话',prop:''},
  {title:'到货预定日',prop:'',type:'time'},
  {title:'到货有效日',prop:'',type:'time'},
  {title:'创建人',prop:''},
  {title:'创建日期',prop:''},
  {title:'合同号',prop:''},
  {title:'发货要求',prop:''},
  {title:'询价单号',prop:''},
  {title:'订单来源',prop:''},
]


export const indexTableConfig=[
  { label:'业务单号',fixed:true,prop:'busiBillNo',linkTo:'/outgoing/businessorder-detail',query:[{key:'busiBillNo',value:'busiBillNo'}],width:140},
  { label:'合同编号',prop:'contractNo'},
  { label:'货主',prop:'ownerName'},
  { label:'客户名称',prop:'arrivalName'},
  { label:'计划出库数量',prop:''},
  { label:'计划出库金额',prop:''},
  { label:'实际出库数量',prop:''},
  { label:'单据状态',prop:''},
  { label:'执行状态',prop:''},
  { label:'制单人',prop:'busiBillCreater'},
  { label:'制单时间',prop:'busiBillCreateTime',type:'time'},
  { label:'操作',fixed:'right',useLink:true,width:140}
]


export const addtable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'客户商品编码',prop:''},
  { label:'客户商品名称',prop:''},
  { label:'客户商品分类',prop:''},
  { label:'规格',prop:''},
  { label:'型号',prop:''},
  { label:'数量',prop:'num',useEdit:true,width:100},
  { label:'进货价',prop:''},
  { label:'客户销价',prop:''},
  { label:'金额',prop:''},
]

export const addPlanOrder_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'规格',prop:''},
  { label:'型号',prop:''},
  { label:'数量',prop:''},
  { label:'客户销价',prop:''},
  { label:'金额',prop:''},
  { label:'计划出库数量',prop:'num'},
  { label:'出库仓库',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:140}
]

export const alertTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'仓库编码',prop:''},
  { label:'仓库名称',prop:''},
  { label:'可用库存',prop:''},
  { label:'计划出库数量',prop:'num',useEdit:true,width:150},
]

export const printingTable_config=[
  { label:'序号',type:'index',width:50},
  { label:'商品编码',prop:''},
  { label:'商品名称',prop:''},
  { label:'规格',prop:''},
  { label:'型号',prop:''},
  { label:'单位',prop:''},
  { label:'发货数量',prop:''},
  { label:'备注',prop:''},
]
