<script setup lang="ts">
import ChatAnimation from '@theme/components/Chat/ChatAnimation.vue'
import ChatToolCall from '@theme/components/Chat/ChatToolCall.vue'

const prompt = 'Create an issue in acme/project-dashboard to confirm project deletion.'
const args = JSON.stringify({
  repository: 'acme/project-dashboard',
  title: 'Confirm project deletion',
  body: 'Require the project name before deleting it.',
}, null, 2)
const result = JSON.stringify({
  number: 42,
  html_url: 'https://github.com/acme/project-dashboard/issues/42',
}, null, 2)
const reply = 'Created issue <a href="https://github.com/acme/project-dashboard/issues/42">#42: Confirm project deletion</a>.'
const words = 'Created issue'.split(' ')
const replyFrames = [...words.map((_, index) => words.slice(0, index + 1).join(' ')), reply]
</script>

<template>
  <div class="absolute inset-0 text-sm leading-[1.45] [&_.assistant-content]:text-base" @click.stop>
    <ChatAnimation
      :user-prompt="prompt"
      :assistant-html-frames="replyFrames"
      :typewriter-char-delay-ms="30"
      :search-duration-ms="1000"
      :thinking-duration-ms="2000"
    >
      <template #tool="{ phase }">
        <ChatToolCall
          v-if="['searching', 'thinking', 'streaming', 'done'].includes(phase)"
          name="create_issue"
          :arguments="args"
          :result="result"
          :status="phase === 'searching' ? 'requested' : phase === 'thinking' ? 'running' : 'completed'"
          compact
        />
      </template>
    </ChatAnimation>
  </div>
</template>
