<script lang="ts" setup>
import type { ExplainedVisuallyClickValue } from './types'
import { tv } from 'tailwind-variants'
import { computed } from 'vue'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = withDefaults(defineProps<{
  logoAlt?: string
  logoSrc?: string
  statusClick: ExplainedVisuallyClickValue
  statusIcon?: string
  statusText?: string
  class?: any
  ui?: Partial<typeof explainedVisuallyServer.slots>
}>(), {
  logoAlt: 'Server logo',
  logoSrc: '/vite-icon-color-dark.svg',
  statusIcon: undefined,
  statusText: undefined,
})

defineSlots<{
  default?: () => any
  status?: () => any
}>()

const explainedVisuallyServer = tv({
  slots: {
    base: 'relative flex aspect-16/10 w-50 items-center justify-center',
    status: 'absolute bottom-1 left-1/2 flex flex-row gap-1 -translate-x-1/2 text-xs text-cyan-700 whitespace-nowrap',
    img: 'size-20',
  },
})

const ui = computed(() => explainedVisuallyServer())
</script>

<template>
  <ExplainedVisuallyBox :class="ui.base({ class: [props.ui?.base, props.class] })">
    <img :src="props.logoSrc" :alt="props.logoAlt" :class="ui.img({ class: props.ui?.img })">

    <slot />

    <div
      v-if="props.statusText || props.statusIcon || $slots.status"
      v-click="props.statusClick"
      :class="ui.status({ class: props.ui?.status })"
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
