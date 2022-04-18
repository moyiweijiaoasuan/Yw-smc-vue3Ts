<template>
  <div class="page-content">
    <yw-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 头部插槽header -->
      <template #headerHeader>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <!-- <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template> -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formtTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formtTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div>
          <el-button
            v-if="isUpdate"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="small"
            type="text"
            @click="handleshanchuClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in dongTaisoltData"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </yw-table>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import ywTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  components: {
    ywTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 0.获取操作的权限
    const isCreate = usePermission(`${props.pageName}`, 'create')
    const isUpdate = usePermission(`${props.pageName}`, 'update')
    const isDelete = usePermission(`${props.pageName}`, 'delete')
    const isQuery = usePermission(`${props.pageName}`, 'query')
    // 1双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageDatas()
    })
    // 2发送网络请求,写成函数可多次调用
    const getPageDatas = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageDatas()
    //3 从vuex获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageCountData`](props.pageName)
    )
    // 4,获取其他的动态插槽名称，filer过滤
    const dongTaisoltData = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'oldPrice') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // s删除操作
    const handleshanchuClick = (items: any) => {
      store.dispatch('system/daletePageDataAction', {
        pageName: props.pageName,
        id: items.id
      })
    }
    // 新建用户
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑用户
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      getPageDatas,
      dataCount,
      pageInfo,
      dongTaisoltData,
      isCreate,
      isUpdate,
      isDelete,
      handleshanchuClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding-top: 20px;
}
</style>
