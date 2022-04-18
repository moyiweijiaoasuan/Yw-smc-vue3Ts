import { ILoginState } from './login/types'
import { ISysremState } from './main/system/type'
import { IDashboardState } from './main/analysis/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISysremState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule
