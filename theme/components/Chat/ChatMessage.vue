<script lang="ts" setup>
import { computed } from 'vue'
import Bubble from '../ui/bubble/Bubble.vue'
import BubbleContent from '../ui/bubble/BubbleContent.vue'
import Message from '../ui/message/Message.vue'
import MessageContent from '../ui/message/MessageContent.vue'

const props = defineProps<{
  type: 'user' | 'assistant'
  content: string
  showCursor?: boolean
}>()

const isUser = computed(() => props.type === 'user')
</script>

<template>
  <Message class="chat-ui" :align="isUser ? 'end' : 'start'" :class="{ 'pt-4': isUser }">
    <MessageContent class="chat-message-content">
      <Bubble v-if="isUser" align="end" variant="muted" class="user-message px-4 py-3">
        <BubbleContent>
          <slot name="attachments" />
          {{ props.content }}<span v-if="props.showCursor" class="chat-cursor">|</span>
        </BubbleContent>
      </Bubble>
      <div v-else class="assistant-content">
        <slot>
          <div v-html="content" />
        </slot>
      </div>
    </MessageContent>
  </Message>
</template>

<style scoped>
.chat-message-content { width: 100%; }
[data-align='end'] > .chat-message-content { width: fit-content; max-width: 80%; }
.user-message {
  border-radius: var(--ui-radius-lg);
  background: var(--ui-muted);
  color: var(--ui-highlighted);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.assistant-content { line-height: 1.65; }
.assistant-content :deep(a) { color: var(--ui-primary); text-decoration: underline; text-underline-offset: 3px; }
.assistant-content :deep(:not(pre) > code) {
  background: var(--ui-muted);
  color: var(--ui-highlighted);
  border-radius: calc(var(--ui-radius) / 2);
  padding: 2px 5px;
  font-size: 0.875em;
}
.assistant-content :deep(ol) { list-style: decimal; margin: 0 0 0.75rem 1.5rem; }
.assistant-content :deep(blockquote) {
  border-left: 2px solid var(--ui-border);
  margin: 0 0 0.75rem;
  padding-left: 1rem;
  color: var(--ui-muted-foreground);
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
  border-bottom: 2px solid var(--ui-border);
}

.assistant-content :deep(th) {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  background-color: var(--ui-muted);
}

.assistant-content :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px solid var(--ui-border);
}

.assistant-content :deep(tr:last-child td) {
  border-bottom: none;
}

.assistant-content :deep(pre) {
  font-size: 0.875rem;
  background-color: var(--ui-muted) !important;
  border: 1px solid var(--ui-border);
  border-radius: var(--ui-radius);
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}
</style>
