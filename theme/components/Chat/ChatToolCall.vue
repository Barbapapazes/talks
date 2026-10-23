<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  arguments: string
  status?: 'requested' | 'running' | 'completed'
  result?: string
}>(), {
  status: 'requested',
})

const labels = {
  requested: 'Requested by model',
  running: 'Running in application',
  completed: 'Completed by application',
}
</script>

<template>
  <div class="chat-tool-call">
    <div class="tool-heading">
      <span class="tool-name"><span class="i-ph-wrench size-4" aria-hidden="true" />{{ name }}</span>
      <span class="tool-status" :class="{ completed: status === 'completed' }" role="status">{{ labels[status] }}</span>
    </div>
    <div class="tool-section">
      <div class="tool-label">
        Tool call
      </div>
      <pre class="tool-code">{{ arguments }}</pre>
    </div>
    <div v-if="status === 'completed' && result !== undefined" class="tool-section tool-result">
      <div class="tool-label">
        Tool result
      </div>
      <pre class="tool-code">{{ result }}</pre>
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
}
.tool-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--slidev-code-font-family);
  font-size: 15px;
  font-weight: 600;
}
.tool-status, .tool-label {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  font-size: 11px;
}
.tool-status.completed {
  --at-apply: text-teal-700 dark:text-teal-400;
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
}
</style>
