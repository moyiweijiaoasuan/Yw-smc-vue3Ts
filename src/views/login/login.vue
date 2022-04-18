<template>
  <div class="login">
    <login-lanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginLanel from './cnps/login-panel.vue'
export default defineComponent({
  components: {
    loginLanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
