export  const carrierListConfig=[
  { label:'序号',type:'index',width:50},
  { label:'承运商编码',prop:'consoildatorCode'},
  { label:'承运商名称',prop:'consoildatorName'},
  { label:'承运商状态',prop:'consoildatorState',useApi:true,type:'getConsoildatorState'},
  { label:'联系人',prop:'linkUser'},
  { label:'联系电话',prop:'linkTel'},
  { label:'操作',fixed:'right',useLink:true,width:220},
]

export  const carrierDetailConfig=[
  { title:'承运商名称',prop:'consoildatorName'},
  { title:'承运商状态',prop:'consoildatorState',useApi:true,type:'getConsoildatorState'},
  { title: '配送类型', prop: 'dispatchType', useLocalEnum: true, type: 'dispatchType'},
  { title:'结算区分',prop:'settlementWay',useApi:true,type:'getSettlementType'},
  { title:'联系电话',prop:'linkTel'},
  { title:'联系人',prop:'linkUser'},
  { title:'合作起始日期',prop:'cooperateStartDate',type:'time'},
  { title:'合同起始日期',prop:'contractStartDate',type:'time'},
  { title:'合同结束日期',prop:'contractEndDate',type:'time'},
  { title:'支付约定',prop:'payPromise'}
]

export  const quationListConfig=[
  { label:'序号',type:'index',width:50},
  { label:'货主',prop:'ownerName'},
  { label:'创建日期',prop:'gmtCreate',type:'time'},
  { label:'创建人',prop:'createrName'},
  { label:'操作',fixed:'right',useLink:true,width:220}
]

export  const quationTemConfig=[
  { label:'序号',type:'index',width:50},
  { label:'模板名称',prop:'templateName'},
  { label:'承运商',prop:'consoildatorName'},
  { label:'运输种类',prop:'templateType',apiEnum:'getTemplateTransport'},
  { label:'出发地',prop:'startPlace',width:150},
  { label:'目的地',prop:'endPlaseList',width:150},
  { label:'重货计费规则',prop:'heavyRulesList',width:220},
  { label:'轻货计费规则',prop:'lightRulesList',width:220}
]