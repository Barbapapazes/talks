<script setup lang="ts">
import ChatAnimation from '../../../../theme/components/Chat/ChatAnimation.vue'
import ChatToolCall from '../../../../theme/components/Chat/ChatToolCall.vue'

const request = 'Create an issue in acme/project-dashboard: Require confirmation before deleting a project. Before deleting a project, show a confirmation dialog requiring the user to type the project\'s name.'
const reply = 'Created issue #42 in acme/project-dashboard: Require confirmation before deleting a project.'
const words = reply.split(' ')
const replyFrames = words.map((_, index) => words.slice(0, index + 1).join(' '))
</script>

<template>
  <div class="mcp-tool-demo not-content" @click.stop>
    <ChatAnimation
      :user-prompt="request"
      :assistant-html-frames="replyFrames"
      :typewriter-char-delay-ms="15"
    >
      <template #tool="{ phase }">
        <ChatToolCall
          v-if="['searching', 'thinking', 'streaming', 'done'].includes(phase)"
          name="create_issue"
          :arguments="JSON.stringify({ repository: 'acme/project-dashboard', title: 'Require confirmation before deleting a project', body: 'Before deleting a project, show a confirmation dialog requiring the user to type the project\'s name.' }, null, 2)"
          :result="JSON.stringify({ content: [{ type: 'text', text: reply }], isError: false }, null, 2)"
          compact
          :status="phase === 'streaming' || phase === 'done' ? 'completed' : 'running'"
        />
      </template>
    </ChatAnimation>
  </div>
</template>

<style scoped>
.mcp-tool-demo {
  position: absolute;
  inset: 0;
  font-size: 14px;
  line-height: 1.45;
}
.mcp-tool-demo :deep(.assistant-content) {
  font-size: 16px;
}
</style>
