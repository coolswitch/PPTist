<template>
  <div class="template-mark">
    <!-- type?: 'title-only' | 'catalog' | 'content' | 'not-template' -->
    <Select
      v-model:value="type"
      :options="[
        { label: '首页', value: 'index' },
        { label: '目录页', value: 'catalog' },
        { label: '(章节)标题页', value: 'title-only' },
        { label: '内容页', value: 'content' },
        { label: '无标记页', value: 'not-template' },
      ]"
    />
    <div class="element-tags" v-if="!!currentText">
      <a-button :class="{ active: activeType === 'TITLE' }" @click="makeTagTitle('TITLE')">标记为 标题</a-button>
      <br /><br />
      <a-button :class="{ active: activeType === 'SUB_TITLE' }" @click="makeTagTitle('SUB_TITLE')"
        >标记为 子标题</a-button
      >
      <br /><br />
      <a-button :class="{ active: activeType === 'CONTENT' }" @click="makeTagTitle('CONTENT')"> 标记为 内容</a-button>
      <br /><br />
      <a-button :class="{ active: activeType === 'CATALOG' }" @click="makeTagTitle('CATALOG')">
        标记为 目录列表</a-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Select from '@/components/Select.vue'
import { useMainStore } from '@/store'
import type { SlideType } from '@/types/slides'

const type = ref('content')
const { activeElementIdList, activeElementList, handleElement, activeGroupElementId } = storeToRefs(useMainStore())

const currentPanelComponent = computed(() => {
  if (activeElementIdList.value.length > 1) {
    if (!activeGroupElementId.value) return null

    const activeGroupElement = activeElementList.value.find((item) => item.id === activeGroupElementId.value)
    return activeGroupElement
  }

  return handleElement.value
})

const currentText = computed({
  get() {
    return currentPanelComponent.value?.text?.content || currentPanelComponent.value?.content
  },
  set(html: string) {
    if (!currentPanelComponent.value) return
    if (currentPanelComponent.value.text?.content) {
      currentPanelComponent.value.text.content = html
    } else {
      currentPanelComponent.value.content = html
    }
  },
})

const activeType = computed(() => {
  if (!currentText.value) return ''
  return ['TITLE', 'SUB_TITLE', 'CATALOG', 'CONTENT'].find((key) => currentText.value.includes('$' + key + '$'))
})

function makeTagTitle(tag: 'TITLE' | 'SUB_TITLE' | 'CATALOG' | 'CONTENT') {
  let html = currentText.value
  if (!html) return
  html = html.replace(/\>[^\<]+\</g, '>$' + tag + '$<')
  console.log('=====>', html, html.replace)
  currentText.value = html
}
</script>

<style lang="scss" scoped>
.template-mark {
  .element-tags {
    border-top: solid 1px $borderColor;
    margin-top: 16px;
    padding-top: 16px;
    .active::before {
      content: '✅';
      display: inline-block;
      padding-right: 8px;
    }
  }
}
</style>
