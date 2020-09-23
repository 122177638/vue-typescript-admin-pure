/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:59
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-23 15:29:30
 * @Description: 👉
 */

/** format time */
export function formatDate(date: any, format: string = 'YYYY-MM-DD HH:mm:ss') {
  if (!(date instanceof Date)) {
    date = new Date(date)
    if (isNaN(date)) {
      console.error('时间格式错误')
      return ''
    }
  }
  const z = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }
  return format.replace(/(Y+|M+|D+|H+|m+|s+)/g, (v: string) => {
    return String((v.length > 1 ? '0' : '') + (z as any)[v.slice(-1)]).slice(-(v.length > 2 ? v.length : 2))
  })
}
/** format money */
export function formatNumber(value: number | string, precision = 2, seperator: string = '') {
  if (!value) return 0
  const numStr = typeof value === 'string' ? value.replace(/,/g, '') : `${value || ''}`
  const arr = numStr.split('.')
  let strInt = arr[0]
  let strFractional = arr[1] || ''
  if (seperator) {
    strInt = strInt.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&${seperator}`)
  }
  precision = Math.max(0, precision)
  if (strFractional.length > precision) {
    strFractional = strFractional.substr(0, precision)
  }
  if (strFractional.length > 0) {
    strFractional = strFractional.replace(/0+$/, '')
  }
  if (strFractional.length > 0) {
    return `${strInt}.${strFractional}`
  }
  return strInt
}
// Parse the time to string
export const parseTime = (time?: object | string | number | null, cFormat?: string): string | null => {
  if (time === undefined || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}
