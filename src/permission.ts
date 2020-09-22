/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:58
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 17:17:04
 * @Description: 👉
 */
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import i18n from '@/lang' // Internationalization
import settings from './settings'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()
  if (UserModule.isLogin) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      try {
        await UserModule.GetUserInfo()
        next()
      } catch (error) {
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)
})
