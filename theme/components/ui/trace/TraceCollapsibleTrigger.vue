<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
import { CollapsibleTrigger } from '../collapsible'
import TraceIcon from './TraceIcon.vue'

const props = defineProps<CollapsibleTriggerProps>()
</script>

<template>
  <CollapsibleTrigger data-slot="trace-collapsible-trigger" v-bind="props" class="ui-trace-collapsible-trigger">
    <slot />
    <TraceIcon class="trace-indicator">
      <slot name="indicator">
        <span class="i-ph-caret-right size-4" />
      </slot>
    </TraceIcon>
  </CollapsibleTrigger>
</template>

<style scoped>
.ui-trace-collapsible-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: var(--ui-radius);
  background: transparent;
  text-align: left;
  color: var(--ui-muted-foreground);
  font: inherit;
  cursor: pointer;
}
.ui-trace-collapsible-trigger:hover { color: var(--ui-foreground); }
.ui-trace-collapsible-trigger:focus-visible { outline: 2px solid var(--ui-ring); outline-offset: 2px; }
.ui-trace-collapsible-trigger[aria-expanded='true'] > .trace-indicator { transform: rotate(90deg); }
</style>
