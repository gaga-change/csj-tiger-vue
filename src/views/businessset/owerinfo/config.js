export   const tableConfig=[
  { label:'序号',fixed:true,type:'index'},
  { label:'仓库编号',prop:'warehouseNo'},
  { label:'仓库名称',prop:'warehouseName'},
  { label:'仓库类型',prop:'warehouseType',type:'getWarehouseType',useApi:true},
  { label:'负责人',prop:'warehouseLinkUser'},
  { label:'联系电话',prop:'warehouseLinkUserTel'},
];

export   const infoConfig=[
  {title:'货主名称',prop:'ownerName'},
  {title:'负责人',prop:'ownerLinkUser'},
  {title:'联系电话',prop:'ownerLinkUserTel'},
  {title:'地址',prop:'ownerAddress'},
]

export   const indexTableConfig=[
  { label:'货主编号',prop:'ownerCode',linkTo:'/businessset/owerinfo-detail',query:[{key:'ownerCode',value:'ownerCode'}]},
  { label:'货主名称',prop:'ownerName'},
  { label:'所在省/市',prop:'ownerAddress'},
  { label:'负责人',prop:'ownerLinkUser',type:'time'},
  { label:'联系电话',prop:'ownerLinkUserTel',type:'boolean'},
  { label:'操作',linkTo:'/businessset/owerinfo-detail',query:[{key:'ownerCode',value:'ownerCode'}],linkText:'查看'},
 ]
