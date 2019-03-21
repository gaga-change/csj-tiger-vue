export  const supplierTbale_config=[ 
  { label:'供应商编码',prop:'id'},
  { label:'承运商名称',prop:''},
  { label:'承运商状态',prop:''},
  { label:'物联网管理区分',prop:''},
  { label:'单据状态',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:280},
]

export  const relationShipper_config=[ 
  { label:'序号',type:'index',width:50},
  { label:'货主编号',prop:''},
  { label:'货主名称',prop:''},
]

export  const selectionShipper_config=[ 
  { label:'',type:'index',columnType:'selection'},
  { label:'序号',type:'index',width:50},
  { label:'货主编号',prop:''},
  { label:'货主名称',prop:''},
]

export  const address_config=[ 
  { label:'序号',type:'index',width:50},
  { label:'地址性质',prop:''},
  { label:'地址',prop:''},
  { label:'联系人',prop:''},
  { label:'联系电话',prop:''},
  { label:'邮政编码',prop:''},
  { label:'操作',fixed:'right',useLink:true,width:120},
]