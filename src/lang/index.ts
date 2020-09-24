import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
  es: {
    ...elementEsLocale,
  },
  ja: {
    ...elementJaLocale,
  },
  ko: {
    ...elementKoLocale,
  },
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}
/**
 * 由于是中文是做为变量key、并且是匹配失败的预备语言
 * 所以我们在开发中只需要注意传参的变量需要重写
 * 而不需要传参的变量，我们直接使用$t('中文')即可
 * 在其他语言中，则都需要设置匹配语言项
 * 可以在项目中文语言开发完成后，通过$t(全局搜索，来找到使用的key,来进行预备词语言
 */
const i18n = new VueI18n({
  locale: getLocale(),
  /** 未匹配语言默认中文 */
  fallbackLocale: 'zh',
  // TODO: 未来可以编写一个适配器，后续中文传参也可以不需要预备填词
  missing(local, key, vm, values) {},
  /** 关闭未匹配提示 */
  silentTranslationWarn: true,
  messages,
})

export default i18n
