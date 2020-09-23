/*
 * @Author: Anles💯
 * @Date: 2020-09-22 15:55:55
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-23 11:11:25
 * @Description: 👉
 */
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
