<template>
  <div class="toolbar">
    <p class="toolbar-header">标记模板</p>
    <div class="content">
      <Select
        :options="[
          { label: '首页', value: 0.5625 },
          { label: '目录页', value: 0.625 },
          { label: '内容页', value: 0.75 },
          { label: '尾页', value: 1.41421356 },
        ]"
      />
      <br />
      <hr />
      <a-button>标记为 标题</a-button>
      <a-button>标记为 内容</a-button>
      <a-button>标记为 目录列表</a-button>
      {{ currentPanelComponent }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Select from '@/components/Select.vue'
import { useMainStore } from '@/store'

const { activeElementIdList, activeElementList, handleElement, activeGroupElementId } = storeToRefs(useMainStore())

const currentPanelComponent = computed<unknown>(() => {
  if (activeElementIdList.value.length > 1) {
    if (!activeGroupElementId.value) return null

    const activeGroupElement = activeElementList.value.find((item) => item.id === activeGroupElementId.value)
    return activeGroupElement
  }

  return handleElement.value
})
</script>

<style lang="scss" scoped>
.toolbar {
  border-left: solid 1px $borderColor;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.toolbar-header {
  border-bottom: solid 1px $borderColor;
  line-height: 39px;
  padding: 0 12px;
  font-size: 13px;
}
.content {
  padding: 12px;
  font-size: 13px;

  @include overflow-overlay();
}
</style>
