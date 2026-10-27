<script lang="ts" setup>
import type { ChatIntegrations } from './ChatHeader.vue'
import { useIsSlideActive } from '@slidev/client'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useAnimationTimeline } from '../../composables/useAnimationTimeline'
import ChatHeader from './ChatHeader.vue'
import ChatInput from './ChatInput.vue'
import ChatMessage from './ChatMessage.vue'
import ChatStatusIndicator from './ChatStatusIndicator.vue'

// Props with defaults
const props = withDefaults(defineProps<{
  userPrompt: string
  enabled?: boolean
  autoType?: boolean
  integrations?: ChatIntegrations
  assistantHtmlFrames?: string[]
  assistantFrameCount?: number
  followUpPrompt?: string
  followUpHtmlFrames?: string[]
  followUpFrameCount?: number
  typewriterCharDelayMs?: number
  searchDurationMs?: number
  thinkingDurationMs?: number
  streamFrameDelayMs?: number
  streamFramesPerTick?: number
  timingVariance?: number
}>(), {
  enabled: true,
  assistantHtmlFrames: () => [],
  followUpHtmlFrames: () => [],
  typewriterCharDelayMs: 50,
  searchDurationMs: 1500,
  thinkingDurationMs: 1000,
  streamFrameDelayMs: 50,
  streamFramesPerTick: 1,
  timingVariance: 0.2,
})

const emit = defineEmits<{ toggleIntegrations: [] }>()

// Refs for DOM
const chatContainerRef = ref<HTMLElement | null>(null)
const intervals = ref<number[]>([])
const followUpStarted = ref(false)
const slideActive = useIsSlideActive()
const isActive = computed(() => slideActive.value && props.enabled)

// Animation composable
const {
  currentPhase,
  typedInputText,
  sentUserText,
  currentFrameIndex,
  showCursor,
  startTimeline,
  continueAnimation,
  resetAnimation,
  skipToEnd,
} = useAnimationTimeline(
  {
    userPrompt: props.userPrompt,
    typewriterCharDelayMs: props.typewriterCharDelayMs,
    searchDurationMs: props.searchDurationMs,
    thinkingDurationMs: props.thinkingDurationMs,
    streamFrameDelayMs: props.streamFrameDelayMs,
    streamFramesPerTick: props.streamFramesPerTick,
    timingVariance: props.timingVariance,
    totalFrames: props.assistantFrameCount ?? props.assistantHtmlFrames.length,
  },
  chatContainerRef,
  () => {}, // onScroll callback
)

const {
  currentPhase: followUpPhase,
  typedInputText: followUpTypedInputText,
  sentUserText: followUpSentUserText,
  currentFrameIndex: followUpFrameIndex,
  showCursor: followUpShowCursor,
  startTimeline: startFollowUp,
  resetAnimation: resetFollowUp,
  skipToEnd: skipFollowUpToEnd,
} = useAnimationTimeline(
  {
    userPrompt: props.followUpPrompt ?? '',
    typewriterCharDelayMs: props.typewriterCharDelayMs,
    searchDurationMs: props.searchDurationMs,
    thinkingDurationMs: props.thinkingDurationMs,
    streamFrameDelayMs: props.streamFrameDelayMs,
    streamFramesPerTick: props.streamFramesPerTick,
    timingVariance: props.timingVariance,
    totalFrames: props.followUpFrameCount ?? props.followUpHtmlFrames.length,
  },
  chatContainerRef,
  () => {},
)
let followUpEnterListener: ((event: KeyboardEvent) => void) | null = null

function beginFollowUp(event: KeyboardEvent) {
  if (event.key !== 'Enter' || !isActive.value || currentPhase.value !== 'done' || followUpStarted.value || !props.followUpPrompt)
    return

  event.preventDefault()
  followUpStarted.value = true
  startFollowUp()
}

// Watch slide active state
let enterListener: ((e: KeyboardEvent) => void) | null = null

watch(isActive, () => {
  // Clear existing intervals
  intervals.value.forEach(i => clearInterval(i))
  intervals.value = []

  if (isActive.value) {
    followUpStarted.value = false
    startTimeline()
    if (props.autoType)
      continueAnimation()
    window.addEventListener('keydown', beginFollowUp)

    // Cursor blink effect
    const cursorInterval = window.setInterval(() => {
      if (currentPhase.value === 'typingInInput') {
        showCursor.value = !showCursor.value
      }
      if (followUpPhase.value === 'typingInInput')
        followUpShowCursor.value = !followUpShowCursor.value
    }, 530)
    intervals.value.push(cursorInterval)
  }
  else {
    resetAnimation()
    resetFollowUp()
    followUpStarted.value = false
    window.removeEventListener('keydown', beginFollowUp)
    removeEnterListener()
  }
}, { immediate: true })

// Manage Enter listener based on animation phase (only active while animation is running)
function addEnterListener() {
  if (!enterListener) {
    enterListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault()
        skipToEnd()
      }
    }
    window.addEventListener('keydown', enterListener)
  }
}

