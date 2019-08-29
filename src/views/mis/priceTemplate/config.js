
export const tableConfig = [
  { label: '承运商', prop: 'consoildatorName' },
  { label: '计费模式', prop: 'costCalcWay', dom: row => row.costCalcWay === 2 ? '重量计费' : row.costCalcWay === 1 ? '体积计费' : '' },
  { label: '模板名称', prop: 'templateName' }
]