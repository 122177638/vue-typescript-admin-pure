/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:58
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 16:19:19
 * @Description: 👉
 */
import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user'

export const permission: DirectiveOptions = {
  // inserted(el, binding) {
  //   const { value } = binding
  //   const roles = UserModule.roles
  //   if (value && value instanceof Array && value.length > 0) {
  //     const permissionRoles = value
  //     const hasPermission = roles.some(role => {
  //       return permissionRoles.includes(role)
  //     })
  //     if (!hasPermission) {
  //       el.style.display = 'none'
  //     }
  //   } else {
  //     throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
  //   }
  // }
}
