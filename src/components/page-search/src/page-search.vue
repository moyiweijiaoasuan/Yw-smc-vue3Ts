<template>
  <div class="page-search">
    <yw-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="changeczClick"> 重置</el-button>
          <el-button @click="handlessClick">搜索</el-button>
        </div>
      </template>
    </yw-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YwForm from '@/base-ui/form'
export default defineComponent({
  components: {
    YwForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['szBtnClick', 'ssBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是有配置文件里到底field决定
    const formItems = props.searchFormConfig?.fromItems ?? []
    const formOriginData: any = {}
    for (const items of formItems) {
      formOriginData[items.field] = ''
    }
    // formData中的属性应该是动态决定的。
    const formData = ref(formOriginData)
    // 2优化：当用户点击重置
    const changeczClick = () => {
      // for in是遍历了键值对的。不止属性，属性名也会遍历
      // 查看对应传递位置，属于浅拷贝，通过键值对的深层方式去改动是可行的
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('szBtnClick')
    }
    // 点击用户搜索
    const handlessClick = () => {
      emit('ssBtnClick', formData.value)
    }
    return { formData, changeczClick, handlessClick }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  padding: 0 50px 25px 0;
}
</style>
