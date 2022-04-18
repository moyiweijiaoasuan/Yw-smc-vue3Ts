import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 定义一个拦截器接口
export interface YwRequestInterCeptors<T = AxiosResponse> {
  // 成功的拦截器位置
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 失败时拦截器位置
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}
//  AxiosRequestConfig这是一个接口类，里面有规定的传参，继承后再将上面定义的拦截器接口添加上去。
// 形成性的接口类
export interface YWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YwRequestInterCeptors<T>
  showLoading?: boolean
}
