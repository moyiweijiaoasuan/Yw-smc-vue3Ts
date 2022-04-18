import { Module } from 'vuex'
import router from '@/router'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenysByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'
import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { mapMenusRoute, mapMenusToPrmissions } from '@/utils/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeuserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // console.log(state.userMenus)

      const routes = mapMenusRoute(userMenus)
      // console.log(routes)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permission = mapMenusToPrmissions(userMenus)
      state.permissions = permission
      // console.log(state.permissions)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // console.log('执行逻辑', payload)
      const loginRequst = await accountLoginRequest(payload)
      const { id, token } = loginRequst.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)
      // 发送初始化的请求（完整的role/department）只传方法会默认调用本页面而不是根页面，需要root
      dispatch('getInitialDataAction', null, { root: true })
      // console.log(loginRequst)
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeInfo', userInfo)
      // 本地保存缓存
      LocalCache.setCache('userInfo', userInfo)
      // 3，请求用户菜单
      const userMenusResult = await requestUserMenysByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      // console.log(userMenus)

      commit('changeuserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)
      //跳转首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeuserMenus', userMenus)
      }
    }
  }
}

export default loginModule
