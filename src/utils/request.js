import axios from 'axios'
import { Message, Notification } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let data = response.data
    let message = data.errorMsg || data.detailError || data.message || ''
    // 系统异常提示（返回的数据为 null）
    // 'TIGER-40620081' inBillUpdateStatus 接口删除报错时提示
    if (~['user-not-login', 501].findIndex(v => v == data.code)) {
      sessionStorage.setItem('warehouse', '')
      location.href = `/login?backUrl=${location.href}`
    } else if (~['ratel-40620008'].findIndex(v => v === data.code)) {
      // 白名单
    } else if (data.code != 200) {
      Message({
        type: 'error',
        message: message || '系统异常',
        duration: 3000
      })
    }
    return data
  },
  error => {
    let data = error.response.data
    let message = data.errorMsg || data.detailError || data.message || error.message
    if (message === '会话超时' || message === '登录失效') {
      return location.href = `/login?backUrl=${location.href}`
    }
    if (message === 'timeout of 1500ms exceeded') message = '请求超时，请稍后再试！'
    Notification({
      title: '错误信息',
      message: message,
      type: 'error',
      duration: 5000,
    })
  }
)

export default service
