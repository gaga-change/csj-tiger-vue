export   const tableConfig=[
  { label:'序号',fixed:true,type:'index',width:50},
  { label:'变动日期',prop:'changeTime'},
  { label:'出入库类型',prop:'direcType',type:'getStockDirectType',useApi:true},
  { label:'业务类型',prop:'busiBillType',type:'getBillType',useApi:true},
  { label:'出入库方',prop:'warehouseName'},
  { label:'变动前数量',prop:'beforeQty'},
  { label:'变动数量',prop:'changeQty'},
  { label:'变动后数量',prop:'afterQty'},
  { label:'所属库存周期',prop:'pertainStoreCycle'},
];

export   const infoConfig=[
  {title:'商品名称',prop:'skuName'},
  {title:'商品规格',prop:'skuFormat'},
  {title:'品牌',prop:'brandName'},
  {title:'商品分类',prop:'skuType'},
  {title:'最小单位',prop:'skuUnitName'},
  {title:'最小单位转换比',prop:'skuUnitConvert'},
  {title:'库存成本价',prop:'costPrice'},
  {title:'仓库',prop:'warehouseName'},
  {title:'总数量',prop:'skuQty'},
  {title:'锁定数量',prop:'lockQty'},
]


export const indexTableConfig=[
  { label:'商品编号',prop:'skuCode',width:'150px',fixed:true,link:'/inventory/quiry-detail'},
  { label:'商品名称',prop:'skuName',width:'150px' },
  { label:'规格型号',prop:'skuFormat',width:'190px'},
  { label:'品牌',prop:'brandName',width:'150px'},
  { label:'单位',prop:'skuUnitName'},
  { label:'仓库名称',prop:'warehouseName',width:'180px'},
  { label:'转换比',prop:'skuUnitConvert'},
  { label:'成本价',prop:'costPrice'},
  { label:'总数量',prop:'skuQty'},
  { label:'锁定数量',prop:'lockQty'},
  { label:'操作',width:'150px',fixed:'right',link:'/inventory/quiry-detail',linkText:'查看' },
]


