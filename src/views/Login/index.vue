<template>
  <section class="login-page">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <h1>登录管理端</h1>
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
    </a-form>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import useAuth from '@/hooks/useAuth'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  useAuth().setToken('hahah')
  location.reload()
}
</script>

<style>
.login-page {
  height: 100vh;
  background: linear-gradient(180deg, #2d3a4b 0%, #4c7cc3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-page h1 {
  font-size: 20px;
  margin-bottom: 24px;
  /* text-align: center; */
}

.login-page .ant-form {
  padding: 32px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
}
</style>
