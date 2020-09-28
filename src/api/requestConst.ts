export const RequestErrorCodeEnum = {
  TIMEOUT: 999,
  UNKNOW_ERROR: 1000, // 未知错误
  PERMISSION_NOT_LOGIN: 400044, // 登录失效，重新登录
  HTTP_HEADER_ERROR: 400042, // 请求头错误
}

export const RequestErrorMessageMap = {
  [RequestErrorCodeEnum.TIMEOUT]: '网络请求超时',
  [RequestErrorCodeEnum.UNKNOW_ERROR]: '未知错误',
  [RequestErrorCodeEnum.PERMISSION_NOT_LOGIN]: '登录失效，重新登录',
  [RequestErrorCodeEnum.HTTP_HEADER_ERROR]: '登录失效，重新登录',
}

export interface IResponseResult {
  error?: IResponseError
  success: boolean
  data?: any
}
export interface IResponseError {
  code: number
  message: string
}
