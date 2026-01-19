<script lang="ts" setup>
import { assistantHtmlFrames } from 'virtual:ai:inertia-alternatives'
import ChatAnimation from './ChatAnimation.vue'

const props = withDefaults(defineProps<{
  userPrompt: string
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
</script>

<template>
  <ChatAnimation
    :user-prompt="props.userPrompt"
    :assistant-html-frames="assistantHtmlFrames"
    :typewriter-char-delay-ms="props.typewriterCharDelayMs"
    :search-duration-ms="props.searchDurationMs"
    :thinking-duration-ms="props.thinkingDurationMs"
    :stream-frame-delay-ms="props.streamFrameDelayMs"
    :stream-frames-per-tick="props.streamFramesPerTick"
    :timing-variance="props.timingVariance"
  />
</template>
