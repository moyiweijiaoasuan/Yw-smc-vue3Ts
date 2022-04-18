<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"
      /></el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import LocalCache from '@/utils/cache'
// import {ElForm}from 'element-plus'
export default defineComponent({
  setup() {
    const store = useStore()
    // 定义账号和密码的存储位置,和对象元素进行双向绑定
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (iskeepPassword: boolean) => {
      // validate,用来验证表单
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log(valid)
          // 判断是否需要记住密码
          if (iskeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
          // 开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
          // 逻辑：网络请求，拿到数据后处理
          // 2，数据的保存到某一个位置，31-41
          // 3.发送其他请求（请求当前用户的信息）
          // 4.拿到用户的菜单
          // 5.调到首页
        }
      })
    }
    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped></style>
