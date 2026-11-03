<script setup lang="ts">
import Trace from '../ui/trace/Trace.vue'
import TraceCollapsible from '../ui/trace/TraceCollapsible.vue'
import TraceCollapsibleContent from '../ui/trace/TraceCollapsibleContent.vue'
import TraceCollapsibleTrigger from '../ui/trace/TraceCollapsibleTrigger.vue'
import TraceLine from '../ui/trace/TraceLine.vue'
import TraceTitle from '../ui/trace/TraceTitle.vue'

defineProps<{
  expanded: boolean
}>()

const emit = defineEmits<{ 'update:expanded': [expanded: boolean] }>()
</script>

<template>
  <Trace class="chat-reasoning chat-ui">
    <TraceCollapsible :open="expanded" @update:open="emit('update:expanded', $event)">
      <TraceCollapsibleTrigger class="reasoning-heading" @keydown.stop>
        <TraceLine><TraceTitle>Reasoning</TraceTitle></TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent v-if="expanded" class="reasoning-content">
        <slot />
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>

<style scoped>
.chat-reasoning {
  color: var(--ui-muted-foreground);
  padding-top: 2px;
  font-size: 14px;
}
.reasoning-heading {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  color: inherit;
  font: inherit;
  font-weight: 500;
  background: transparent;
  border: 0;
  border-radius: var(--ui-radius);
  cursor: pointer;
}
.reasoning-heading:focus-visible {
  outline: 2px solid var(--ui-ring);
  outline-offset: 2px;
}
.reasoning-content {
  border-left: 2px solid var(--ui-border);
  margin: 8px 0 0 6px;
  padding-left: 14px;
  line-height: 1.5;
}
</style>
