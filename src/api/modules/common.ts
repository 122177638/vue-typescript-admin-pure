import { commonRequest } from '../request'

/* 登录 */
export function login(data: { account: string; password: string }) {
  return commonRequest({ url: '/user/loginByAccount', method: 'post', data })
}
/* 注册 */
export function register(data: {} = {}) {
  return commonRequest({ url: '/user/register', method: 'post', data })
}

/* 获取用户信息 */
export function getUserInfo() {
  return commonRequest({ url: '/user/getUserInfo', method: 'get' })
}

/* 退出登录 */
export function loginOut() {
  return commonRequest({ url: '/user/logout', method: 'post' })
}
