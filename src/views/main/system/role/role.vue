<template>
  <div class="role">
    <pageSearch :searchFormConfig="searchFormConfig" />
  </div>
  <page-content
    @newBtnClick="handleNewData"
    @editBtnClick="handleEditData"
    :contentTableConfig="contentTableConfig"
    pageName="role"
  >
  </page-content>
  <page-model
    ref="pageModealRef"
    :defaultInfo="defaultInfo"
    :otherInfo="otherInfo"
    :modalConfig="modalConfig"
    pageName="role"
  >
    <div class="menu-list">
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleTreeData"
      />
    </div>
  </page-model>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    PageContent,
    PageModel
  },
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModealRef, handleNewData, defaultInfo, handleEditData] =
      usePageModal(undefined, editCallBack)
    const store = useStore()
    // 系统总功能树
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    // 角色权限选择按钮
    const handleTreeData = (data1: any, data2: any) => {
      const checkedKeys = data1.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModealRef,
      handleNewData,
      defaultInfo,
      handleEditData,
      menus,
      otherInfo,
      handleTreeData,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-list {
  padding-left: 24px;
}
</style>
