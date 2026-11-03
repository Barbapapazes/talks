<script setup lang="ts">
import { computed, ref } from 'vue'
import Badge from '../ui/badge/Badge.vue'
import CodeBlock from '../ui/code-block/CodeBlock.vue'
import CodeBlockContent from '../ui/code-block/CodeBlockContent.vue'
import Trace from '../ui/trace/Trace.vue'
import TraceCollapsible from '../ui/trace/TraceCollapsible.vue'
import TraceCollapsibleContent from '../ui/trace/TraceCollapsibleContent.vue'
import TraceCollapsibleTrigger from '../ui/trace/TraceCollapsibleTrigger.vue'
import TraceIcon from '../ui/trace/TraceIcon.vue'
import TraceLine from '../ui/trace/TraceLine.vue'
import TraceTitle from '../ui/trace/TraceTitle.vue'

const props = withDefaults(defineProps<{
  name: string
  arguments?: string
  compact?: boolean
  status?: 'requested' | 'running' | 'completed'
  result?: string
}>(), {
  status: 'requested',
})

const expanded = ref(false)
const expandable = computed(() => props.compact && (props.arguments !== undefined || props.result !== undefined))
const showDetails = computed(() => !props.compact || expanded.value)

const labels = {
  requested: 'Requested',
  running: 'Running',
  completed: 'Completed',
}
</script>

<template>
  <Trace class="chat-tool-call chat-ui" :data-status="status" :class="{ 'tool-compact': compact }">
    <TraceCollapsible :open="showDetails" @update:open="expanded = $event">
      <TraceCollapsibleTrigger v-if="expandable" class="tool-heading" @keydown.stop>
        <TraceLine class="tool-name" :status="status === 'running' ? 'running' : undefined">
          <TraceIcon>
            <span class="size-4" :class="status === 'running' ? 'i-ph-spinner-gap animate-spin' : 'i-ph-wrench'" />
          </TraceIcon>
          <TraceTitle>{{ name }}</TraceTitle>
        </TraceLine>
        <Badge class="tool-status" :variant="status === 'completed' ? 'secondary' : 'outline'" role="status">
          {{ labels[status] }}
        </Badge>
        <template #indicator>
          <span class="i-ph-caret-down size-4" />
        </template>
      </TraceCollapsibleTrigger>
      <div v-else class="tool-heading">
        <TraceLine class="tool-name" :status="status === 'running' ? 'running' : undefined">
          <TraceIcon>
            <span class="size-4" :class="status === 'running' ? 'i-ph-spinner-gap animate-spin' : 'i-ph-wrench'" />
          </TraceIcon>
          <TraceTitle>{{ name }}</TraceTitle>
        </TraceLine>
        <Badge class="tool-status" :variant="status === 'completed' ? 'secondary' : 'outline'" role="status">
          {{ labels[status] }}
        </Badge>
      </div>
      <TraceCollapsibleContent v-if="showDetails">
        <CodeBlock v-if="arguments !== undefined" size="sm" class="tool-section">
          <div class="tool-label">
            Input
          </div>
          <CodeBlockContent :code="arguments" language="json" wrap class="tool-code" @keydown.stop />
        </CodeBlock>
        <CodeBlock v-if="status === 'completed' && result !== undefined" size="sm" class="tool-section tool-result">
          <div class="tool-label">
            Output
          </div>
          <CodeBlockContent :code="result" language="json" wrap class="tool-code" @keydown.stop />
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>

<style scoped>
.chat-tool-call {
  border: 1px solid var(--ui-border);
  background: var(--ui-background);
  border-radius: var(--ui-radius-lg);
  overflow: hidden;
}
.tool-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  gap: 12px;
  width: 100%;
  height: auto;
  text-align: left;
  color: inherit;
  font: inherit;
  border-radius: 0;
  background: var(--ui-elevated);
}
button.tool-heading:focus-visible {
  outline-offset: -3px;
}
.tool-heading[aria-expanded='true'] :deep(.trace-indicator) { transform: rotate(180deg); }
.tool-status { margin-left: auto; }
.chat-tool-call[data-status='completed'] :deep(.tool-status) {
  color: var(--ui-primary);
  background: color-mix(in srgb, var(--ui-primary) 10%, var(--ui-background));
}
.chat-tool-call[data-status='running'] :deep([data-slot='trace-icon']) { color: var(--ui-primary); }
.tool-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  font-family: var(--slidev-code-font-family);
  font-size: 14px;
  font-weight: 500;
}
.tool-label {
  color: var(--ui-muted-foreground);
  font-size: 11px;
}
.tool-section {
  border: 0;
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--ui-border);
  padding: 10px 14px;
}
.tool-code {
  margin: 5px 0 0;
  padding: 0;
  background: transparent;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .animate-spin { animation: none; }
}
</style>
