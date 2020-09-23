/*
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:59
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-23 16:24:46
 * @Description: 👉
 */
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import api from '@/api'
import avatar from '@/assets/images/timg.gif'
export interface IUserState {
  avatar: any
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public avatar = avatar
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
