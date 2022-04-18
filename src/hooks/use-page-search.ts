import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handlszClick = () => {
    pageContentRef.value?.getPageDatas
  }
  const handlssClick = (queryInfo: any) => {
    pageContentRef.value?.getPageDatas(queryInfo)
  }
  return [pageContentRef, handlszClick, handlssClick]
}
