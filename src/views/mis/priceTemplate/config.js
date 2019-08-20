
export const serviceChargePickSearchConfig = [
  { label: '货主', prop: 'ownerCode', type: 'selectMap', mapKey: 'ownerInfoMap' },
  { label: '结算日期', prop: 'settlementDate', props: ['settlementMonthBigin', 'settlementMonthEnd'], type: 'dateRange' },
  { label: '创建日期', prop: 'gmtCreate', props: ['gmtCreateBigin', 'gmtCreateEnd'], type: 'dateTimeRange' },
]

export const serviceChargePickTableConfig = [
  { label: '计划单号', prop: 'chargeBillNo' },
  { label: '货主', prop: 'ownerName' },
  { label: '结算日期', prop: 'settlementMonth', type: 'time', format: 'YYYY-MM-DD' },
  { label: '创建日期', prop: 'gmtCreate', type: 'time', format: 'YYYY-MM-DD' },
  { label: '备注', prop: 'remarkInfo' },
]

export const serviceChargePickFormTableConfig = [
  { label: '款项名称', prop: 'expenseName' },
  { label: '金额', prop: 'expenseAmt' },
]