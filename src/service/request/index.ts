// 创建一个ywRequest类
import axios from 'axios'
// 导入类型
import type { AxiosInstance } from 'axios'
import type { YwRequestInterCeptors, YWRequestConfig } from './types'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class YwRequest {
  instance: AxiosInstance
  interceptors?: YwRequestInterCeptors
  showLoading: boolean
  loading?: {
    setText: (text: string) => void
    remvoeElLoadingChild: () => void
    close: () => void
    handleAfterLeave: () => void
  }

  constructor(config: YWRequestConfig) {
    // 通过传来的路径创建接口实例
    this.instance = axios.create(config)
    // 保存传来的interceptors拦截器参数
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 请求request生成的拦截器在这里拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应response的拦截器在这里
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  request<T = any>(config: YWRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          // this.showLoading设置后才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 将resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // this.showLoading设置后才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: YWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: YWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YwRequest
