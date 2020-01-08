export  const storagepointListConfig=[
  { label:'序号',type:'index',width:50},
  { label:'仓配点编码',prop:'warehouseNo'},
  { label:'仓配点名称',prop:'warehouseName'},
  { label:'WMS',prop:'warehouseSysCode'},
  { label:'仓库类型',prop:'warehouseType',useApi:true,type:'getWarehouseType'},
  { label:'区域中心',prop:'regionalCenter',useApi:true,type:'getRegional'},
  { label:'启用状态',prop:'warehouseState',useLocalEnum:true,type:'warehouseStateEnum'},
  { label:'操作',fixed:'right',useLink:true,width:260},
]

export  const storagepointDetailConfig=[
  { title:'仓配点编码',prop:'warehouseNo',span:12},
  { title:'仓配点名称',prop:'warehouseName',span:12},
  { title:'WMS',prop:'warehouseSysCode',span:12},
  { title:'仓库类型',prop:'warehouseType',useApi:true,type:'getWarehouseType',span:12},
  { title:'区域中心',prop:'regionalCenter',useApi:true,type:'getRegional',span:12},
  { title:'接收人',prop:'warehouseLinkName',span:12},
  { title:'仓配点所在地区',prop:'area',span:12},
  { title:'详细地址',prop:'warehouseAddress',span:12},
  { title:'联系电话',prop:'linkTel',span:12},
  { title:'启用状态',prop:'warehouseState',useLocalEnum:true,type:'warehouseStateEnum',span:12},
]
