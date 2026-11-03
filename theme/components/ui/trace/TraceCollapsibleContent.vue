<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import { CollapsibleContent } from '../collapsible'

const props = defineProps<CollapsibleContentProps>()
</script>

<template>
  <CollapsibleContent data-slot="trace-collapsible-content" v-bind="props" class="ui-trace-collapsible-content">
    <div data-slot="trace-collapsible-content-inner">
      <slot />
    </div>
  </CollapsibleContent>
</template>

<style scoped>
.ui-trace-collapsible-content { min-width: 0; overflow: hidden; }
.ui-trace-collapsible-content > div { min-width: 0; overflow-wrap: anywhere; }
</style>
