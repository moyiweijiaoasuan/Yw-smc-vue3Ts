import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModealRef = ref<InstanceType<typeof PageModel>>()
  // 新建用户
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModealRef.value) {
      pageModealRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  // 点击编辑用户时做的操作
  const defaultInfo = ref({})
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModealRef.value) {
      pageModealRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModealRef, handleNewData, defaultInfo, handleEditData]
}
