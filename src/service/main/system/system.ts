import ywRequest from '../../index'
import { IDataType } from '../../types'
export function getpageListData(url: string, queryInfo: any) {
  return ywRequest.post({
    url: url,
    data: queryInfo
  })
}
// url: /users/id
export function deletePageData(url: string) {
  return ywRequest.delete<IDataType>({
    url: url
  })
}
// 新建角色路径
export function createPageData(url: string, newData: any) {
  return ywRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
// 编辑角色路径
export function editPageData(url: string, editData: any) {
  return ywRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
