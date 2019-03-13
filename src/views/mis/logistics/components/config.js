export const listIndexConfig = [
  {
    label: '配送单号',
    prop: 'ownerCode',
    linkTo: '/logistics/detail',
    query: [{ key: 'id', value: 'id' }]
  },
  { label: '物流单号', prop: 'ownerName'},
  { label: '货主', prop: 'ownerType' },
  { label: '配送类型', prop: 'roleType', useLocalEnum: true, type: 'roleType' },
  { label: '承运商', prop: 'stores' },
  { label: '运费区分', prop: 'ownerState' },
  { label: '客户名称', prop: 'ownerState' },
  { label: '客户地址', prop: 'ownerState' },
  { label: '配送状态', prop: 'roleType', useLocalEnum: true, type: 'roleType' },
  { label: '制单人', prop: 'gmtCreate' },
  { label: '制单时间', prop: 'gmtModify', type: 'time'},
  { label: '操作', useLink: true, fixed: 'right', width: 150 }
]
