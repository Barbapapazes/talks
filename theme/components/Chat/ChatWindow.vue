<script setup lang="ts">
import Badge from '../ui/badge/Badge.vue'

withDefaults(defineProps<{
  label?: string
  status?: string
  fullscreen?: boolean
}>(), {
  label: 'Chat',
})
</script>

<template>
  <section class="chat-window chat-ui not-content" :class="{ 'chat-window-fullscreen': fullscreen }" :aria-label="label">
    <header class="chat-window-header">
      <span class="chat-window-label"><span class="i-ph-chat-circle-text size-4" aria-hidden="true" />{{ label }}</span>
      <slot name="actions">
        <Badge v-if="status" variant="secondary" role="status">
          {{ status }}
        </Badge>
      </slot>
    </header>
    <div class="chat-window-messages" aria-live="polite">
      <slot />
    </div>
    <slot name="footer" />
  </section>
</template>

<style scoped>
.chat-window {
  border: 1px solid var(--ui-border);
  background: var(--ui-background);
  border-radius: var(--ui-radius-lg);
  box-shadow: var(--ui-shadow);
  display: flex;
  flex-direction: column;
  height: 382px;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.5;
}
.chat-window-fullscreen {
  position: absolute;
  inset: 0;
  height: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.chat-window-fullscreen .chat-window-messages {
  width: min(100%, 72ch);
  margin-inline: auto;
  padding-top: 16px;
}
.chat-window-header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--ui-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 14px;
  background: var(--ui-elevated);
}
.chat-window-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--ui-highlighted);
}
.chat-window-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px;
}
.chat-window-messages :deep(.assistant-content p:last-child) {
  margin-bottom: 0;
}
</style>
