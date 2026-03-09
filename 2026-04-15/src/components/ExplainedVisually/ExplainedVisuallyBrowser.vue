<script lang="ts" setup>
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = defineProps<{
  address?: string
}>()

defineSlots<{
  default?: () => any
}>()
</script>

<template>
  <ExplainedVisuallyBox class="flex aspect-16/10 w-50 flex-col overflow-hidden">
    <div class="flex flex-row gap-4 border-b border-neutral-200 bg-neutral-50 p-2">
      <div class="flex flex-row gap-1">
        <div class="size-2 rounded-full bg-red-500" />
        <div class="size-2 rounded-full bg-yellow-500" />
        <div class="size-2 rounded-full bg-green-500" />
      </div>
      <div class="h-2 grow rounded-sm border border-neutral-200 bg-neutral-100 text-sm max-w-1/2" />
    </div>

    <div class="grow flex items-center justify-center text-neutral-700">
      <slot>
        {{ props.address }}
      </slot>
    </div>
  </ExplainedVisuallyBox>
</template>
