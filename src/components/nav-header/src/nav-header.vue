<template>
  <div class="nav-header">
    <el-icon @click="isIcon" v-if="isIconInfo"><fold /></el-icon>
    <el-icon @click="isIcon" v-else><expand /></el-icon>
    <div class="content">
      <YwBreadcrumb :breadcrumbs="breadcrumbs" />
      <userInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
import YwBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    userInfo,
    YwBreadcrumb
  },
  emits: ['isIconchange'],
  setup(props, { emit }) {
    const isIconInfo = ref(false)
    const isIcon = () => {
      isIconInfo.value = !isIconInfo.value
      emit('isIconchange', isIconInfo.value)
    }

    // 面包屑数据[{name,path:}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return { isIconInfo, isIcon, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  // height: 48px;
  width: 100%;
  // line-height: 48px;
  .el-icon {
    // line-height: 48px;
    // margin-top: 11px;
    text-align: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