function removeEnterListener() {
  if (enterListener) {
    window.removeEventListener('keydown', enterListener)
    enterListener = null
  }
}

watch(currentPhase, (phase) => {
  if (phase === 'typingInInput'
    || phase === 'searching'
    || phase === 'thinking'
    || phase === 'streaming') {
    addEnterListener()
  }
  else {
    removeEnterListener()
  }
}, { immediate: true })

watch(followUpPhase, (phase) => {
  if (phase === 'typingInInput' || phase === 'searching' || phase === 'thinking' || phase === 'streaming') {
    if (!followUpEnterListener) {
      followUpEnterListener = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && isActive.value) {
          event.preventDefault()
          skipFollowUpToEnd()
        }
      }
      window.addEventListener('keydown', followUpEnterListener)
    }
  }
  else if (followUpEnterListener) {
    window.removeEventListener('keydown', followUpEnterListener)
    followUpEnterListener = null
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', beginFollowUp)
  if (followUpEnterListener)
    window.removeEventListener('keydown', followUpEnterListener)
  removeEnterListener()
  intervals.value.forEach(i => clearInterval(i))
  resetAnimation()
  resetFollowUp()
})

// Computed current assistant HTML
const currentAssistantHtml = computed(() => {
  if (currentFrameIndex.value < props.assistantHtmlFrames.length) {
    return props.assistantHtmlFrames[currentFrameIndex.value] as string
  }
  return ''
})

const followUpAssistantHtml = computed(() => props.followUpHtmlFrames[followUpFrameIndex.value] ?? '')

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
  (followUpStarted.value ? followUpPhase.value : currentPhase.value) !== 'typingInInput',
)

const followUpShowUser = computed(() => followUpStarted.value
  && ![
    'idle',
    'waitingToType',
    'typingInInput',
    'waitingToSend',
  ].includes(followUpPhase.value))

const followUpShowAssistant = computed(() => followUpPhase.value === 'streaming' || followUpPhase.value === 'done')
</script>

<template>
  <div class="overflow-hidden flex flex-col h-full">
    <ChatHeader :integrations="integrations" @toggle-integrations="emit('toggleIntegrations')" />

    <div ref="chatContainerRef" class="flex-1 overflow-y-auto pb-16">
      <div class="w-[66ch] mx-auto flex flex-col gap-4">
        <ChatMessage
          v-if="showUserMessage"
          type="user"
          :content="sentUserText"
        >
          <template v-if="$slots.userContext" #attachments>
            <slot name="userContext" />
          </template>
        </ChatMessage>

        <slot name="tool" :phase="currentPhase" />

        <ChatStatusIndicator
          v-if="showStatus && !$slots.tool"
          :status="(currentPhase as 'searching' | 'thinking')"
        />

        <ChatMessage
          v-if="showAssistant && $slots.assistant"
          type="assistant"
          :content="currentAssistantHtml"
        >
          <slot name="assistant" :frame-index="currentFrameIndex" :streaming="currentPhase === 'streaming'" />
        </ChatMessage>
        <ChatMessage
          v-else-if="showAssistant"
          type="assistant"
          :content="currentAssistantHtml"
        />

        <ChatMessage
          v-if="followUpShowUser"
          type="user"
          :content="followUpSentUserText"
        />

        <slot name="followUpTool" :phase="followUpPhase" :started="followUpStarted" />

        <ChatStatusIndicator
          v-if="!$slots.followUpTool && (followUpPhase === 'searching' || followUpPhase === 'thinking')"
          :status="(followUpPhase as 'searching' | 'thinking')"
        />

        <ChatMessage
          v-if="followUpShowAssistant && $slots.followUp"
          type="assistant"
          :content="followUpAssistantHtml"
        >
          <slot name="followUp" :frame-index="followUpFrameIndex" :streaming="followUpPhase === 'streaming'" />
        </ChatMessage>
        <ChatMessage
          v-else-if="followUpShowAssistant"
          type="assistant"
          :content="followUpAssistantHtml"
        />
      </div>
    </div>

    <ChatInput
      class="w-[70ch] mx-auto absolute bottom-4 left-1/2 transform -translate-x-1/2"
      :value="followUpStarted ? followUpTypedInputText : typedInputText"
      :show-cursor="(followUpStarted ? followUpShowCursor : showCursor) && (followUpStarted ? followUpPhase : currentPhase) === 'typingInInput'"
      :disabled="inputDisabled"
    >
      <template v-if="$slots.inputMessage" #message>
        <slot name="inputMessage" :value="followUpStarted ? followUpTypedInputText : typedInputText" :disabled="inputDisabled" :sent="showUserMessage" />
      </template>
      <template v-if="$slots.inputContext" #context>
        <slot name="inputContext" :sent="showUserMessage" />
      </template>
    </ChatInput>
  </div>
</template>
