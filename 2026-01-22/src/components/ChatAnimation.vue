<script lang="ts" setup>
import { useIsSlideActive } from '@slidev/client'
import { computed, ref, watch } from 'vue'
import { useAnimationTimeline } from '../composables/useAnimationTimeline'
import ChatHeader from './ChatHeader.vue'
import ChatInput from './ChatInput.vue'
import ChatMessage from './ChatMessage.vue'
import StatusIndicator from './StatusIndicator.vue'

// Props with defaults
const props = withDefaults(defineProps<{
  userPrompt: string
  assistantHtmlFrames: string[]
  typewriterCharDelayMs?: number
  searchDurationMs?: number
  thinkingDurationMs?: number
  streamFrameDelayMs?: number
  streamFramesPerTick?: number
  timingVariance?: number
}>(), {
  typewriterCharDelayMs: 50,
  searchDurationMs: 1500,
  thinkingDurationMs: 1000,
  streamFrameDelayMs: 50,
  streamFramesPerTick: 1,
  timingVariance: 0.2,
})

// Refs for DOM
const chatContainerRef = ref<HTMLElement | null>(null)
const intervals = ref<number[]>([])

// Animation composable
const {
  currentPhase,
  typedInputText,
  sentUserText,
  currentFrameIndex,
  showCursor,
  startTimeline,
  resetAnimation,
} = useAnimationTimeline(
  {
    userPrompt: props.userPrompt,
    typewriterCharDelayMs: props.typewriterCharDelayMs,
    searchDurationMs: props.searchDurationMs,
    thinkingDurationMs: props.thinkingDurationMs,
    streamFrameDelayMs: props.streamFrameDelayMs,
    streamFramesPerTick: props.streamFramesPerTick,
    timingVariance: props.timingVariance,
    totalFrames: props.assistantHtmlFrames.length,
  },
  chatContainerRef,
  () => {}, // onScroll callback
)

// Watch slide active state
const isActive = useIsSlideActive()
watch(isActive, () => {
  // Clear existing intervals
  intervals.value.forEach(i => clearInterval(i))
  intervals.value = []

  if (isActive.value) {
    startTimeline()

    // Cursor blink effect
    const cursorInterval = window.setInterval(() => {
      if (currentPhase.value === 'typingInInput') {
        showCursor.value = !showCursor.value
      }
    }, 530)
    intervals.value.push(cursorInterval)
  }
  else {
    resetAnimation()
  }
}, { immediate: true })

// Computed current assistant HTML
const currentAssistantHtml = computed(() => {
  if (currentFrameIndex.value < props.assistantHtmlFrames.length) {
    return props.assistantHtmlFrames[currentFrameIndex.value]
  }
  return ''
})

const showAssistant = computed(() =>
  currentPhase.value === 'streaming' || currentPhase.value === 'done',
)

const showStatus = computed(() =>
  currentPhase.value === 'searching' || currentPhase.value === 'thinking',
)

const showUserMessage = computed(() =>
  currentPhase.value !== 'idle' && currentPhase.value !== 'typingInInput' && currentPhase.value !== 'waitingToSend' && currentPhase.value !== 'waitingToType',
)

const inputDisabled = computed(() =>
  currentPhase.value !== 'typingInInput',
)
</script>

<template>
  <div class="overflow-hidden flex flex-col h-full">
    <ChatHeader class="absolute top-0 inset-x-0" />

    <div ref="chatContainerRef" class="flex-1 overflow-y-auto pb-16">
      <div class="w-[66ch] mx-auto flex flex-col gap-4">
        <ChatMessage
          v-if="showUserMessage"
          type="user"
          :content="sentUserText"
        />

        <StatusIndicator
          v-if="showStatus"
          :status="(currentPhase as 'searching' | 'thinking')"
        />

        <ChatMessage
          v-if="showAssistant"
          type="assistant"
          :content="currentAssistantHtml"
        />
      </div>
    </div>

    <ChatInput
      class="w-[70ch] mx-auto absolute bottom-4 left-1/2 transform -translate-x-1/2"
      :value="typedInputText"
      :show-cursor="showCursor && currentPhase === 'typingInInput'"
      :disabled="inputDisabled"
    />
  </div>
</template>
