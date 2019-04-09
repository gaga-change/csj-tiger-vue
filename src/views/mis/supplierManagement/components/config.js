export  const supplierTbale_config=[ 
  { label:'供应商编码',prop:'providerCode'},
  { label:'供应商名称',prop:'providerName'},
  { label:'供应商状态',prop:'providerState',useApi:true,type:'getEnterpriseState'},
  { label:'供应商等级',prop:'providerLevel',useApi:true,type:'getEnterpriseLevel'},
  { label:'供应商联系人',prop:'providerLinkUser'},
  { label:'供应商联系人电话',prop:'providerLinkuserTel'},
  { label:'操作',fixed:'right',useLink:true,width:280},
]

export  const address_config=[ 
  { label:'序号',type:'index',width:50},
  { label:'地址性质',prop:'addrNature',useApi:true,type:'getAddrNature'},
  { label:'地址',prop:'providerAddress'},
  { label:'联系人',prop:'receiverName'},
  { label:'联系电话',prop:'receiverTel'},
  { label:'邮政编码',prop:'postalCode'},
  { label:'操作',fixed:'right',useLink:true,width:120},
]