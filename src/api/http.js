import axios from 'axios'
import {
  Notification,
  Message
} from 'element-ui'

let newAxios = axios.create({
  timeout: 15000 // 请求超时时间
})

export function httpMiddler(response) {
  let data = response.data
  let message = data.message || data.errorMsg || ''
  // 系统异常提示（返回的数据为 null）
  if (~['TIGER-40620081', 'user-not-login'].findIndex(v => v === data.code)) {
    // Message({
    //   type: 'error',
    //   message: '登录已失效，3秒后自动跳转登录',
    //   onClose: () => {
    //     sessionStorage.setItem('warehouse', '')
    //     location.href = `/csj_login`
    //   },
    //   duration: 3000
    // })
    sessionStorage.setItem('warehouse', '')
    location.href = `/csj_login`
    data = null
  } else if (~['ratel-40620008'].findIndex(v => v === data.code)) {
    // 白名单
  } else if (data.code !== '200') {
    Message({
      type: 'error',
      message: message || '系统异常',
      duration: 3000
    })
    data = null
  }
  return data
}

// 响应拦截器
newAxios.interceptors.response.use(httpMiddler, function (error) {
  let message = error.message
  if (message === 'timeout of 1500ms exceeded') message = '请求超时，请稍后再试！'
  Notification({
    title: '错误信息',
    message: message,
    type: 'error',
    duration: 5000,
  })
  return Promise.reject(error)
})


const http = {
  get(...params) {
    return newAxios.get(...params).then(res => res).catch(err => null)
  },
  post(...params) {
    return newAxios.post(...params).then(res => res).catch(err => null)
  },
  delete(...params) {
    return newAxios.delete(...params).then(res => res).catch(err => null)
  },
  put(...params) {
    return newAxios.put(...params).then(res => res).catch(err => null)
  }
}

export default http
