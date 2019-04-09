export  const storagepointListConfig=[ 
  { label:'序号',type:'index',width:50},
  { label:'仓配点编码',prop:'warehouseNo'},
  { label:'仓配点名称',prop:'warehouseName'},
  { label:'区域中心',prop:'regionalCenter',useApi:true,type:'getRegional'},
  { label:'启用状态',prop:'warehouseState',useLocalEnum:true,type:'warehouseStateEnum'},
  { label:'操作',fixed:'right',useLink:true,width:160},
]

export  const storagepointDetailConfig=[ 
  { title:'仓配点编码',prop:'warehouseNo',span:12},
  { title:'仓配点名称',prop:'warehouseName',span:12},
  { title:'区域中心',prop:'regionalCenter',useApi:true,type:'getRegional',span:12},
  { title:'启用状态',prop:'warehouseState',useLocalEnum:true,type:'warehouseStateEnum',span:12},
]