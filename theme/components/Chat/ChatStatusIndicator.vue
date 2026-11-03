<script lang="ts" setup>
defineProps<{
  status: 'searching' | 'thinking'
}>()
</script>

<template>
  <div class="chat-status chat-ui flex" role="status">
    <div class="w-4/5">
      <div class="status-content flex items-center gap-2">
        <span v-if="status === 'searching'" class="spinner" aria-hidden="true" />
        <span v-else class="thinking-dots" aria-hidden="true">
          <span>.</span><span>.</span><span>.</span>
        </span>
        <span class="text-sm">{{ status === 'searching' ? 'Searching...' : 'Thinking...' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-content { color: var(--ui-muted-foreground); }
.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--ui-border);
  border-top-color: var(--ui-ring);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.thinking-dots {
  display: flex;
  gap: 0.25rem;
}
.thinking-dots span {
  animation: bounce 1.4s infinite ease-in-out;
  font-size: 1.5rem;
  line-height: 1;
}
.thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
.thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
  40% { transform: translateY(-4px); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .spinner, .thinking-dots span { animation: none; }
}
</style>
