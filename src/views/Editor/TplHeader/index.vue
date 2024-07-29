<template>
  <div class="editor-header">
    <div class="left">
      <IconArrowCircleLeft class="icon hand" @click="() => router.push('/home')" />

      <div class="title">
        <Input
          class="title-input"
          ref="titleInputRef"
          v-model:value="titleValue"
          @blur="handleUpdateTitle()"
          v-if="editingTitle"
        ></Input>
        <div class="title-text" @click="startEditTitle()" :title="title" v-else>{{ title }}</div>
      </div>
    </div>

    <div class="right">
      <a-button>保存模板</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'

import Input from '@/components/Input.vue'

const router = useRouter()
const slidesStore = useSlidesStore()
const { title } = storeToRefs(slidesStore)

const editingTitle = ref(false)
const titleInputRef = ref<InstanceType<typeof Input>>()
const titleValue = ref('')

const startEditTitle = () => {
  titleValue.value = title.value
  editingTitle.value = true
  nextTick(() => titleInputRef.value?.focus())
}

const handleUpdateTitle = () => {
  slidesStore.setTitle(titleValue.value)
  editingTitle.value = false
}
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  font-size: 18px;
  color: #666;
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
    color: #000;
  }
}
.title {
  height: 32px;
  margin-left: 2px;
  font-size: 13px;

  .title-input {
    width: 200px;
    height: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  .title-text {
    min-width: 20px;
    max-width: 400px;
    line-height: 32px;
    padding: 0 6px;
    border-radius: $borderRadius;
    cursor: pointer;

    @include ellipsis-oneline();

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
.github-link {
  display: inline-block;
  height: 30px;
}
</style>
