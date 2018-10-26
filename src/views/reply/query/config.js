export   const tableConfig=[
  { label:'回单号',fixed:true,prop:'signNo',width:'150px',link:'reply-newreceiptorder'},
  { label:'出库计划单号',prop:'outPlanCode',width:'150px' },
  { label:'回单状态',prop:'approveStatus',width:'80px',type:'getApproveStatusMap',useApi:true},
  { label:'货主',prop:'ownerName',width:'180px'},
  { label:'发货仓库',prop:'planWarehouseName',width:'180px'},
  { label:'签收人',prop:'signName',width:'150px'},
  { label:'附件',width:'180px',type:'files'},
  { label:'签收人电话',prop:'signTel',width:'100px'},
  { label:'签收日期',prop:'signCreateTime',type:'time',width:'150px'},
  { label:'制单人',prop:'createrName',width:'180px'},
  { label:'制单时间',prop:'gmtCreate',type:'time',width:'150px'},
  { label:'审核人',prop:'approveName',width:'150px'},
  { label:'审核时间',prop:'approveCreateTime',type:'time',width:'150px'},
  { label:'操作',fixed:'right',link:'reply-newreceiptorder',linkText:'查看'},
]

