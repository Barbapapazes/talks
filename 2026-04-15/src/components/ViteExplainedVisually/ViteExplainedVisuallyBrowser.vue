<script lang="ts" setup>
import ViteExplainedVisuallyBox from './ViteExplainedVisuallyBox.vue'

defineSlots<{
  default: () => any
}>()
</script>

<template>
  <ViteExplainedVisuallyBox class="w-50 aspect-16/10 overflow-hidden flex flex-col">
    <div class="bg-neutral-50 flex flex-row gap-4 border-b border-neutral-200 p-2">
      <div class="flex flex-row gap-1">
        <div class="size-2 bg-red-500 rounded-full" />
        <div class="size-2 bg-yellow-500 rounded-full" />
        <div class="size-2 bg-green-500 rounded-full" />
      </div>
      <div class="grow max-w-1/2 h-2 text-sm border border-neutral-200 bg-neutral-100 rounded-sm" />
    </div>

    <div class="grow flex items-center justify-center text-neutral-700">
      <slot />
    </div>
  </ViteExplainedVisuallyBox>
</template>
