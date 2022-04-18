import ywRequest from '../index'
import { IAccount, ILigonResult } from './type'
import { IDataType } from '../types'
// import axios from 'axios'

enum LodinAPI {
  AccountLogiin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return ywRequest.post<IDataType<ILigonResult>>({
    url: LodinAPI.AccountLogiin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return ywRequest.get<IDataType>({
    url: LodinAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenysByRoleId(id: number) {
  return ywRequest.get<IDataType>({
    url: LodinAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
