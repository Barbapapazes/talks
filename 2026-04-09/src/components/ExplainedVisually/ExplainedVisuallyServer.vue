<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { computed } from 'vue'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = withDefaults(defineProps<{
  logoAlt?: string
  logoSrc?: string
  class?: any
  ui?: Partial<typeof explainedVisuallyServer.slots>
}>(), {
  logoAlt: 'Server logo',
  logoSrc: '/vite-icon-color-dark.svg',
})

defineSlots<{
  default?: () => any
  status?: () => any
}>()

const explainedVisuallyServer = tv({
  slots: {
    base: 'relative flex aspect-16/10 w-50 items-center justify-center',
    img: 'size-20',
  },
})

const ui = computed(() => explainedVisuallyServer())
</script>

<template>
  <ExplainedVisuallyBox :class="ui.base({ class: [props.ui?.base, props.class] })">
    <img :src="props.logoSrc" :alt="props.logoAlt" :class="ui.img({ class: props.ui?.img })">

    <slot />
  </ExplainedVisuallyBox>
</template>
