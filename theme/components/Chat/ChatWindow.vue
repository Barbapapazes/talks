<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  status?: string
  fullscreen?: boolean
}>(), {
  label: 'Chat',
})
</script>

<template>
  <section class="chat-window not-content" :class="{ 'chat-window-fullscreen': fullscreen }" :aria-label="label">
    <header class="chat-window-header">
      <span class="chat-window-label"><span class="i-ph-chat-circle-text size-4" aria-hidden="true" />{{ label }}</span>
      <span v-if="status" class="chat-window-status" role="status">{{ status }}</span>
    </header>
    <div class="chat-window-messages" aria-live="polite">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.chat-window {
  --at-apply: border border-neutral-200 bg-white rounded-2xl dark:border-neutral-700 dark:bg-neutral-900;
  height: 382px;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.45;
}
.chat-window-fullscreen {
  position: absolute;
  inset: 0;
  height: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}
.chat-window-fullscreen .chat-window-messages {
  width: min(100%, 72ch);
  margin-inline: auto;
  padding-top: 16px;
}
.chat-window-header {
  --at-apply: border-b border-neutral-200 dark:border-neutral-700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 12px;
}
.chat-window-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
.chat-window-status {
  --at-apply: text-neutral-500 dark:text-neutral-400;
}
.chat-window-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px 16px;
}
.chat-window-messages :deep(.assistant-content p:last-child) {
  margin-bottom: 0;
}
.chat-window-messages :deep(.bg-neutral-100) {
  --at-apply: dark:bg-neutral-800;
}
</style>
