import { dealNameValueToKeyValue } from '@/utils'
import { dispatchType, settlementType } from '@/utils/enum'
export const listIndexConfig = [
  {label: '配送单号',prop: 'dispatchNo', width: 120},
  { label: '物流单号', prop: 'logisticsOrderCode', width: 180},
  { label: '配送类型', prop: 'dispatchType', useLocalEnum: true, type: 'dispatchType'},
  { label: '承运商', prop: 'consoildatorName', width: 150 },
  { label: '运费区分', prop: 'costCalcWay', width: 150, useLocalEnum: true, type: 'costCalcWay' },
  { label: '客户名称', prop: 'customerName', width: 150 },
  { label: '客户地址', prop: 'dispatchAddr', width: 180 },
  { label: '配送状态', prop: 'dispatchState', useLocalEnum: true, type: 'dispatchState'},
  { label: '单据状态', prop: 'invoiceState', useLocalEnum: true, type: 'invoiceState', width: 120},
  { label: '制单人', prop: 'createrName' },
  { label: '制单时间', prop: 'gmtCreate', type: 'time', width: 160}
]
export const headConfig = [
  { label: '配送类型', prop: 'dispatchType', placeholder: '请选择配送类型', type: 'select',
    selectOptions: dealNameValueToKeyValue(dispatchType), disabled: true
  },
  { label: '结算方式', prop: 'settlementType', placeholder: '请选择结算方式', type: 'select',
    selectOptions: dealNameValueToKeyValue(settlementType), disabled: true
  },
  { label: '承运商编码', prop: 'consoildatorCode', disabled: true},
  { label: '承运商名称', prop: 'consoildatorName', disabled: true},
  { label: '物流单号', prop: 'logisticsOrderCode', disabled: true},
  { label: '客户编码', prop: 'customerCode', disabled: true},
  { label: '客户名称', prop: 'customerName', disabled: true},
  { label: '配送费', prop: 'dispatchCost', disabled: true}
]
export const subsituteConfig = [
  { label: '序号', type: 'index', width: 55 },
  { label: '款项名称', prop: 'expenseName'},
  { label: '款项性质', prop: 'expenseType', useLocalEnum: true, type: 'expenseType' },
  { label: '金额', prop: 'amountOfMoney'}
]

export const deliveryConfig = [
  { label: '序号', type: 'index', prop: 'index', width: 60 },
  { label: '业务单号', prop: 'busiBillNo', width:150 },
  { label: '计划单号', prop: 'planCode', width:150},
  { label: '出库单号', prop: 'warehouseExeCode', width:150},
  { label: '客户编码', prop: 'customerCode', width:150},
  { label: '客户名称', prop: 'customerName', width:150},
  { label: '地址', prop: 'dispatchAddr', width:180},
  { label: '物流公司', prop: 'consoildatorName', width:150},
  { label: '配送单号', prop: 'dispatchNo', width:150},
  { label: '物流单号', prop: 'logisticsOrderCode', width:150},
  { label: '出库日期', prop: 'outStoreTime', type: 'time', width:150},
  { label: '商品编码', prop: 'skuCode', width:150},
  { label: '规格', prop: 'skuFormat', width:220},
  { label: '单位', prop: 'skuUnitName'},
  { label: '出库数量', prop: 'outStoreQty'},
  { label: '出库金额', prop: 'outStoreAmt'}
]
