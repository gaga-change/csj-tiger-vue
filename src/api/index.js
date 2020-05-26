import http from './http'

/** 登录 */
export const userlogin = params => http.post(`/api/sso/login`, params)
/** 退出登录 */
export const logout = () => http.get(`/api/sso/logout`)

/** 获取用户信息 */
export const getInfo = params => http.get(`/webApi/base/user/info`, { params })
/** 款项列表 - 全部 */
export const queryLogisticsExpenseAll = params => http.get(`/webApi/logistics-expense/query-logistics-expense-all`, { params })
/** 款项列表 */
export const queryLogisticsExpense = params => http.get(`/webApi/logistics-expense/query-logistics-expense`, { params })
/** 款项新建 */
export const createLogisticsExpense = params => http.post(`/webApi/logistics-expense/create-logistics-expense`, params)
/** 款项修改 */
export const updateLogisticsExpenseInfo = params => http.put(`/webApi/logistics-expense/update-logistics-expense-info`, params)
/** 删除款项性质 */
export const deleteLogisticsExpenseInfo = id => http.delete(`/webApi/logistics-expense/delete-logistics-expense-info/${id}`)
/** 收派服务费 */
export const selectLogisticsExpense = params => http.post(`/webApi/logistics-expense/select-logistics-expense`, params)
/** 收派服务费明细 */
export const serviceChargeBillSelectDetail = billId => http.get(`/webApi/serviceChargeBill/selectDetail/${billId}`)
/** 收派服务费删除 */
export const serviceChargeBillDelete = billId => http.delete(`/webApi/serviceChargeBill/delete/${billId}`)
/** 收派服务费列表 */
export const serviceChargeBillQueryPageList = params => http.post(`/webApi/serviceChargeBill/queryPageList`, params)
/** 收派服务费保存 */
export const serviceChargeBillSave = params => http.post(`/webApi/serviceChargeBill/save`, params)
/** 收派服务费修改 */
export const serviceChargeBillUpdate = params => http.put(`/webApi/serviceChargeBill/update`, params)
/** 获取客户 & 供应商 */
export const getCustomerInfoPage = params => http.post(`/webApi/customer/getCustomerInfoPage`, params)
/** 新增商品 */
export const addProduct = params => http.post(`/webApi/sku/info/add`, params)
/** 首页获取待办事项 */
export const todoList = params => http.get(`/webApi/todo/todo`, { params })
/** 分页查询承运商外部对账列表 */
export const queryStatementList = params => http.get(`/webApi/consoil/statement/queryStatementList`, { params })
/** 承运商费用结算分页查询 */
export const queryCostSattleList = params => http.get(`/webApi/consoil/statement/queryCostSattleList`, { params })
/** 查询所有承运商 */
export const selectAllConsolidator = params => http.get(`/webApi/consoil/statement/selectAllConsolidator`, { params })
/** 承运商对账删除接口 */
export const batchDeleteStatement = params => http.post(`/webApi/consoil/statement/batchDeleteStatement`, params)
/** 承运商 加入 确认 移除结算 */
export const addOrDeleteSattle = params => http.post(`/webApi/consoil/statement/addOrDeleteSattle`, params)
/** 查询模板列表 */
export const queryTemplateList = params => http.post(`/webApi/template/queryTemplateList`, params)
/** 承运商列表 */
export const consoilInfoList = params => http.get(`/webApi/consoil/info/list`, { params })
/** 删除模板 */
export const deleteTemplateInfo = params => http.get(`/webApi/template/deleteTemplateInfo`, { params })
/** 新建模板 */
export const saveTemplate = params => http.post(`/webApi/template/saveTemplate`, params)
/** 修改模板 */
export const updateTemplateInfo = params => http.post(`/webApi/template/updateTemplateInfo`, params)
/** 审核配置 - 修改 */
export const basicAuditConfigUpdate = params => http.post(`/webApi/basicAuditConfig/update`, params)
/** 异常数据查询 */
export const exceptionDataSelectListPage = params => http.post(`/webApi/exceptionData/selectListPage`, params)
/** 模板详情 */
export const selectTemplateInfo = params => http.get(`/webApi/template/selectTemplateInfo`, { params })
/** 审核配置列表 */
export const basicAuditConfigList = params => http.get(`/webApi/basicAuditConfig/queryPageList`, { params })
// 异常接收人 保存
export const exceptionReceiverSave = params => http.post(`/webApi/exceptionReceiver/save`, params)
// 异常接收人 列表
export const exceptionReceiverList = params => http.post(`/webApi/exceptionReceiver/selectListPage`, params)
// 款项性质 保存
export const expenseTypeSave = params => http.post(`/webApi/expenseType/save`, params)
// 款项性质 列表
export const expenseTypeList = params => http.post(`/webApi/expenseType/queryList`, params)
// 款项性质 删除
export const expenseTypeDel = params => http.get(`/webApi/expenseType/delete`, { params })
// 款项性质 修改
export const expenseTypeUpdate = params => http.post(`/webApi/expenseType/updateDict`, params)
// 异常接收人 删除
export const exceptionReceiverDelete = id => http.delete(`/webApi/exceptionReceiver/delete/${id}`)
// 租户管理员 列表
export const tenantAdminList = params => http.post(`/webApi/tenant/admin/page`, params)
// 租户管理员 修改状态
export const effectTenant = params => http.post(`/webApi/owner/info/effect`, params)
// 租户管理员 删除
export const delTenant = params => http.get(`/webApi/owner/info/del`, { params })
// 商品列表
export const skuListByCondition = params => http.post(`/webApi/sku/info/skuListByCondition`, params)
// 入库业务单管理 列表查询（杂收同用）（fromSystemId 必传 杂发传 QLL 出库传 TIGER）
export const inBillSelect = params => http.post(`/webApi/in/bill/select`, params)
// 修改单据状态（杂收删除，杂收审核调另外审核接口）
export const inBillUpdateStatus = params => http.put(`/webApi/in/bill/updateStatus`, {}, { params })
// 入库业务单明细查询（杂收明细查看）
export const inBillDetail = id => http.get(`/webApi/in/bill/detail/${id}`)
// 出库业务单列表（fromSystemId 必传 杂发传QLL 出库传TIGER）
export const outBillList = params => http.post(`/webApi/out/bill/list`, params)
// 出库业务单删除功能（杂发）
export const outBillDelete = id => http.delete(`/webApi/out/bill/delete/${id}`)
// 出库业务单详情（查看功能）(杂发查看)
export const outBillDetail = id => http.get(`/webApi/out/bill/detail/${id}`)
// 出库业务单审核（杂发审核）
export const outBillCheck = id => http.get(`/webApi/out/bill/check/${id}`)
// 亚太U9组织分页列表
export const asiaOrganizeList = params => http.post(`/webApi/asia/organize/list`, params)
// 根据组织和业务类型查询单据类型分页列表
export const asiaBillTypeList = params => http.post(`/webApi/asia/billType/list`, params)
// 根据组织查询受益部门分页列表
export const asiaDepartmentList = params => http.post(`/webApi/asia/department/list`, params)
// 亚太U9研发项目分页列表
export const asiaProjectList = params => http.post(`/webApi/asia/project/list`, params)
// 根据研发项目查询工作号分页列表
export const asiaWorkList = params => http.post(`/webApi/asia/work/list`, params)
// 亚太U9服务与费用分页列表
export const asiaServiceCostList = params => http.post(`/webApi/asia/servicecost/list`, params)
// 仓库列表
export const ownerWarehouseList = params => http.get(`/webApi/owner/info/ownerWarehouseList`, { params })
// 新增业务单（杂收新建）
export const inBillAdd = params => http.post(`/webApi/in/bill/add`, params)
// 商品查询
export const skuInfoProviderList = params => http.get(`/webApi/sku/info/provider/list`, { params })
// 供应商查询
export const customerInfo = ({ ownerCode, busiBillType }) => http.get(`/webApi/customer/info/${ownerCode}/${busiBillType}`)
// 获取入库计划
export const inPlanSelect = params => http.post(`/webApi/in/plan/getInPlanData`, params)
// 入库单查询数据
export const queryInWarehouseCode = params => http.post(`/webApi/in/order/inWarehouseOrderList`, params)
// 入库单查询数据
export const queryWarehouseCode = params => http.post(`/webApi/out/order/select`, params)