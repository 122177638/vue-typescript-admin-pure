import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import api from '@/api'
import avatar from '@/assets/images/timg.gif'
import { getToken, removeToken, setToken } from '@/utils/cookies'
export interface IUserState {
  avatar: any
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token: string = getToken() || ''
  public avatar = avatar
  public userInfo: any = {}
  public isLogin = false

  @Action
  public async Login(loginInfo: { username: string; password: string }) {
    const { token } = await api.user.login(loginInfo)
    this.SET_TOKEN(token)
  }
  @Mutation
  private SET_TOKEN(token: string) {
    setToken(token)
    this.token = token
  }
  @Mutation
  private RESET_TOKEN() {
    removeToken()
    this.token = ''
  }
  @Action
  public async GetUserInfo() {
    try {
      const userInfo = await api.user.getUserInfo()
      this.SET_USER_INFO(userInfo)
    } catch (error) {
      this.SET_USER_INFO({})
      this.RESET_TOKEN()
    }
  }

  @Action
  public async LogOut() {
    await api.user.logOut()
    this.SET_USER_INFO({})
    this.RESET_TOKEN()
    resetRouter()
  }

  @Mutation
  private SET_USER_INFO(userInfo: any) {
    this.isLogin = Boolean(Object.keys(userInfo).length)
    this.userInfo = userInfo
    if (this.isLogin) UserModule.context.dispatch('ChangeRoles', ['admin'])
  }

  @Action
  public async ChangeRoles(roles: string[]) {
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }
}

export const UserModule = getModule(User)
