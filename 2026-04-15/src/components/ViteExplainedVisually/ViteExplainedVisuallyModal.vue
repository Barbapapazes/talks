<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'

defineSlots<{
  default: () => any
}>()

const open = defineModel<boolean>('open', { required: true })

const target = useTemplateRef('target')
onClickOutside(target, () => open.value = false)
</script>

<template>
  <template v-if="open">
    <div class="absolute inset-0 bg-black/20" />
    <div ref="target" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-3/4 bg-white border border-neutral-200 rounded-md shadow-lg flex flex-col">
      <slot />
    </div>
  </template>
</template>
