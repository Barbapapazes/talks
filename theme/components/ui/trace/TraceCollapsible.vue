<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { Collapsible } from '../collapsible'

const props = defineProps<CollapsibleRootProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <Collapsible v-slot="slotProps" data-slot="trace-collapsible" v-bind="forwarded" class="ui-trace-collapsible">
    <slot v-bind="slotProps" />
  </Collapsible>
</template>

<style scoped>
.ui-trace-collapsible { display: flex; width: 100%; min-width: 0; flex-direction: column; }
</style>
