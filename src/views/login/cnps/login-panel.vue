<template>
  <div class="login-panel">
    <h1 class="ht">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon
              ><svg
                class="icon"
                width="200"
                height="200"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-042ca774=""
              >
                <path
                  fill="currentColor"
                  d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"
                ></path></svg></el-icon
            >密码登录
          </span>
        </template>
        <loginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phonp">
        <template #label>
          <span>
            <el-icon
              ><svg
                class="icon"
                width="200"
                height="200"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-042ca774=""
              >
                <path
                  fill="currentColor"
                  d="M224 768v96.064a64 64 0 0064 64h448a64 64 0 0064-64V768H224zm0-64h576V160a64 64 0 00-64-64H288a64 64 0 00-64 64v544zm32 288a96 96 0 01-96-96V128a96 96 0 0196-96h512a96 96 0 0196 96v768a96 96 0 01-96 96H256zm304-144a48 48 0 11-96 0 48 48 0 0196 0z"
                ></path></svg></el-icon
            >手机登录
          </span>
        </template>
        <loginPhone ref="honeRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="mima">
      <el-checkbox v-model="iskeepPassword"> 记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handlelLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const iskeepPassword = ref(true)
    // const name = ref<string>()
    // 声明绑定一个account的ref事件用来跟组件绑定，
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    // 这里定义了应该显示那一页
    const currentTab = ref('account')
    // 立即登录续绑定点击事件，在立即登录此处运用上面的绑定事件
    const handlelLoginClick = () => {
      if (currentTab.value === 'account') {
        // console.log('立即登录')
        accountRef.value?.loginAction(iskeepPassword.value)
      } else {
        console.log('phonp调用loginAction')
      }
    }
    return {
      iskeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handlelLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 130px;
  width: 320px;
  .ht {
    text-align: center;
  }
  .mima {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
