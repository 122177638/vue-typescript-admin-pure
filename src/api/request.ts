import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import { RequestErrorCodeEnum, IResponseResult, RequestErrorMessageMap, IResponseError } from './requestConst'
import config from '@/config'
import { UserModule } from '@/store/modules/user'

interface RequestOptions {
  /** 公共参数配置 */
  publicConfig?: () => RequestPublicConfig
  /** 不处理响应返回的错误 */
  notHandleResponseErrorApiList?: string[]
}
interface RequestPublicConfig {
  /** 整个axios实例 baseURL */
  baseURL?: string
  /** 根据请求方法设置参数(data OR params) */
  params?: object
  /** 公用请求头设置，如Auth Token */
  headers?: object
}
interface IPendingRequest {
  url: string
  cancelMethod: () => void
}
/**
/** 防止重复请求接口列表 */
const preventDuplicateUrlList: string[] = []
const pengdingRequestList: IPendingRequest[] = []

/** 默认配置 */
let requestOptions: RequestOptions = {
  notHandleResponseErrorApiList: [],
  publicConfig: () => {
    return {
      params: { orgId: config.orgId },
      baseURL: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Access-Token': UserModule.token,
      },
    }
  },
}
export function initHttp(options: RequestOptions) {
  requestOptions = { ...requestOptions, ...options }
}

function cancelPengdingRequest(requestConfig: AxiosRequestConfig) {
  for (let i = pengdingRequestList.length - 1; i >= 0; i--) {
    const pengdingRequest: IPendingRequest = pengdingRequestList[i]
    if (!requestConfig || requestConfig.url === pengdingRequest.url) {
      console.debug('cancel duplicate request', requestConfig.url)
      pengdingRequest.cancelMethod()
      pengdingRequestList.splice(i, 1)
    }
  }
}
/** 防止轮询重复建立DOM */
let MessageBoxOpen: any = null
function showLoginTip() {
  if (!MessageBoxOpen) {
    MessageBoxOpen = MessageBox.confirm('登录状态失效，你可以取消继续留在该页面，或者重新登录', '登录状态提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        router.push({ name: 'Login', query: { redirect: router.currentRoute.path } })
      })
      .finally(() => {
        MessageBoxOpen = null
      })
  }
}

function handleRequestError(error: IResponseError) {
  if (error.code === RequestErrorCodeEnum.PERMISSION_NOT_LOGIN) {
    // if (UserModule.isLogin) {
    //   showLoginTip()
    // }
    // showLoginTip()
    // router.push({ name: 'Login', query: { redirect: router.currentRoute.path } })
  } else {
    Message({
      message: RequestErrorMessageMap[error.code] || error.message || '服务器错误',
      type: 'error',
      duration: 3 * 1000,
    })
  }
}
const service = axios.create({
  timeout: 10000,
  withCredentials: true,
})

/** 设置公共参数 */
function setPublicParams(axiosConfig: AxiosRequestConfig) {
  const { method = 'GET', data = {}, params = {}, headers = {}, baseURL = '' } = axiosConfig
  const { params: _params = {}, baseURL: _baseURL = '', headers: _headers = {} } = requestOptions.publicConfig!()
  axiosConfig.baseURL = baseURL || _baseURL
  axiosConfig.headers = {
    ..._headers,
    ...headers,
  }
  if (String(method).toUpperCase() === 'GET') {
    axiosConfig.params = { ..._params, ...params }
  } else {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      Object.entries(_params).forEach(([key, val]) => {
        if (!data.get(key)) {
          data.append(key, val)
        }
      })
    } else {
      axiosConfig.data = qs.stringify({ ..._params, ...data })
    }
  }
}

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    setPublicParams(config)
    if (preventDuplicateUrlList.indexOf(config.url as string) !== -1) {
      cancelPengdingRequest(config)
      config.cancelToken = new axios.CancelToken((cancelMethod: () => void) => {
        pengdingRequestList.push({ url: config.url as string, cancelMethod })
      })
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const data: IResponseResult = response.data
    if (!data.success) {
      if (!requestOptions.notHandleResponseErrorApiList!.some((path) => response.config.url!.includes(path))) {
        handleRequestError(response.data.error)
      }
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    if (error.message && error.message.indexOf('timeout of') === 0) {
      error.code = RequestErrorCodeEnum.TIMEOUT
      error.message = RequestErrorMessageMap[RequestErrorCodeEnum.TIMEOUT]
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)
/** 基础服务 */
export function baseRequest(option: AxiosRequestConfig): Promise<any> {
  const { headers = {}, baseURL = '' } = option
  option.headers = { AHost: 'base-server', ...headers }
  option.baseURL = baseURL || config.baseApiURL
  return new Promise((resolve, reject) => {
    service
      .request(option)
      .then((response) => {
        resolve(response.data.payload)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}
/** 广告服务 */
export function otherRequest(option: AxiosRequestConfig): Promise<any> {
  const { headers = {}, baseURL = '' } = option
  option.headers = { AHost: 'other-server', ...headers }
  option.baseURL = baseURL || config.otherApiURL
  return new Promise((resolve, reject) => {
    service
      .request(option)
      .then((response) => {
        resolve(response.data.payload)
      })
      .catch((err: AxiosError) => {
        reject(err)
      })
  })
}

export default service
