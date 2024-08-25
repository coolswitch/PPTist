import axios from 'axios'
// eslint-disable-next-line no-duplicate-imports
import type { AxiosRequestConfig, Canceler, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import useAuth from '@/hooks/useAuth'

type CancelQueueItem = { canceler: Canceler; urlFlag: string; data?: any }
type RequestConfig = AxiosRequestConfig<any> & {
  retryCount?: number
  delay?: number
}
type InternalRequestConfig = InternalAxiosRequestConfig<any> & {
  noCancel?: true
  successHandler?: () => void
}

const BASE_API = 'https://admin-api.7niuai.cn'
const authToken = useAuth()

const CancelToken = axios.CancelToken
const pendingQueue: CancelQueueItem[] = []

/*
 * config参数说明：
 * 除了axios默认的config参数外，request模块又增加了几个配置参数
 * @param noCancel(Boolean|Function, false): 指定为true时,相同url的接口请求时老请求不会被取消，也可指定为函数，该函数会把新请求的参数和正在pending的请求的参数传递给回调函数，
 * 返回true，不会取消旧的请求
 * @param retryCount(Number, 0)：指定该配置参数，请求出错后会重新发送，并尝试retryCount次
 * @param successMsg(String) 接口成功的信息提示
 * @param successHandler(Function) 接口成功后的回调，会把接口res传进去，一般用来处理接口返回的数据
 * @param delay(Number) 给接口增加一个延迟时间，延迟时间到了之后接口才返回，目的是测试某些接口时间较长时会有什么影响
 * */

const removePending = (config: InternalRequestConfig, isRequest: boolean) => {
  // isRequest标记是请求拦截器还是响应拦截器
  const urlFlag = `${config.url}&${config.method}`
  const index = pendingQueue.findIndex((item) => item.urlFlag === urlFlag)
  if (index === -1) return
  const item = pendingQueue[index]
  if (isRequest && typeof config.noCancel !== 'function') {
    item.canceler() // 对该次接口之前发送的的同名接口执行取消操作
    console.log(config.url, '接口被取消')
  }
  pendingQueue.splice(index, 1) // 把这条记录从数组中移除
}

// create an axios instance
export const service = axios.create({
  baseURL: BASE_API,
  timeout: 0 // request timeout
})

service.interceptors.request.use(
  (config: InternalRequestConfig) => {
    config.headers.Authorization = `${authToken.getToken()}`
    config.data = config.data || {}
    removePending(config, true)
    config.cancelToken = new CancelToken((canceler) => {
      const isCancelFunction = typeof config.noCancel === 'function'
      if (!config.noCancel || isCancelFunction) {
        // 该请求可被取消
        const obj: CancelQueueItem = {
          urlFlag: `${config.url}&${config.method}`, // url标记，便宜请求结束后从pendingQueue中移除
          canceler // 执行该方法可取消正在pending中的该请求
        }
        if (isCancelFunction) {
          obj.data = config.data // 传递给noCancel回调的参数
        }
        pendingQueue.push(obj)
      }
    })
    config.headers['content-type'] = 'application/json; charset=UTF-8'
    return config
  },
  (error) => {
    console.log(error)
  }
)

service.interceptors.response.use(
  ({ data: res, config }) => {
    removePending(config, false) // 清除该记录
    if (res.code === 0) {
      // @ts-ignore
      config.successHandler && config.successHandler(res)
    } else {
      //
    }
    return res
  },
  (error) => {
    if (error.message) console.log(error)
    if (error.message === 'Network Error') {
      // ElMessage.error('网络请求失败，请检查您的网络！')
    } else if (error.message && !error.config?.noCatch && !error.message.startsWith('canceled')) {
      // 断网，超时，有message，请求被取消，无message
      if (error.message.includes('timeout')) {
        if (!error.config.retryCount) {
          // ElMessage.error(`${import.meta.env.MODE === 'development' ? error.config.url + '：' : ''}网络请求超时!`)
        }
      } else {
        // ElMessage.error(error.message)
      }
    }
    return Promise.reject(error)
  }
)

// export default service
const maxRetryCount = 2
export default async function request<T>(config: RequestConfig): Promise<T | any> {
  try {
    if (import.meta.env.MODE === 'development' && config.delay) {
      // 测试接口时间较长的影响
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          service(config).then(resolve).catch(reject)
        }, config.delay)
      })
    }
    return await service(config)
  } catch (err: any) {
    // 出错重新发送
    if (!err.message) return Promise.reject(err) // 请求被取消时，无message，此时不处理
    if (config.retryCount) {
      if (config.retryCount > maxRetryCount) {
        config.retryCount = maxRetryCount
      }
      return request({
        ...config,
        retryCount: config.retryCount - 1
      })
    }
    return Promise.reject(err)
  }
}

export function postRequest(configOrUrl: RequestConfig | string, data?: any) {
  const obj: RequestConfig = {
    data,
    method: 'post'
  }
  if (typeof configOrUrl === 'string') {
    obj.url = configOrUrl
  } else if (typeof configOrUrl === 'object') {
    Object.assign(obj, configOrUrl)
  }
  return request(obj)
}

export function sendBeacon(url: string, params: any) {
  params.token = authToken.getToken()
  const isSend = navigator.sendBeacon(BASE_API + url, JSON.stringify(params))
  return Promise.resolve(isSend)
}

// 利用闭包生成单例模式api请求，该函数生成的api总是只会有一个请求
export function toSingleInstanceApi(configOrUrl: AxiosRequestConfig<any>, request = postRequest) {
  let pendingPromise: Promise<unknown> | null
  return function (data = {}) {
    if (pendingPromise) return pendingPromise
    return new Promise((resolve, reject) => {
      pendingPromise = request(configOrUrl, data)
      pendingPromise
        .then(resolve)
        .catch(reject)
        .finally(() => {
          pendingPromise = null
        })
    })
  }
}

export const uploadService = axios.create({
  baseURL: BASE_API,
  timeout: 0 // request timeout
})
uploadService.interceptors.request.use(
  (config: InternalRequestConfig) => {
    config.method = 'post'
    config.headers.Authorization = `${authToken.getToken()}`
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    return config
  },
  (error) => {
    console.log(error)
  }
)
