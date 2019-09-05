
export const serviceChargePickSearchConfig = [
  { label: '货主', prop: 'ownerCode', type: 'selectMap', mapKey: 'ownerInfoMap' },
  { label: '结算日期', prop: 'settlementDate', props: ['settlementDateStart', 'settlementDateEnd'], type: 'dateRange' },
  { label: '创建日期', prop: 'gmtCreate', props: ['gmtCreateStart', 'gmtCreateEnd'], type: 'dateTimeRange' },
]

export const serviceChargePickTableConfig = [
  { label: '单号', prop: 'chargeBillNo', width:120 },
  { label: '货主编码', prop: 'ownerCode', width:120 },
  { label: '货主', prop: 'ownerName', width:120 },
  { label: '是否有原始单据', prop: 'isHasOrder', type: 'isHasOrderEnum', useLocalEnum: true, width:120 },
  { label: '费用区分', prop: 'expenseName', width:120 },
  { label: '外部订单号', prop: 'busiBillNo', width:120 },
  { label: '物流单号', prop: 'logisticsOrderCode', width:120 },
  { label: '承运商编码', prop: 'consoildatorCode', width:120 },
  { label: '地址', prop: 'dispatchAddr', width:120 },
  { label: '客户编码', prop: 'customerCode', width:120 },
  { label: '结算日期', prop: 'settlementDate', type: 'time', format: 'YYYY-MM-DD', width:120 },
  { label: '费用', prop: 'ownerName', width:120 },
  { label: '结算方式', prop: 'settlementType', type: 'settlementType2', useLocalEnum: true,width:120 },
  { label: '创建日期', prop: 'gmtCreate', type: 'time', format: 'YYYY-MM-DD', width:120 },
  { label: '备注', prop: 'remarkInfo', width:120 },
]

export const serviceChargePickFormTableConfig = [
  { label: '款项名称', prop: 'expenseName' },
  { label: '金额', prop: 'expenseAmt' },
]