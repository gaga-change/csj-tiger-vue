export const tableConfig = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName', width: 120 },
  { label: '客户商品编码', prop: 'customerSkuCode' },
  { label: '客户商品名称', prop: 'customerSkuName' },
  { label: '客户商品分类', prop: 'customerSkuType' },
  { label: '规格', prop: 'skuFormat', },
  { label: '型号', prop: 'skuModel', },
  { label: '数量', prop: 'skuOutQty', },
  { label: '已出', prop: 'realOutQty', },
  { label: '客户销价', prop: 'outStorePrice', },
  { label: '金额', prop: 'planOutAmt', },
  { label: '备注', prop: 'remarkInfo', }
];

export const infoConfig = [
  { title: '业务单类型', prop: 'busiBillType', type: 'getBillType', useApi: true },
  { title: '在库区分', prop: 'saleType', type: 'getSaleType', useApi: true },
  { title: '业务单号', prop: 'billNo' },
  { title: '外部订单号', prop: 'busiBillNo' },
  { title: '货主编号', prop: 'ownerCode' },
  { title: '货主名称', prop: 'ownerName' },
  { title: '客户编码', prop: 'arrivalCode' },
  { title: '客户名称', prop: 'arrivalName' },
  { title: '客户地址', prop: 'arrivalAddress' },
  { title: '联系电话', prop: 'arrivalLinkTel' },
  { title: '到货预定日', prop: 'arrivalPreDate', type: 'time' },
  { title: '到货有效日', prop: 'arrivalEffectDate', type: 'time' },
  { title: '合同号', prop: 'contractNo' },
  { title: '发货要求', prop: 'sendOutRequire', type: 'sendOutRequireEnum', useLocalEnum: true },
  { title: '询价单号', prop: 'inquiryNo' },
  { title: '仓库', prop: 'warehouseCode', type: 'getWarehouse', useApi: true },
  { title: '订单来源', prop: 'fromSysCode' },
  { title: '备注', prop: 'remarkInfo', span: 12 },
]


export const indexTableConfig = [
  { label: '业务单号', fixed: true, prop: 'billNo', linkTo: '/outgoing/businessorder-detail', query: [{ key: 'id', value: 'id' }, { key: 'busiBillNo', value: 'busiBillNo' }], width: 160 },
  { label: '外部订单号', prop: 'busiBillNo', width: 120 },
  { label: '合同编号', prop: 'contractNo', width: 120 },
  { label: '货主', prop: 'ownerName', width: 180 },
  { label: '客户名称', prop: 'arrivalName', width: 180 },
  { label: '应出库数量', prop: 'planOutQty', width: 100 },
  { label: '应出库金额', prop: 'planOutAmt', width: 100 },
  { label: '已计划量', prop: 'planOutQtyForPlan', width: 100 },
  { label: '实际出库数量', prop: 'realOutQty', width: 100 },
  { label: '单据状态', prop: 'billStatus', type: 'outBillStatusEnum', useLocalEnum: true, width: 80 },
  { label: '执行状态', prop: 'billState', type: 'outBillStateEnum', useLocalEnum: true, width: 80 },
  { label: '计划状态', prop: 'planStatusText' },
  { label: '制单人', prop: 'busiBillCreater', width: 120 },
  { label: '制单时间', prop: 'busiBillCreateTime', type: 'time', width: 140 }
]


export const addtable_config = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName', width: 120 },
  { label: '客户商品编码', prop: 'customerSkuCode', width: 100 },
  { label: '客户商品名称', prop: 'customerSkuName', width: 120 },
  { label: '规格', prop: 'skuFormat', width: 120 },
  { label: '型号', prop: 'skuModel', width: 120 },
  { label: '数量', prop: 'planOutQty', useEdit: true, width: 120 },
  { label: '客户销价', prop: 'sellPrice', },
  { label: '备注', prop: 'remarkInfo', }
]

export const addPlanOrder_config = [
  { label: '序号', type: 'index', width: 50 },
  { label: '商品编码', prop: 'skuCode' },
  { label: '商品名称', prop: 'skuName' },
  { label: '规格', prop: 'skuFormat' },
  { label: '型号', prop: 'skuModel' },
  { label: '数量', prop: 'skuOutQty' },
  { label: '客户销价', prop: 'outStorePrice', className: 'Price' },
  { label: '计划出库数量', prop: 'planOutQty' },
  { label: '出库仓库', prop: 'warehouseName' },
  { label: '可用库存', prop: 'canUseSkuQty' },
  { label: '备注', prop: 'remarkInfo' },
  { label: '操作', fixed: 'right', width: 120 },
]

export const alertTable_config = [
  { label: '序号', type: 'index', width: 50 },
  { label: '仓库编码', prop: 'warehouseCode' },
  { label: '仓库名称', prop: 'warehouseName' },
  { label: '可用库存', prop: 'canUseSkuQty' },
  { label: '计划出库数量', prop: 'planOutQty', useEdit: true, width: 150 },
]


export const detail_planTableConfig = [
  { label: '计划单号', prop: 'planCode', fixed: true, linkTo: '/outgoing/plan-detail', query: [{ key: 'planCode', value: 'planCode' }], width: 150 },
  { label: '业务单号', prop: 'billNo', width: 160 },
  { label: '单据状态', prop: 'planState', type: 'warehousingPlanBillStatus', useLocalEnum: true, width: 80 },
  { label: '客户名称', prop: 'arrivalName' },
  { label: '货主', prop: 'ownerName' },
  { label: '计划出库仓库', prop: 'planWarehouseName', width: 130 },
  { label: '执行状态', prop: 'execStatus', type: 'getExecState', useApi: true, width: 80 },
  { label: '计划出库日期', prop: 'planOutTime', type: 'time', width: 140 }
]

export const detail_outGoingTableConfig = [
  { label: '出库单号', prop: 'warehouseExeCode', minWidth: 150 },
  { label: '业务单号', prop: 'billNo', minWidth: 170 },
  { label: '计划单号', prop: 'planCode', minWidth: 150, linkTo: '/outgoing/plan-detail', query: [{ key: 'planCode', value: 'planCode' }] },
  { label: '合同编号', prop: 'contractNo', minWidth: 120 },
  { label: '客户名称', prop: 'arrivalName' },
  { label: '货主', prop: 'ownerName' },
  { label: '出库仓库名称', prop: 'warehouseName', minWidth: 180 },
  { label: '出库数量', prop: 'outQty' },
  { label: '出库金额', prop: 'outAmt' },
  { label: '是否越库', prop: 'isCross', width: 100, type: 'Boolean', },
  { label: '业务板块', prop: 'busiPlate', width: 100, useLocalEnum: true, type: 'busiPlateConfig' },
  { label: '出库日期', prop: 'outStoreTime', type: 'time', minWidth: 140 },
]
