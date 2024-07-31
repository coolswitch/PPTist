<template>
  <section class="template-manage">
    <HomeHeaderTeleport>
      <a-button type="primary" @click="openDialog()">添加管理员</a-button>
    </HomeHeaderTeleport>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link">删除</a-button>
          <a-button type="link" @click="openDialog(record)">编辑</a-button>
        </template>
      </template>
    </a-table>
    <!-- 编辑/添加 -->
    <DialogAccount ref="dialogRef"></DialogAccount>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HomeHeaderTeleport from '@/layout/HomeHeaderTeleport.vue'
import DialogAccount from './DialogAccount.vue'

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

const dialogRef = ref<InstanceType<typeof DialogAccount> | null>()
function openDialog(row?: any) {
  console.log('openDialog', row)
  dialogRef.value?.openDialog(row)
}
</script>
