<template>
  <div class="user">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @ssBtnClick="handlssClick"
      @szBtnClick="handlszClick"
    />
  </div>
  <page-content
    ref="pageContentRef"
    :contentTableConfig="contentTableConfig"
    pageName="users"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
  >
  </page-content>
  <page-model
    pageName="users"
    :defaultInfo="defaultInfo"
    ref="pageModealRef"
    :modalConfig="modalConfigRef"
  ></page-model>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import pageSearch from '@/components/page-search'
// import YwTable from '@/base-ui/table'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'
// import YwForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'users',
  components: {
    pageSearch,
    PageContent,
    PageModel
    // YwForm
    // searchFormConfig
  },
  setup() {
    const [pageContentRef, handlszClick, handlssClick] = usePageSearch()
    //  pageModal 相关的hook逻辑
    // 处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.fromItems.find(
        (items) => items.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.fromItems.find(
        (items) => items.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 2.动态添加部门和角色列表，划重点。没敲代码。听完理清一下思路
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.fromItems.find(
        (items) => items.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      const roleItem = modalConfig.fromItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    const [pageModealRef, handleNewData, defaultInfo, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handlssClick,
      handlszClick,
      pageContentRef,
      modalConfigRef,
      handleEditData,
      handleNewData,
      pageModealRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
