<template>
  <div class="yw-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHeader"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 勾选框按钮 -->
      <el-table-column
        v-if="showCheck"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showNumerical"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <!-- 绑定作用域插槽,列中的插槽 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// total，需要动态获取，谁用组件谁传递
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    showNumerical: {
      type: Boolean,
      default: false
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      dfeault: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // const page = ref({ ...props.ipage })
    // 监听整个分页器数据的触发
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    // 分页器自带监听函数
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  // 上下0，左右45
  padding: 0 45px;
  // 分两边排列
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    // 加粗
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;
  .el-pagination {
    justify-content: right;
    padding-bottom: 15px;
  }
}
</style>
