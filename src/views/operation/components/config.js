export  const quationListConfig=[
  { label:'序号',type:'index',width:50},
  { label:'货主',prop:'ownerName'},
  { label:'标题',prop:'messageTitle'},
  { label:'内容',prop:'messageContent',type:'content'},
  { label:'创建日期',prop:'gmtCreate',type:'time'},
  { label:'附件',prop:'filePathList',type:'files'},
  { label:'操作',fixed:'right',useLink:true,width:220}
]
