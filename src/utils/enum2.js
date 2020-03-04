
// 财务 - 服务费管理 - 收派服务费
export const isHasOrderEnum = [{
  name: '有外部订单',
  value: 0
},
{
  name: '有外部订单有配送单',
  value: 1
},
{
  name: '无外部订单',
  value: 2
}]

// 财务 - 服务费管理 - 收派服务费
export const settlementType2 = [{
  name: '',
  value: 0
},
{
  name: '按单结',
  value: 1
},
{
  name: '周结',
  value: 2
},
{
  name: '月结',
  value: 3
},
{
  name: '现结',
  value: 4
},
{
  name: '到付',
  value: 5
},
{
  name: '自提',
  value: 6
}]
// 主页 - 待办列表
export const toDoTypeEnum = [
  {
    name: '入库计划',
    value: 0
  },
  {
    name: '出库计划',
    value: 1
  },
]
// 承运商费用结算 - 承运商结算状态
export const costSettlementStatusEnum = [
  {
    name: '未结算',
    value: 0
  },
  {
    name: '结算中',
    value: 1
  },
  {
    name: '已结算',
    value: 2
  }
]
// 审核配置 - 单据类型
export const auditBillTypeEnum = [
  {
    name: '入库计划单',
    value: 1
  },
  {
    name: '出库计划单',
    value: 2
  },
]

// 款项管理 - 收入/费用
export const expenseNatureEnum = [
  {
    name: '费用',
    value: '0'
  },
  {
    name: '收入',
    value: '1'
  },
]

// // 审核配置 - 审核类型
// export const auditType = [
//   {
//     name: '自动审批',
//     value: 1
//   },
//   {
//     name: '自动审批',
//     value: 2
//   },
// ]