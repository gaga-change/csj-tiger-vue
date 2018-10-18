import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { LoginPath } from '@/utils'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success&&res.code !== '0' && res.code !== '200' && res.code !== 'success' && res !== 'success') {
      if (res.code === '512') {
        MessageBox.alert('验证失败,请重新登录').then(_ => {
          location.href = `${LoginPath}/logout?service=${location.origin}/csj_login`
        })
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.dir(error.response)// for debug
    let errMessage = "出现了意料之外的错误"
    if(error && error.response && error.response.data && error.response.data.message){
      errMessage = error.response.data.message
    }
    Message({
      message: errMessage,
      type: 'error',
      duration: 5 * 1000,
      onClose:()=> Promise.reject(error)
      
    })
    // return Promise.reject(error)
  }
)

export default service
