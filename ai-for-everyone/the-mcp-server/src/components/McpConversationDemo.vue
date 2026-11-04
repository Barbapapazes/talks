<script setup lang="ts">
import ChatAnimation from '@theme/components/Chat/ChatAnimation.vue'

function frames(text: string) {
  const words = text.split(' ')
  return words.map((_, index) => words.slice(0, index + 1).join(' '))
}

const suggestionFrames = frames('Show a confirmation dialog before deleting a project. Require the user to type the project\'s name to confirm.')
const replyFrames = frames('I can draft the issue, but I can\'t create it on GitHub. I don\'t have access to your repository.')
</script>

<template>
  <div class="intro-conversation absolute inset-0 text-sm leading-[1.45] [&_.assistant-content]:text-base" @click.stop>
    <ChatAnimation
      user-prompt="How can we prevent users from accidentally deleting a project?"
      :assistant-html-frames="suggestionFrames"
      follow-up-prompt="Sounds good. Create an issue for this on GitHub."
      :follow-up-html-frames="replyFrames"
      :typewriter-char-delay-ms="30"
    />
  </div>
</template>
