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
