<template>
  <a-modal v-model:open="isPopup" :title="!currRow ? '添加' : '编辑'">
    <a-form
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item label="Username" name="username" :rules="[{ required: true, message: '必填!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: '必填!' }]">
        <a-input v-model:value="formState.password" />
      </a-form-item>

      <a-button
        type="primary"
        html-type="submit"
        :loading="isLoading"
        style="position: absolute; right: 24px; z-index: 1"
        >保存</a-button
      >
    </a-form>
    <template #footer>
      <a-button @click="isPopup = false">取消</a-button>
      <a-button>占位</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const isPopup = ref(false)
const isLoading = ref(false)
const currRow = ref<any>(null)

const formState = reactive({
  username: '',
  password: '',
})

const onFinish = (values: any) => {
  console.log('Success:', values)
}

defineExpose({
  openDialog(row: any) {
    console.log('openDialog', row)
    currRow.value = row
    isPopup.value = true
  },
  closeDialog() {
    isPopup.value = false
  },
})
</script>
