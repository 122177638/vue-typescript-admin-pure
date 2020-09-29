const envData = process.env
console.log(envData)
export default {
  /** 基础服务 */
  baseApiURL: envData.VUE_APP_BASE_API,
  /** 其他服务 */
  otherApiURL: envData.VUE_APP_OTHER_API,
  /** orgId */
  orgId: 300,
}
