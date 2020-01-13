import http from './http'

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
export const consoilInfoList = params => http.get(`webApi/consoil/info/list`, { params })
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
// /** 货主列表  -- 枚举已有，无需手动添加 */
// export const ownerInfoList = params => http.get(`webApi/owner/info/list`, { params })