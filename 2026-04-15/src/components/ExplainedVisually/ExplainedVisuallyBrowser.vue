<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { computed } from 'vue'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = defineProps<{
  address?: string
  class?: any
  ui?: Partial<typeof explainedVisuallyBrowser.slots>
}>()

defineSlots<{
  default?: () => any
}>()

const explainedVisuallyBrowser = tv({
  slots: {
    base: 'flex aspect-16/10 w-50 flex-col overflow-hidden',
    lightTrafficContainer: 'flex flex-row gap-1',
    lightTraffic: 'size-2 rounded-full',
    search: 'h-2 grow rounded-sm border border-neutral-200 bg-neutral-100 text-sm max-w-1/2',
    address: 'grow flex items-center justify-center text-neutral-700',
  },
})

const ui = computed(() => explainedVisuallyBrowser())
</script>

<template>
  <ExplainedVisuallyBox :class="ui.base({ class: [props.ui?.base, props.class] })">
    <div class="flex flex-row gap-4 border-b border-neutral-200 bg-neutral-50 p-2">
      <div :class="ui.lightTrafficContainer({ class: props.ui?.lightTrafficContainer })">
        <div class="bg-red-500" :class="ui.lightTraffic({ class: props.ui?.lightTraffic })" />
        <div class="bg-yellow-500" :class="ui.lightTraffic({ class: props.ui?.lightTraffic })" />
        <div class="bg-green-500" :class="ui.lightTraffic({ class: props.ui?.lightTraffic })" />
      </div>
      <div :class="ui.search({ class: props.ui?.search })" />
    </div>

    <div v-if="props.address" :class="ui.address({ class: props.ui?.address })">
      <slot>
        {{ props.address }}
      </slot>
    </div>
  </ExplainedVisuallyBox>
</template>
