<script lang="ts" setup>
export interface ChatIntegrations {
  connected: boolean
  open: boolean
}

defineProps<{ integrations?: ChatIntegrations }>()
const emit = defineEmits<{ toggleIntegrations: [] }>()
</script>

<template>
  <header class="chat-header" @keydown.stop>
    <span class="chat-label">
      <span class="i-logos-openai-icon size-5" aria-hidden="true" />
      AI Assistant
    </span>
    <button v-if="integrations" type="button" class="integration-button" :aria-expanded="integrations.open" @click="emit('toggleIntegrations')">
      <span class="i-ph-plugs-connected size-4" aria-hidden="true" />
      Integrations <span v-if="integrations.connected" class="connected-dot" aria-label="Connected" />
    </button>
  </header>
</template>

<style scoped>
.chat-header {
  --at-apply: border-b border-neutral-200 dark:border-neutral-700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 16px;
  flex-shrink: 0;
  font-size: 12px;
}
.chat-label, .integration-button {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-label {
  font-weight: 600;
}
.integration-button {
  cursor: pointer;
  font: inherit;
}
.integration-button:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: 3px;
}
.connected-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #14b8a6;
}
</style>
