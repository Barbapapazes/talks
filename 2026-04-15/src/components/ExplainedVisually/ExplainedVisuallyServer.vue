<script lang="ts" setup>
import type { ExplainedVisuallyClickValue } from './types'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = withDefaults(defineProps<{
  logoAlt?: string
  logoSrc?: string
  statusClass?: string
  statusClick: ExplainedVisuallyClickValue
  statusIcon?: string
  statusText?: string
}>(), {
  logoAlt: 'Server logo',
  logoSrc: '/vite-icon-color-dark.svg',
  statusClass: 'absolute bottom-1 left-1/2 flex flex-row gap-1 -translate-x-1/2 text-xs text-cyan-700',
  statusIcon: undefined,
  statusText: undefined,
})

defineSlots<{
  default?: () => any
  status?: () => any
}>()
</script>

<template>
  <ExplainedVisuallyBox class="relative flex aspect-16/10 w-50 items-center justify-center">
    <img :src="props.logoSrc" :alt="props.logoAlt">

    <slot />

    <div
      v-if="props.statusText || props.statusIcon || $slots.status"
      v-click="props.statusClick"
      :class="props.statusClass"
    >
      <slot name="status">
        <span v-if="props.statusIcon" :class="props.statusIcon" />
        <span v-if="props.statusText">
          {{ props.statusText }}
        </span>
      </slot>
    </div>
  </ExplainedVisuallyBox>
</template>
