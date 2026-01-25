<script lang="ts" setup>
defineProps<{
  value?: string
  showCursor?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div class="rounded-full border border-neutral-300 dark:border-neutral-700 shadow-lg bg-white dark:bg-neutral-900 px-6 py-3 flex flex-row justify-between items-start gap-3">
    <div class="flex-1 flex items-start min-h-[1.5rem]">
      <span v-if="!value && disabled" class="text-neutral-400">Type your message...</span>
      <span v-else class="whitespace-pre-wrap break-words">{{ value }}<span v-if="showCursor && !disabled" class="cursor">|</span></span>
    </div>
    <button :disabled="disabled" class="flex items-center disabled:opacity-50 flex-shrink-0 mt-0.5">
      <span class="i-ph-arrow-up-bold size-5" />
    </button>
  </div>
</template>

<style scoped>
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
