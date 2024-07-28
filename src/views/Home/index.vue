<template>
  <section class="template-manage">
    <HomeHeaderTeleport>
      <a-button type="primary" @click="isPopup = true">导入新模板</a-button>
    </HomeHeaderTeleport>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link">删除</a-button>
          <a-button type="link">编辑</a-button>
        </template>
      </template>
    </a-table>
    <!-- 导入 -->
    <a-modal v-model:open="isPopup" title="导入">
      <a-input
        id="iptUpload"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        @change="handleImport"
      />
      <template #footer>
        <a-button @click="isPopup = false">取消</a-button>
        <a-button type="primary" :loading="isLoading" :disabled="isDisabled" @click="handleImport">导入</a-button>
      </template>
    </a-modal>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HomeHeaderTeleport from '@/layout/HomeHeaderTeleport.vue'

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
  {
    title: 'Action',
    key: 'action',
  },
]

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const isPopup = ref(false)
const isDisabled = ref(true)
const isLoading = ref(false)
let file: File | null = null
function handleImport(e: Event) {
  if (e.type === 'click') {
    console.log(file)
    isLoading.value = true
    setTimeout(() => {
      isPopup.value = false
    }, 3000)
  } else {
    const files = document.querySelector<HTMLInputElement>('#iptUpload')?.files
    if (!files?.length) return
    file = files[0]
    isDisabled.value = false
  }
}
</script>
