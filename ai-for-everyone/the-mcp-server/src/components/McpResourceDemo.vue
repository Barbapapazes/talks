<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { ref, useId, watch } from 'vue'
import ChatAnimation from '../../../../theme/components/Chat/ChatAnimation.vue'
import { mcpResources as resources } from '../data/mcp-resources'

const pickerOpen = ref(false)
const pickerId = useId()
const attachments = ref<string[]>([])
const slideActive = useIsSlideActive()
const request = 'Using the attached context, what does this project do?'
const reply = 'Project Dashboard lets teams manage projects and track their status.'
const words = reply.split(' ')
const replyFrames = words.map((_, index) => words.slice(0, index + 1).join(' '))

watch(slideActive, () => {
  pickerOpen.value = false
  attachments.value = []
})
function attach(name: string) {
  if (!attachments.value.includes(name))
    attachments.value.push(name)
  pickerOpen.value = false
}
function handleFocusOut(event: FocusEvent) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null))
    pickerOpen.value = false
}
function closePicker(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    pickerOpen.value = false
    const picker = event.currentTarget as HTMLElement
    picker.querySelector<HTMLButtonElement>('.add-context')?.focus()
  }
}
</script>

<template>
  <div class="mcp-resource-demo not-content" @click.stop>
    <ChatAnimation
      :enabled="attachments.length > 0"
      :user-prompt="request"
      :assistant-html-frames="replyFrames"
      :typewriter-char-delay-ms="15"
    >
      <template #userContext>
        <div class="attachments sent-attachments" aria-label="Message context">
          <span v-for="name in attachments" :key="name" class="attachment-chip">
            <span class="i-ph-file-text size-3" aria-hidden="true" />{{ name }}
          </span>
        </div>
      </template>
      <template #inputContext="{ sent }">
        <div class="composer-context" @keydown.stop="closePicker" @focusout="handleFocusOut">
          <button
            type="button"
            class="add-context"
            :disabled="sent"
            :aria-expanded="pickerOpen"
            :aria-controls="pickerId"
            @click="pickerOpen = !pickerOpen"
          >
            <span class="i-ph-plus size-4" aria-hidden="true" /> Add context
            <span class="i-ph-caret-down size-3" aria-hidden="true" />
          </button>
          <div v-if="pickerOpen && !sent" :id="pickerId" class="resource-picker" role="group" aria-label="Project documents">
            <div class="picker-heading">
              GitHub · Project Dashboard documents
            </div>
            <button
              v-for="resource in resources"
              :key="resource.name"
              type="button"
              class="resource-option"
              :disabled="attachments.includes(resource.name)"
              @click="attach(resource.name)"
            >
              <span :class="resource.icon" class="size-4" aria-hidden="true" />
              <span>{{ resource.name }}<small>{{ resource.description }}</small></span>
              <span v-if="attachments.includes(resource.name)" class="i-ph-check size-4" aria-label="Attached" />
            </button>
          </div>
          <div v-if="attachments.length && !sent" class="attachments" aria-label="Attached context">
            <span v-for="name in attachments" :key="name" class="attachment-chip">
              <span class="i-ph-file-text size-3" aria-hidden="true" />
              {{ name }}
              <button type="button" :aria-label="`Remove ${name}`" @click="attachments = attachments.filter(item => item !== name)">
                <span class="i-ph-x size-3" aria-hidden="true" />
              </button>
            </span>
          </div>
        </div>
      </template>
    </ChatAnimation>
  </div>
</template>

<style scoped>
.mcp-resource-demo {
  position: absolute;
  inset: 0;
  font-size: 14px;
  line-height: 1.45;
}
.mcp-resource-demo :deep(.assistant-content) {
  font-size: 16px;
}
.sent-attachments {
  margin-bottom: 8px;
}
.composer-context {
  --at-apply: text-neutral-600 dark:text-neutral-400;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
button {
  display: flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  cursor: pointer;
}
button:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: 2px;
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
.add-context {
  --at-apply: border border-dashed border-neutral-400 dark:border-neutral-600;
  border-radius: 5px;
  padding: 3px 7px;
  font-size: 12px;
}
.resource-picker {
  --at-apply: border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 340px;
  max-width: 100%;
  z-index: 10;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 8px 28px #0003;
}
.picker-heading {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  padding: 7px 8px;
  font-size: 11px;
}
.resource-option {
  width: 100%;
  text-align: left;
  padding: 7px 8px;
  border-radius: 4px;
}
.resource-option:hover:not(:disabled) {
  --at-apply: bg-neutral-50 dark:bg-neutral-800;
}
.resource-option small {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  display: block;
  font-size: 11px;
}
.attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.attachment-chip {
  --at-apply: border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 6px;
  border-radius: 5px;
  font-size: 11px;
}
</style>
