<script lang="ts" setup>
import InputGroup from '../ui/input-group/InputGroup.vue'
import InputGroupAddon from '../ui/input-group/InputGroupAddon.vue'
import InputGroupButton from '../ui/input-group/InputGroupButton.vue'

defineProps<{
  value?: string
  showCursor?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <InputGroup class="chat-input chat-ui px-4 py-3" aria-label="Message composer" :aria-disabled="disabled || undefined">
    <InputGroupAddon v-if="$slots.context" align="block-start">
      <slot name="context" />
    </InputGroupAddon>
    <div class="composer-row">
      <div class="composer-message">
        <slot name="message">
          <span v-if="!value && disabled" class="input-placeholder">Type your message...</span>
          <span v-else class="whitespace-pre-wrap break-words">{{ value }}<span v-if="showCursor && !disabled" class="chat-cursor">|</span></span>
        </slot>
      </div>
      <InputGroupAddon align="inline-end">
        <InputGroupButton :disabled="disabled" variant="default" size="icon" aria-label="Send message" @keydown.stop>
          <span class="i-ph-arrow-up-bold size-4" aria-hidden="true" />
        </InputGroupButton>
      </InputGroupAddon>
    </div>
  </InputGroup>
</template>

<style scoped>
.chat-input {
  display: block;
  border-radius: var(--ui-radius-lg);
  border: 1px solid var(--ui-border);
  background: var(--ui-background);
  box-shadow: var(--ui-shadow);
}
.chat-input:focus-within {
  border-color: var(--ui-ring);
  outline: 2px solid color-mix(in srgb, var(--ui-ring) 25%, transparent);
  outline-offset: 2px;
}
.composer-row { display: flex; align-items: center; gap: 12px; }
.composer-message { flex: 1; min-width: 0; min-height: 24px; }
.chat-input :deep([data-align='block-start']) { margin-bottom: 12px; }
.input-placeholder { color: var(--ui-muted-foreground); }
</style>
