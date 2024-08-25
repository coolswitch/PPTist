<template>
  <section class="login-page">
    <a-form ref="refForm" :model="formState" name="basic" autocomplete="off" @finish="onFinish">
      <h1>登录管理端</h1>
      <a-form-item
        label="手机号"
        name="phone"
        :rules="[{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号！' }]"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item label="验证码" name="code" :rules="[{ required: true, message: '请输入验证码！' }]">
        <a-input v-model:value="formState.code">
          <template #addonAfter>
            <span class="gray" v-if="timeCounter > 0">{{ timeCounter }}秒后重新发送</span>
            <span class="hand" v-else @click="handleSend">发送短信验证码</span>
          </template>
        </a-input>
      </a-form-item>
      <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
    </a-form>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useAuth from '@/hooks/useAuth'
import * as api from '@/api/account'
import { message } from 'ant-design-vue'

const refForm = ref()
const formState = reactive({ phone: '', code: '' })

const onFinish = () => {
  api
    .loginBySms(formState.phone, formState.code)
    .then((res) => {
      if (res.code !== 0) throw new Error(res.msg)
      const auth = useAuth()
      auth.setToken(res.data.token)
      auth.setUInfo(res.data.name, res.data.phone)
      location.reload()
    })
    .catch((err) => {
      message.error(err.message || err)
    })
}

function handleSend() {
  refForm.value
    .validateFields(['phone'])
    .then((res: any) => {
      if (!res.errorFields) sendSms()
    })
    .catch(() => {})
}

const timeCounter = ref(0)
let timer = 0
function sendSms() {
  timeCounter.value = 60
  timer = +setInterval(() => {
    timeCounter.value--
    if (timeCounter.value < 1) clearInterval(timer)
  }, 1000)

  api
    .sendSms(formState.phone)
    .then((res) => {
      if (res.code !== 0) throw new Error(res.msg)
    })
    .catch((err) => {
      clearInterval(timer)
      timeCounter.value = 0
      message.error(err.message || err)
    })
}
</script>

<style lang="scss">
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
  .ant-input-group-addon {
    background: #fff;
    .hand {
      line-height: 30px;
      font-size: 12px;
      color: #333;
    }
    .gray {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>
