/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:58
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 17:11:56
 * @Description: 👉
 */
// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
