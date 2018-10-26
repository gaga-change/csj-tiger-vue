export   const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'客户编号',prop:'customerCode',fixed:false,},
  { label:'客户名称',prop:'customerName',fixed:false,},
  { label:'联系人',prop:'customerLinkUser',fixed:false},
  { label:'联系电话',prop:'customerLinkuserTel',fixed:false,},
  { label:'主营品种说明',prop:'mainSkuName',fixed:false,},
];

export  const infoConfig=[
  {title:'仓库名称',prop:'warehouseName'},
  {title:'开通日期',prop:'warehouseOpenDate',type:'time'},
  {title:'仓库类型',prop:'warehouseType',type:'getWarehouseType',useApi:true},
  {title:'负责人',prop:'warehouseLinkName'},
  {title:'联系电话',prop:'linkTel'},
  {title:'仓库地址',prop:'warehouseAddress'},
]
export const indexTableConfig=[
  { label:'仓库编号',prop:'warehouseNo',link:'businessset-customerconfiguration'},
  { label:'仓库名称',prop:'warehouseName'},
  { label:'所在省/市',fixed:false,dom:(row, column, cellValue, index)=>{
    return `${row.warehouseProvince||''} ${row.warehouseCity||''}`
 }},
  { label:'仓库类型',prop:'warehouseType',type:'getWarehouseType',useApi:true},
  { label:'负责人',prop:'warehouseLinkName',},
  { label:'联系电话',prop:'linkTel',},
  { label:'操作',link:'businessset-customerconfiguration',linkText:'查看'},
 ]