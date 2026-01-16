<script lang="ts" setup>
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { assistantHtmlFrames } from 'virtual:inertia-from-ai'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

// Props with defaults
const props = withDefaults(defineProps<{
  userPrompt?: string
  typewriterCharDelayMs?: number
  searchDurationMs?: number
  thinkingDurationMs?: number
  streamFrameDelayMs?: number
  streamFramesPerTick?: number
  height?: string
}>(), {
  userPrompt: 'Qu\'est-ce qu\'Inertia.js ?',
  typewriterCharDelayMs: 50,
  searchDurationMs: 1500,
  thinkingDurationMs: 1000,
  streamFrameDelayMs: 50,
  streamFramesPerTick: 1,
  height: '500px',
})

// Animation phases
type Phase = 'idle' | 'typingUser' | 'searching' | 'thinking' | 'streaming' | 'done'

const currentPhase = ref<Phase>('idle')
const typedUserText = ref('')
const currentFrameIndex = ref(0)
const showCursor = ref(true)

// Refs for DOM and cleanup
const chatContainerRef = ref<HTMLElement | null>(null)
const timers = ref<number[]>([])
const intervals = ref<number[]>([])

// Composable: Typewriter effect
function startTypewriter(text: string, onComplete: () => void) {
  let charIndex = 0
  typedUserText.value = ''

  const typeNextChar = () => {
    if (charIndex < text.length) {
      typedUserText.value += text[charIndex]
      charIndex++
      scrollToBottom()
      const timer = window.setTimeout(typeNextChar, props.typewriterCharDelayMs)
      timers.value.push(timer)
    }
    else {
      showCursor.value = false
      onComplete()
    }
  }

  typeNextChar()
}

// Composable: Stick to bottom
function scrollToBottom() {
  if (chatContainerRef.value) {
    nextTick(() => {
      if (chatContainerRef.value) {
        chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
      }
    })
  }
}

// Clear all timers and intervals
function clearAllTimers() {
  timers.value.forEach(t => clearTimeout(t))
  intervals.value.forEach(i => clearInterval(i))
  timers.value = []
  intervals.value = []
}

// Reset animation state
function resetAnimation() {
  clearAllTimers()
  currentPhase.value = 'idle'
  typedUserText.value = ''
  currentFrameIndex.value = 0
  showCursor.value = true
}

// Timeline: Phase transitions
function startTimeline() {
  resetAnimation()

  // Phase 1: Typing user prompt
  currentPhase.value = 'typingUser'
  startTypewriter(props.userPrompt, () => {
    // Phase 2: Searching
    const searchTimer = window.setTimeout(() => {
      currentPhase.value = 'searching'
      scrollToBottom()

      // Phase 3: Thinking
      const thinkingTimer = window.setTimeout(() => {
        currentPhase.value = 'thinking'
        scrollToBottom()

        // Phase 4: Streaming
        const streamingTimer = window.setTimeout(() => {
          currentPhase.value = 'streaming'
          currentFrameIndex.value = 0

          // Stream frames
          const streamInterval = window.setInterval(() => {
            if (currentFrameIndex.value < assistantHtmlFrames.length - 1) {
              currentFrameIndex.value += props.streamFramesPerTick
              if (currentFrameIndex.value >= assistantHtmlFrames.length) {
                currentFrameIndex.value = assistantHtmlFrames.length - 1
              }
              scrollToBottom()
            }
            else {
              clearInterval(streamInterval)
              currentPhase.value = 'done'
            }
          }, props.streamFrameDelayMs)

          intervals.value.push(streamInterval)
        }, props.thinkingDurationMs)

        timers.value.push(streamingTimer)
      }, props.searchDurationMs)

      timers.value.push(thinkingTimer)
    }, 500) // Small delay after typing

    timers.value.push(searchTimer)
  })
}

// Lifecycle hooks
onSlideEnter(() => {
  startTimeline()
})

onSlideLeave(() => {
  resetAnimation()
})

// Cursor blink effect
onMounted(() => {
  const cursorInterval = window.setInterval(() => {
    if (currentPhase.value === 'typingUser') {
      showCursor.value = !showCursor.value
    }
  }, 530)
  intervals.value.push(cursorInterval)
})

onUnmounted(() => {
  clearAllTimers()
})

// Computed current assistant HTML
const currentAssistantHtml = computed(() => {
  if (currentFrameIndex.value < assistantHtmlFrames.length) {
    return assistantHtmlFrames[currentFrameIndex.value]
  }
  return ''
})

const showAssistant = computed(() =>
  currentPhase.value === 'streaming' || currentPhase.value === 'done',
)

const showStatus = computed(() =>
  currentPhase.value === 'searching' || currentPhase.value === 'thinking',
)
</script>

<template>
  <div class="chat-facade" :style="{ height }">
    <!-- Header -->
    <div class="chat-header">
      <div class="flex items-center gap-2">
        <div class="size-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
          <span class="text-white text-sm font-semibold">AI</span>
        </div>
        <span class="font-semibold">ChatGPT</span>
      </div>
    </div>

    <!-- Messages Container -->
    <div ref="chatContainerRef" class="chat-messages">
      <!-- User Message -->
      <div v-if="currentPhase !== 'idle'" class="message-row message-user">
        <div class="avatar bg-blue-500">
          <span class="text-white text-xs">U</span>
        </div>
        <div class="message-bubble user-bubble">
          {{ typedUserText }}<span v-if="showCursor && currentPhase === 'typingUser'" class="cursor">|</span>
        </div>
      </div>

      <!-- Status Line (Searching/Thinking) -->
      <div v-if="showStatus" class="message-row message-assistant">
        <div class="avatar bg-teal-500">
          <span class="text-white text-xs">AI</span>
        </div>
        <div class="status-line">
          <div v-if="currentPhase === 'searching'" class="flex items-center gap-2">
            <div class="spinner" />
            <span class="text-sm op-70">Searching...</span>
          </div>
          <div v-if="currentPhase === 'thinking'" class="flex items-center gap-2">
            <div class="thinking-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
            <span class="text-sm op-70">Thinking...</span>
          </div>
        </div>
      </div>

      <!-- Assistant Message -->
      <div v-if="showAssistant" class="message-row message-assistant">
        <div class="avatar bg-teal-500">
          <span class="text-white text-xs">AI</span>
        </div>
        <div class="message-bubble assistant-bubble">
          <div class="assistant-content" v-html="currentAssistantHtml" />
        </div>
      </div>
    </div>

    <!-- Faux Input Row -->
    <div class="chat-input-row">
      <input
        type="text"
        placeholder="Message ChatGPT..."
        disabled
        class="faux-input"
      >
      <button disabled class="send-button">
        <span class="i-ph-paper-plane-tilt size-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-facade {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark .chat-facade {
  background: #1f2937;
  border-color: #374151;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.dark .chat-header {
  background: #111827;
  border-bottom-color: #374151;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 70%;
}

.user-bubble {
  background: #3b82f6;
  color: white;
}

.assistant-bubble {
  background: #f3f4f6;
  color: #1f2937;
}

.dark .assistant-bubble {
  background: #374151;
  color: #f9fafb;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.status-line {
  padding: 0.75rem 1rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
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

.chat-input-row {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  background: #f9fafb;
}

.dark .chat-input-row {
  background: #111827;
  border-top-color: #374151;
}

.faux-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #6b7280;
}

.dark .faux-input {
  background: #374151;
  border-color: #4b5563;
  color: #9ca3af;
}

.send-button {
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: not-allowed;
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
</style>
