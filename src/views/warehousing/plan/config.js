export const tableConfig = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品', prop: 'skuName' },
  { label: '规格型号', prop: 'skuFormat' },
  { label: '品牌', prop: 'skuBrandName' },
  { label: '单价', prop: 'inPrice', type: 'toFixed' },
  {
    label: '已入/总数', fixed: false, dom: (row, column, cellValue, index) => {
      return `${Number(row.realInQty)}/${Number(row.planInQty)}(${row.skuUnitName})`
    }
  },

  {
    label: '还应入', fixed: false, dom: (row, column, cellValue, index) => {
      return `${(row.planInQty - row.realInQty).toFixed(2)}(${row.skuUnitName})`
    }
  },
  { label: '手工入库', prop: 'handInQty', useEdit: true, width: 160, max: ['planInQty', 'realInQty'], min: 0 },

];


export const infoConfig = [
  { title: '计划单号', prop: 'planCode' },
  { title: '业务单号', prop: 'billNo' },
  { title: '外部订单号', prop: 'busiBillNo' },
  { title: '入库类型', prop: 'busiBillType', type: 'billTypeTotal', useApi: true },
  { title: '计划人', prop: 'busiBillCreater' },
  { title: '计划仓库', prop: 'planWarehouseName' },
  { title: '计划制定时间', prop: 'busiBillCreaterTime', type: 'time' },
  { title: '货主编号', prop: 'ownerCode' },
  { title: '货主', prop: 'ownerName' },
  { title: '供应商名称', prop: 'providerName' },
  { title: '供应商编号', prop: 'providerCode' },
  { title: '联系电话', prop: 'linkTel' },
  { title: '下推状态', prop: 'issuedState', type: 'getIssuedState', useApi: true },
  { title: '执行状态', prop: 'execStatus', type: 'getExecState', useApi: true },
  { title: '在库区分', prop: 'saleType', type: 'getSaleType', useApi: true },
  { title: '预计到货日期', prop: 'planInWarehouseTime', type: 'time' },
  { title: '订单有效期', prop: 'orderTime', type: 'time' },
  { title: '备注', prop: 'remarkInfo' },
];

export const warehousingTableConfig = [
  { label: '序号', type: 'index', width: 50 },
  { label: '入库单号', prop: 'warehouseExeCode', linkTo: '/warehousing/quiry-detail', query: [{ key: 'warehouseExeCode', value: 'warehouseExeCode' }] },
  { label: 'WMS单号', prop: 'warehouseUk' },
  { label: '业务单号', prop: 'billNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '仓库', prop: 'warehouseName' },
  { label: '入库日期', prop: 'inWarehouseTime', type: 'time' },
]

export const indexTableConfig = [
  { label: '计划单号', prop: 'planCode', width: 150, fixed: true, linkTo: '/warehousing/plan-detail', query: [{ key: 'planCode', value: 'planCode' }] },
  { label: '业务单号', prop: 'billNo', width: 170 },
  { label: '外部订单号', prop: 'busiBillNo', width: 160 },
  { label: '单据状态', prop: 'planState', type: 'getPlanState', useApi: true, width: 80 },
  { label: '供应商名称', prop: 'providerName', width: 180 },
  { label: '货主', prop: 'ownerName', width: 180 },
  { label: '制单人', prop: 'createrName' },
  { label: '计划入库仓库', prop: 'planWarehouseName', width: 150 },
  { label: '执行状态', width: 80, prop: 'execStatus', type: 'getExecState', useApi: true },
  { label: '计划入库日期', prop: 'planTime', type: 'time', width: 140 },
]
