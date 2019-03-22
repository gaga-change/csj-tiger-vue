export  const shipperList_config=[ 
  { label:'序号',type:'index',width:50},
  { label:'货主编码',prop:''},
  { label:'货主名称',prop:''},
  { label:'启用/禁用',prop:''},
  { label:'创建日期',prop:''},
  { label:'创建者',prop:''},
  { label:'最后操作日期',prop:''},
  { label:'最后操作者',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:180},
]

export  const warehouseList_config=[ 
  { label:'序号',type:'index',width:50},
  { label:'仓库名称',prop:''},
  { label:'仓库编码',prop:''},
]


export  const selectionShipper_config=[
  { label:'',type:'index',columnType:'selection'},
  { label:'序号',type:'index',width:50},
  { label:'仓库名称',prop:''},
  { label:'仓库编码',prop:''},
]