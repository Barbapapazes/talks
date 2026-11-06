<script lang="ts" setup>
import Button from '../ui/button/Button.vue'

export interface ChatIntegrations {
  connected: boolean
  open: boolean
}

defineProps<{ integrations?: ChatIntegrations }>()
const emit = defineEmits<{ toggleIntegrations: [] }>()
</script>

<template>
  <header class="chat-header chat-ui" @keydown.stop>
    <span class="chat-label">
      <span class="i-logos-openai-icon size-5" aria-hidden="true" />
      AI Assistant
    </span>
    <Button v-if="integrations" variant="ghost" size="sm" class="integration-button" :aria-expanded="integrations.open" @click="emit('toggleIntegrations')">
      <span class="i-ph-plugs-connected size-4" aria-hidden="true" />
      Integrations <span v-if="integrations.connected" class="connected-dot" aria-label="Connected" />
    </Button>
  </header>
</template>

<style scoped>
.chat-header {
  border-bottom: 1px solid var(--ui-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  flex-shrink: 0;
  font-size: 14px;
  background: var(--ui-elevated);
}
.chat-label, .integration-button {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-label {
  min-height: 32px;
  font-weight: 600;
  color: var(--ui-highlighted);
}
.chat-label .i-logos-openai-icon { filter: brightness(0); }
.dark .chat-label .i-logos-openai-icon { filter: brightness(0) invert(1); }
.connected-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ui-primary);
}
</style>
