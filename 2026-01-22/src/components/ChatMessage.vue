<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  type: 'user' | 'assistant'
  content: string
  showCursor?: boolean
}>()

const isUser = computed(() => props.type === 'user')
</script>

<template>
  <div class="flex" :class="{ 'pt-4 flex-row-reverse justify-start': isUser }">
    <div class="w-4/5" :class="{ 'px-4 py-3 rounded-2xl bg-neutral-200 dark:bg-neutral-800': isUser }">
      <template v-if="isUser">
        {{ props.content }}<span v-if="props.showCursor" class="cursor">|</span>
      </template>
      <div v-else class="assistant-content" v-html="content" />
    </div>
  </div>
</template>

<style scoped>
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 0.75s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.assistant-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 0.5rem;
}

.assistant-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.assistant-content :deep(p) {
  margin-bottom: 0.75rem;
}

.assistant-content :deep(strong) {
  font-weight: 600;
}

.assistant-content :deep(ul) {
  list-style: disc;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.assistant-content :deep(li) {
  margin-bottom: 0.25rem;
}

.assistant-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.assistant-content :deep(thead) {
  border-bottom: 2px solid #d1d5db;
}

.dark .assistant-content :deep(thead) {
  border-bottom-color: #4b5563;
}

.assistant-content :deep(th) {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  background-color: #f9fafb;
}

.dark .assistant-content :deep(th) {
  background-color: #1f2937;
}

.assistant-content :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .assistant-content :deep(td) {
  border-bottom-color: #374151;
}

.assistant-content :deep(tr:last-child td) {
  border-bottom: none;
}
</style>
