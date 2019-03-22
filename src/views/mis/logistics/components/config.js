export const listIndexConfig = [
  {label: '配送单号',prop: 'ownerCode'},
  { label: '物流单号', prop: 'ownerName'},
  { label: '货主', prop: 'ownerType' },
  { label: '配送类型', prop: 'roleType'},
  { label: '承运商', prop: 'stores' },
  { label: '运费区分', prop: 'ownerState' },
  { label: '客户名称', prop: 'ownerState' },
  { label: '客户地址', prop: 'ownerState' },
  { label: '配送状态', prop: 'roleType'},
  { label: '制单人', prop: 'gmtCreate' },
  { label: '制单时间', prop: 'gmtModify'},
  { label: '操作', useLink: true, fixed: 'right', width: 150 }
]

export const subsituteConfig = [
  { label: '序号', type: 'index', width: 80 },
  { label: '款项编码', prop: 'orderNo' },
  { label: '款项名称', prop: 'orderName'},
  { label: '款项性质', prop: 'orderNatrue', useLocalEnum: true, type: 'paymentNature' },
  { label: '操作', useLink: true, fixed: 'right', width: 150 }
]

export const deliveryConfig = [
  { label: '序号', type: 'index', prop: 'index', width: 60 },
  { label: '业务单号', prop: 'orderNo' },
  { label: '计划单号', prop: 'orderName'},
  { label: '出库单号', prop: 'orderNatrue'},
  { label: '客户编码', prop: 'orderNatrue'},
  { label: '客户名称', prop: 'orderNatrue'},
  { label: '地址', prop: 'orderNatrue'},
  { label: '物流公司', prop: 'orderNatrue'},
  { label: '配送单号', prop: 'orderNatrue'},
  { label: '出库日期', prop: 'orderNatrue'},
  { label: '商品编码', prop: 'orderNatrue'},
  { label: '规格', prop: 'orderNatrue'},
  { label: '单位', prop: 'orderNatrue'},
  { label: '出库数量', prop: 'orderNatrue'},
  { label: '出库金额', prop: 'orderNatrue'}
]
