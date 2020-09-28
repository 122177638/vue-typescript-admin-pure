const envData = process.env
console.log(envData)
export default {
  /** 基础服务 */
  commonApiURL: envData.VUE_APP_BASE_API,
  /** 广告服务 */
  adApiURL: envData.VUE_APP_AD_API,
  /** orgId */
  orgId: 300,
}
