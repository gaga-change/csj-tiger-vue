export const productConfig = [
  { label: '序号', type: 'index'},
  { label: '商品编码', prop: 'ownerName'},
  { label: '商品名称', prop: 'ownerType' },
  { label: '货主编码', prop: 'roleType'},
  { label: '货主名称', prop: 'stores' },
  { label: '商品分类', prop: 'ownerState' },
  { label: '规格', prop: 'ownerState' },
  { label: '型号', prop: 'ownerState' },
  { label: '单位', prop: 'roleType'},
  { label: '基准结算价', prop: 'gmtCreate' },
  { label: '采用开始日', prop: 'gmtModify', type: 'time'},
  { label: '创建人', prop: 'gmtModify'},
  { label: '创建日期', prop: 'gmtModify', type: 'time'},
  { label: '操作', useLink: true, fixed: 'right', width: 150 }
]
