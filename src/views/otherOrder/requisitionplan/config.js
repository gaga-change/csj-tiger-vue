
export const indexTableConfig = [
  { label: '调拨单号', fixed: true, prop: 'transferNo', width: 160 },
  { label: '外部订单号', prop: 'busiBillNo', width: 160 },
  { label: '出库仓库', prop: 'outWarehouseName' },
  { label: '入库仓库', prop: 'inWarehouseName' },
  { label: '货主', prop: 'ownerName', width: 180 },
  { label: '单据状态', prop: 'transferStatus', type: 'transferBillStatusEnum', useLocalEnum: true, width: 100 },
  { label: '出库状态', prop: 'outStatus', type: 'outWarehouseStatus', useLocalEnum: true, width: 100 },
  { label: '入库状态', prop: 'inStatus', type: 'inWarehouseStatus', useLocalEnum: true, width: 100 },
  { label: '备注', prop: 'remarkInfo' },
  { label: '创建时间', prop: 'gmtCreate', type: 'time', width: 140 }
]


export const addtable_config = [
  { label: '序号', type: 'index', width: 50 },
  { label: '货主商品编码', prop: 'ownerSkuCode' },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '调拨数量', prop: 'transferQty', useEdit: true, width: 120 },
  { label: '备注', prop: 'remarkInfo' },
]



