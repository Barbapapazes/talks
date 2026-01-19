<script lang="ts" setup>
defineProps<{
  status: 'searching' | 'thinking'
}>()
</script>

<template>
  <div class="flex">
    <div class="w-4/5">
      <div v-if="status === 'searching'" class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <div class="spinner" />
        <span class="text-sm">Searching...</span>
      </div>
      <div v-if="status === 'thinking'" class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <div class="thinking-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
        <span class="text-sm">Thinking...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.dark .spinner {
  border-color: #4b5563;
  border-top-color: #3b82f6;
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

.thinking-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.thinking-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
</style>
