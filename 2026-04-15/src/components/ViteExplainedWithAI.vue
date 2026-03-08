<script lang="ts" setup>
import ChatAnimation from '@theme/components/Chat/ChatAnimation.vue'
import { assistantHtmlFrames } from 'virtual:ai:vite-explained-with-ai'

const props = defineProps<{
  userPrompt: string
}>()
</script>

<template>
  <ChatAnimation
    :user-prompt="props.userPrompt"
    :assistant-html-frames="assistantHtmlFrames"
  />
</template>
