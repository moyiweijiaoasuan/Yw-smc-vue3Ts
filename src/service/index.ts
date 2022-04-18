// 统一个aixos出口
import YwRequest from './request'
// 动态引入接口
// import { YWRequestConfig } from './request/types'
import { BASE_URL, TIME_OUT } from './request/config'

import LocalCache from '@/utils/cache'
const ywRequest = new YwRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 成功的拦截器位置
    requestInterceptor: (config) => {
      // console.log('拦截器位置')
      const token = LocalCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    // 失败时拦截器位置
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      // console.log('拦截器位置')
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default ywRequest
