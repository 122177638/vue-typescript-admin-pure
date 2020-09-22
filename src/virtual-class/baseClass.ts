import { UserModule } from '@/store/modules/user'
/*
 * @Author: Anles💯
 * @Date: 2020-08-28 15:06:17
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 15:54:44
 * @Description: 👉
 */
import { Vue, Component } from 'vue-property-decorator'
import { ElLoadingComponent, LoadingServiceOptions } from 'element-ui/types/loading'

@Component
export default class BaseClass extends Vue {
  private _loadingInstance: ElLoadingComponent | undefined = undefined

  /**
   * 显示Loading
   * @param options
   */
  protected showLoading(
    options: LoadingServiceOptions = { body: true, fullscreen: true, lock: true, target: '.app-main' },
  ): ElLoadingComponent {
    if (this._loadingInstance) return this._loadingInstance
    this._loadingInstance = this.$loading(options)
    return this._loadingInstance
  }

  protected closeLoading() {
    if (this._loadingInstance) {
      this._loadingInstance.close()
      this._loadingInstance = undefined
    }
  }
}
