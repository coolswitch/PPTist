<template>
  <textarea v-model="jsonStr" style="width: 100%; height: 400px"></textarea>
  <button @click="render">将上述json渲染为ppt</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSlidesStore } from '@/store'
import { slides } from '@/mocks/slides'

const jsonStr = ref(JSON.stringify(slides, null, '    '))

function render() {
  try {
    const json = JSON.parse(jsonStr.value)
    if (json.length <= 0) {
      alert('没有解析到数据')
      return
    }
    useSlidesStore().setSlides(json)
  } catch (e) {
    alert('json格式化失败')
  }
}
</script>
