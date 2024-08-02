<template>
  <div class="template-mark">
    <Select v-model:value="pageType" :options="SlideTypeDictionary" />
    <div class="element-tags" v-if="!!currentText">
      <a-button
        v-for="item in TagDictionary"
        :key="item.key"
        :class="{ active: activeType === item.key }"
        @click="makeTagTitle(item.key)"
        >标记为 {{ item.name }}</a-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Select from '@/components/Select.vue'
import { useMainStore } from '@/store'
import type { SlideType, TagType } from '@/types/slides'

// #region 页面标记
const SlideTypeDictionary: { value: SlideType; label: string }[] = [
  { label: '首页', value: 'index' },
  { label: '目录页', value: 'catalog' },
  { label: '(章节)标题页', value: 'title-only' },
  { label: '内容页', value: 'content' },
  { label: '无标记页', value: 'not-template' }
]
const pageType = ref('content')
watch(pageType, (val) => {
  console.log('此页变更为', val)
})
// #endregion

// #region 元素标记
const TagDictionary: { key: TagType; name: string }[] = [
  { key: 'TITLE', name: '标题' },
  { key: 'SUB_TITLE', name: '子标题' },
  { key: 'CONTENT', name: '内容' },
  { key: 'CATALOG', name: '目录列表' }
]

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
  }
})

const activeType = computed(() => {
  if (!currentText.value) return ''
  return ['TITLE', 'SUB_TITLE', 'CATALOG', 'CONTENT'].find((key) => currentText.value.includes('$' + key + '$'))
})

function makeTagTitle(tag: TagType) {
  let html = currentText.value
  if (!html) return
  html = html.replace(/\>[^\<]+\</g, '>$' + tag + '$<')
  console.log('=====>', html, html.replace)
  currentText.value = html
}
// #endregion
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
