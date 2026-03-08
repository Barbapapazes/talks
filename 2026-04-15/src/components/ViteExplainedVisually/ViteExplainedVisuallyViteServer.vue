<script lang="ts" setup>
import ViteExplainedVisuallyBox from './ViteExplainedVisuallyBox.vue'

defineSlots<{
  default: () => any
}>()
</script>

<template>
  <ViteExplainedVisuallyBox class="flex items-center justify-center w-50 aspect-16/10">
    <img src="/vite-icon-color-dark.svg" alt="Vite logo">

    <slot />
  </ViteExplainedVisuallyBox>
</template>
