import { baseRequest } from '../request'

/* 登录 */
export function login(data: { username: string; password: string }) {
  return baseRequest({ url: '/users/login', method: 'post', data })
}

/* 获取用户信息 */
export function getUserInfo() {
  return baseRequest({ url: '/users/info', method: 'post' })
}

/* 退出登录 */
export function logOut() {
  return baseRequest({ url: '/users/logout', method: 'post' })
}
