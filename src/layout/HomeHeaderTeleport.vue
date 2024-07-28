<template>
  <Teleport v-if="mounted" to="#home-layout-header-left">
    <slot></slot>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const mounted = ref(false)
onMounted(() => (mounted.value = true))
</script>
