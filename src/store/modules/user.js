import { getInfo} from '@/api/login'

const user = {
  state: {
    userInfo: null,
    company: null,
    companyId: null
  },
  mutations: {
    SET_USERINFO: (state, info) => {
      state.userInfo = info
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_COMPANYID: (state, id) => {
      state.companyId = id
    }
  },

  actions: {
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        
          //以下为测试数据
          let response = {
            "code": "200",
            "data": {
              "id": 2480,
              "nick": null,
              "lastLoginTime": null,
              "status": null,
              "email": "serviceadmin@csjscm.com",
              "createTime": null,
              "password": null,
              "truename": "管理员",
              "fields": null,
              "phone": "15888802313",
              "type": null,
              "checkerid": null,
              "regstatus": null,
              "roleid": null,
              "companyid": "4028813062b507430162c727eb4c00e2",
              "sysflag": null,
              "openid": null,
              "linkaccount": null,
              "checkstatus": null,
              "refusereason": null,
              "companyname": "诸暨裕大贸易有限公司",
              "checkusername": null,
              "purchase": null,
              "sale": null,
              "openaccount": null,
              "permissions": ["#", "/api/auth/role/get_all_count", "/api/auth/role/check_name", "/api/auth/role/delete_by_ids", "/api/auth/role/get_list_count", "/api/auth/role/delete", "/api/auth/role/get_user_available_rolelist", "/api/auth/role/getall", "/api/auth/role/get_parent_roles", "/api/auth/role/update_parent_roles", "/api/auth/role/update_role_permissions/*", "/api/auth/role/roles", "/api/auth/role/get_by_ids", "/api/auth/role/get", "/api/auth/role/get_baserole_list", "/api/auth/role/get_list", "/api/auth/role/update", "/api/auth/role/get_role_permissions", "/api/auth/role/add"],
              "roles": ["service_admin"],
              
              "permissionCodes": ["api:auth:role:delete_by_ids", "makeoutinvoice", "newpurchaseorder", "contractDelete", "newcustomerquotationorder", "receivableDelete", "outputInvoiceReject", "purchReject", "quotationedit", "receiptCheck", "api:auth:role:delete", "receivableReject", "paymentEdit", "innoticeCheck", "cdtaskCheck", "outNoticeReject", "edit", "outNoticeDelete", "quotationcheck", "outNoticeEdit", "api:auth:role:get_role_permissions", "cdtaskEdit", "receivableEdit", "quotationBid", "api:auth:role:check_name", "distributedelete", "newsaleorder", "quotationdelete", "receiptEdit", "outNoticeCheck", "api:auth:role:getall", "receivableCheck", "saleDelete", "contractEdit", "api:auth:role:get_list", "saleCheck", "cancelCheck", "outputInvoiceDelete", "outstoreCheck", "newreceiptorder", "paymentCheck", "quotationreject", "purchEdit", "api:auth:role:get_baserole_list", "inorderDelete", "newinnotice", "api:auth:role:add", "receiptReject", "paymentReject", "inputInvoiceReject", "receiptDelete", "paymentDelete", "innoticeReject", "innoticeEdit", "newoutstore", "api:auth:role:update", "inorderCheck", "innoticeDelete", "outputInvoiceResultDelete", "api:auth:role:get_parent_roles", "outputInvoiceResultReject", "newservicequotation", "newoutnotice", "saleReject", "inputInvoiceDelete", "check", "api:auth:role:get_by_ids", "distributecheck", "distributereject", "saleEdit", "outputInvoiceCheck", "api:auth:role:update_role_permissions:*", "api:auth:role:update_parent_roles", "benullified", "receiptCancelCheck", "api:auth:role:get_list_count", "purchCancelCheck", "saleCancelCheck", "api:auth:role:get_user_available_rolelist", "delete", "api:auth:role:get", "outputInvoiceResultCheck", "newinstore", "reject", "outstoreReject", "distributecancelcheck", "cdtaskDelete", "inputInvoiceCheck", "purchCheck", "follow", "newdistribute", "api:auth:role:roles", "api:auth:role:get_all_count", "purchDelete", "mergequotation", "inorderReject", "outstoreDelete"]
            },
            "message": "查询成功!"
          }
           commit('SET_USERINFO', response.data)
           commit('SET_COMPANY', response.data.companyname)
           commit('SET_COMPANYID', response.data.companyid)
           console.log( response.data.companyname,12323)           
           resolve(response)
           
          //以下为正式数据

        // getInfo().then(response => {
        //   const data = response.data;
        //   commit('SET_USERINFO', data)
        // commit('SET_COMPANY', data.companyname)
        //  commit('SET_COMPANYID', data.companyid)
        //   resolve(response)
        // }).catch(error => {
        //   console.log(error)
        //   reject(error)
        // })
      })
    }
  }
}

export default user
