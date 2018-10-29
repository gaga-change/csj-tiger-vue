export   const tableConfig=[
  { label:'回单号',fixed:true,prop:'signNo',width:'150px',linkTo:'/reply/newreceiptorder-detail',query:[{key:'id',value:'id'},{key:'approveStatus',value:'approveStatus'},]},
  { label:'出库计划单号',prop:'outPlanCode',width:'150px' },
  { label:'客户',prop:'',width:'150px'},
  { label:'货主',prop:'ownerName',width:'180px'},
  { label:'发货仓库',prop:'planWarehouseName',width:'180px'},
  { label:'签收人',prop:'signName',width:'150px'},
  { label:'单据状态',prop:'approveStatus',width:'80px',type:'getApproveStatusMap',useApi:true},
  { label:'附件',width:'90px',type:'files'},
  { label:'签收人电话',prop:'signTel',width:'100px'},
  { label:'签收日期',prop:'signCreateTime',type:'time',width:'150px'},
  { label:'操作',fixed:'right',link:'/reply/newreceiptorder-detail',linkText:'查看'},
]

