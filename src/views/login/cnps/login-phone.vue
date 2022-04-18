<template>
  <div class="login-phone">
    <el-form :rules="rules2" :model="xphone">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="xphone.phone"
      /></el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="xphone.code" />
          <el-button type="primary" class="but">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { defineComponent, reactive, ref } from 'vue'
import { rules2 } from '../config/phone-config'
import LocalCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const xphone = reactive({
      phone: '',
      code: ''
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
            LocalCache.setCache('phone', xphone.phone)
            LocalCache.setCache('code', xphone.code)
          } else {
            LocalCache.deleteCache('phone')
            LocalCache.deleteCache('code')
          }
          // 开始进行登录验证
          store.dispatch('accountLoginAction', { ...xphone })
          // 逻辑：网络请求，拿到数据后处理
          // 2，数据的保存到某一个位置，31-41
          // 3.发送其他请求（请求当前用户的信息）
          // 4.拿到用户的菜单
          // 5.调到首页
        }
      })
    }
    return { xphone, rules2, loginAction }
  }
})
</script>

<style scoped lang="less">
.login-phone {
  .get-code {
    display: flex;
    .but {
      margin-left: 8px;
    }
  }
}
</style>
