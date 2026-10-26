<script setup lang="ts">
import { computed, ref, useId } from 'vue'

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
const detailsId = useId()
const expandable = computed(() => props.compact && (props.arguments !== undefined || props.result !== undefined))
const showDetails = computed(() => !props.compact || expanded.value)

const labels = {
  requested: 'Requested',
  running: 'Running',
  completed: 'Completed',
}
</script>

<template>
  <div class="chat-tool-call" :class="{ 'tool-compact': compact }">
    <component
      :is="expandable ? 'button' : 'div'"
      class="tool-heading"
      :type="expandable ? 'button' : undefined"
      :aria-expanded="expandable ? expanded : undefined"
      :aria-controls="expandable ? detailsId : undefined"
      @click.stop="expanded = !expanded"
      @keydown.stop
    >
      <span class="tool-name">
        <span
          class="size-4"
          :class="status === 'running' ? 'i-ph-spinner-gap animate-spin' : 'i-ph-wrench'"
          aria-hidden="true"
        />
        {{ name }}
      </span>
      <span class="sr-only" role="status">{{ labels[status] }}</span>
      <span v-if="expandable" class="size-4" :class="expanded ? 'i-ph-caret-up' : 'i-ph-caret-down'" aria-hidden="true" />
    </component>
    <div v-if="showDetails" :id="detailsId">
      <div v-if="arguments !== undefined" class="tool-section">
        <div class="tool-label">
          Input
        </div>
        <pre class="tool-code">{{ arguments }}</pre>
      </div>
      <div v-if="status === 'completed' && result !== undefined" class="tool-section tool-result">
        <div class="tool-label">
          Output
        </div>
        <pre class="tool-code">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-tool-call {
  --at-apply: border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800;
  border-radius: 12px;
  overflow: hidden;
}
.tool-heading {
  --at-apply: border-b border-neutral-200 dark:border-neutral-700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  gap: 12px;
  width: 100%;
  text-align: left;
  color: inherit;
  font: inherit;
  background: transparent;
}
button.tool-heading {
  cursor: pointer;
}
button.tool-heading:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: -3px;
}
.tool-compact .tool-heading {
  border-bottom: 0;
}
.tool-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--slidev-code-font-family);
  font-size: 15px;
  font-weight: 600;
}
.tool-label {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  font-size: 11px;
}
.tool-section {
  padding: 10px 14px;
}
.tool-result {
  --at-apply: border-t border-neutral-200 dark:border-neutral-700;
}
.tool-code {
  margin: 5px 0 0;
  padding: 0;
  background: transparent;
  font-size: 15px;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
