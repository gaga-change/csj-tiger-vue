export  const carrierListConfig=[ 
  { label:'序号',type:'index',width:50},
  { label:'承运商编码',prop:'consoildatorCode'},
  { label:'承运商名称',prop:'consoildatorName'},
  { label:'承运商状态',prop:'consoildatorState',useApi:true,type:'getConsoildatorState'},
  { label:'联系人',prop:'linkUser'},
  { label:'联系电话',prop:'linkTel'},
  { label:'操作',fixed:'right',useLink:true,width:180},
]

export  const carrierDetailConfig=[ 
  { title:'承运商名称',prop:'consoildatorName'},
  { title:'承运商状态',prop:'consoildatorState',useApi:true,type:'getConsoildatorState'},
  { title:'结算区分',prop:'settlementWay',useApi:true,type:'getSettlementType'},
  { title:'联系电话',prop:'linkTel'},
  { title:'联系人',prop:'linkUser'},
  { title:'合作起始日期',prop:'cooperateStartDate',type:'tiem'},
  { title:'合同起始日期',prop:'contractStartDate',type:'tiem'},
  { title:'合同结束日期',prop:'contractEndDate',type:'tiem'},
  { title:'支付约定',prop:'payPromise'}
]