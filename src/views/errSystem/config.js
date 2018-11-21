
export  const listIndexConfig=[
  { label:'id',prop:'id'},
  { label:'业务类型',prop:'busiType',},
  { label:'子类型',prop:'subType'},
  { label:'业务唯一编号',prop:'busiKey'},
  { label:'重试次数',prop:'resetCount'},
  { label:'成功标示',prop:'successFlag',useLocalEnum:true,type:'successFlag'},
  { label:'操作',useLink:true},
]


export  const listDetailConfig=[
  { title:'id',prop:'id'},
  { title:'业务类型',prop:'busiType',},
  { title:'子类型',prop:'subType'},
  { title:'业务唯一编号',prop:'busiKey'},
  { title:'重试次数',prop:'resetCount'},
  { title:'成功标示',prop:'successFlag',useLocalEnum:true,type:'successFlag'},
  { title:'记录时间',prop:'gmtCreate',type:'time'},
  { title:'入参',prop:'paramData',span:24,uesStringify:true,rows:4},
  { title:'结果',prop:'errorMes',span:24,uesStringify:true,rows:14},
]
