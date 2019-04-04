export const productConfig = [
  { label: '序号', type: 'index', width: 55},
  { label: '商品编码', prop: 'skuCode', width: 155},
  { label: '商品名称', prop: 'skuName', width: 240 },
  { label: '货主编码', prop: 'ownerCode', width: 150},
  { label: '货主名称', prop: 'ownerName', width: 180 },
  { label: '商品分类', prop: 'categoryName', width: 155 },
  { label: '规格型号', prop: 'skuFormat', width: 155 },
  { label: '单位', prop: 'skuUnitName'},
  { label: '基准结算价', prop: 'baseSettlementPrice', width: 120 },
  { label: '采用开始日', prop: 'useDate', type: 'time', width: 155},
  { label: '创建人', prop: 'createrName'},
  { label: '创建日期', prop: 'gmtCreate', type: 'time', width: 155},
  { label: '操作', useLink: true, fixed: 'right', width: 100 }
]
export const customerConfig = [
  { label: '客户', prop: 'customerCode', placeholder: '请选择客户', type: 'select', selectOptions: [] },
  { label: '客户物料编码', prop: 'customerSkuCode', placeholder: '请输入物料编码' },
  { label: '采用开始日', prop: 'useDate', type: 'date', width: 155 },
  { label: '客户销价', prop: 'sellPrice', type: 'number', placeholder: '请输入客户销价' },
  { label: '物料分类码', prop: 'skuCode', placeholder: '请输入客户物料分类码' },
  { label: '价格有效期', prop: 'priceValid', type: 'date', width: 155 },
  { label: '客户物料名称', prop: 'customerSkuName', placeholder: '请输入客户物料名称' },
  { label: '备注', prop: 'remarkInfo', type: 'textarea' },
]
export const servicerConfig = [
  { label: '供应商', prop: 'providerCode', placeholder: '请选择供应商', type: 'select', selectOptions: [] },
  { label: '进货价', prop: 'purchasePrice', placeholder: '请输入进货价', type: 'number' },
  { label: '价格有效期', prop: 'priceValid', type: 'date', width: 155 },
  { label: '供应商物料编码', prop: 'providerSkuCode', placeholder: '请输入供应商编码' },
  { label: '大包装单位', prop: 'largePackUnitName', placeholder: '请输入大包装单位' },
  { label: '订货计量单位', prop: 'orderMeasureUnit', placeholder: '请选择订货计量单位', type: 'select',
    selectOptions: [{ value: '商品包装单位', key: 1 }, { value: '大包装单位', key: 2 }, { value: '中包装单位', key: 3 }]
  },
  { label: '交货周期', prop: 'orderPeriod', placeholder: '请输入交货周期' },
  { label: '供应商物料名称', prop: 'providerSkuName', placeholder: '请输入供应商物料名称' },
  { label: '中包装单位', prop: 'mediumPackUnitName', placeholder: '请输入中包装单位' },
  { label: '订货计量重量', prop: 'orderMeasureWeight', placeholder: '请输入订货计量重量', type: 'number' },
  { label: '订货计量体积', prop: 'orderMeasureVolume', placeholder: '请输入订货计量体积', type: 'number' },
  { label: '供应商物料分类', prop: 'providerSkuType', placeholder: '请输入供应商物料分类' },
  { label: '备注', prop: 'remarkInfo', type: 'textarea' },
]
