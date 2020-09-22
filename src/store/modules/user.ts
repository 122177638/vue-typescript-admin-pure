/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:59
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 18:23:57
 * @Description: 👉
 */
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import api from '@/api'

export interface IUserState {
  avatar: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public avatar =
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600775151775&di=8282ffb2cbcc3080415eca8be52805f8&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201406%2F28%2F20140628154925_AHrfZ.gif'
  public userInfo: any = {}
  public isLogin = false

  @Action({ commit: 'SET_USER_INFO' })
  public async Login(loginInfo: { account: string; password: string }) {
    const userInfo = await api.common.login(loginInfo)
    return userInfo
  }

  @Action({ commit: 'SET_USER_INFO' })
  public async GetUserInfo() {
    const userInfo = await api.common.getUserInfo()
    return userInfo
  }

  @Action({ commit: 'SET_USER_INFO' })
  public async LoginOut() {
    await api.common.loginOut()
    return {}
  }

  @Mutation
  private SET_USER_INFO(userInfo: any) {
    this.isLogin = Boolean(Object.keys(userInfo).length)
    this.userInfo = userInfo
    UserModule.context.dispatch('ChangeRoles', ['admin'])
  }

  @Action
  public async ChangeRoles(roles: string[]) {
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    await api.common.loginOut()

    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }
}

export const UserModule = getModule(User)
