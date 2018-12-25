export  const listIndexConfig=[ //list页配置
    { label:'客户收货登记号',prop:'receiveCode',fixed:true,linkTo:'/provider/detail',query:[{key:'id',value:'id'},{key:'planCode',value:'planCode'}]},
    { label:'客户名称',prop:'receiveEnterprise',},
    { label:'出库计划单号',prop:'planCode',},
    { label:'销售合同号',prop:'contractNo',},
    { label:'供应商',prop:'providerName',},
    { label:'入库业务单',prop:'inBusiBillNo',},
    { label:'创建日期',prop:'gmtCreate',type:'time'},
    { label:'收货日期',prop:'receiveCreateTime',type:'time'},
    { label:'单据状态',prop:'receiveStatus',type:'getReceiveStatus',useApi:true},
    { label:'操作',useLink:true,fixed:'right',width:150},
  ]


  export  const detailBaseInfoConfig=[ //detail页基本信息配置
    { title:'收货企业',prop:'receiveEnterprise',},
    { title:'销售订单号',prop:'outBusiBillNo',},
    { title:'销售合同号',prop:'contractNo',},
    { title:'收货日期',prop:'receiveCreateTime',type:'time'},
    { title:'收货地址',prop:'receiveAddr',},
    { title:'收货人',prop:'receiveName',},
    { title:'联系电话',prop:'receiveTel',},
    { title:'附件',prop:'files',useIf:'files'},
    { title:'单据状态',prop:'receiveStatus',type:'getReceiveStatus',useApi:true},
   
  ]


  export  const detailTableConfig=[ //list页配置
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'品牌',prop:'skuBrandName',},
    { label:'计划出库量',prop:'planOutQty',},
    { label:'收货数量',dom:formatter('detailSum')},
  ]


  export  const addTableConfig=[ //登记页table配置
    { label:'序号',type:'index',width:50},
    { label:'商品编码',prop:'skuCode',},
    { label:'商品名称',prop:'skuName',},
    { label:'规格型号',prop:'skuFormat',},
    { label:'品牌',prop:'skuBrandName',},
    { label:'计划出库量',prop:'planOutQty',},
    { label:'本次收货数量',dom:formatter('sum')},
  ]

  export  const addChildTableConfig=[ //登记页子表配置
    { label:'序号',type:'bracketsIndex',width:50},
    { label:'供应商',prop:'providerName',},
    { label:'采购单',prop:'purchaseNo',},
    { label:'采购数量',prop:'purchaseQty',},
    { label:'客户已收数量',prop:'realInQty',},
    { label:'本次收货数量',prop:'receiveQty',useEdit:true,min:0,max:['purchaseQty','realInQty']},
  ]


  function formatter(type,isDetail){
    return (row, column, cellValue, index)=>{
      if(type==='sum'){
        if(row.billDetailList&&Array.isArray(row.billDetailList)){
            return row.billDetailList.reduce((a,b)=>{
              return a+(b.receiveQty||0);
            },0)
        }
      } else if(type==='detailSum'){
        if(row.detailVOList&&Array.isArray(row.detailVOList)){
          return row.detailVOList.reduce((a,b)=>{
            return a+(b.receiveQty||0);
          },0)
        }
      }
    }
  }
