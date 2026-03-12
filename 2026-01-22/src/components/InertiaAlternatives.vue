<script lang="ts" setup>
import { assistantHtmlFrames } from 'virtual:ai:inertia-alternatives'
import ChatAnimation from './ChatAnimation.vue'

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
