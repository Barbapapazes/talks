<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { computed, nextTick, ref, useId, watch } from 'vue'
import ChatAnimation from '../../../../theme/components/Chat/ChatAnimation.vue'
import Modal from '../../../../theme/components/Modal.vue'
import { buildReviewMessage, defaultReviewArguments, reviewPullRequestPrompt } from '../data/mcp-prompts'

const selected = ref(false)
const argumentsOpen = ref(false)
const promptReady = ref(false)
const promptComposer = ref<HTMLElement | null>(null)
const commandQuery = ref('')
const commandId = useId()
const command = `/${reviewPullRequestPrompt.name}`
const showCommand = computed(() => commandQuery.value.startsWith('/') && command.includes(commandQuery.value))
const slideActive = useIsSlideActive()
const argumentsForm = ref({ ...defaultReviewArguments })
const loadedArguments = ref({ ...defaultReviewArguments })
const canUsePrompt = computed(() => argumentsForm.value.repository.trim().length > 0 && /^[1-9]\d*$/.test(argumentsForm.value.pull_request.trim()))
const request = computed(() => buildReviewMessage(loadedArguments.value))
const replyFrames = computed(() => {
  const words = `Please attach the diff for pull request #${loadedArguments.value.pull_request} so I can check for bugs and missing tests.`.split(' ')
  return words.map((_, index) => words.slice(0, index + 1).join(' '))
})

function selectCommand() {
  argumentsOpen.value = true
  commandQuery.value = ''
}
async function usePrompt() {
  if (!canUsePrompt.value)
    return
  loadedArguments.value = {
    repository: argumentsForm.value.repository.trim(),
    pull_request: argumentsForm.value.pull_request.trim(),
  }
  selected.value = true
  argumentsOpen.value = false
  promptReady.value = true
  await nextTick()
  promptComposer.value?.focus()
}
watch(slideActive, () => {
  argumentsOpen.value = false
  selected.value = false
  promptReady.value = false
  commandQuery.value = ''
  argumentsForm.value = { ...defaultReviewArguments }
  loadedArguments.value = { ...defaultReviewArguments }
})
</script>

<template>
  <div class="mcp-prompt-demo not-content" @click.stop>
    <ChatAnimation
      :key="request"
      :enabled="promptReady"
      auto-type
      :user-prompt="request"
      :assistant-html-frames="replyFrames"
      :typewriter-char-delay-ms="15"
    >
      <template #inputMessage="{ sent, value }">
        <div ref="promptComposer" class="prompt-composer" tabindex="-1">
          <template v-if="!selected">
            <label class="sr-only" :for="commandId">MCP slash command</label>
            <input
              :id="commandId"
              v-model="commandQuery"
              class="command-input"
              placeholder="Type / to choose a prompt"
              autocomplete="off"
              :aria-controls="showCommand ? `${commandId}-suggestions` : undefined"
              @keydown.enter.stop.prevent="showCommand && selectCommand()"
              @keydown.escape="commandQuery = ''"
            >
            <div v-if="showCommand" :id="`${commandId}-suggestions`" class="command-picker" role="group" aria-label="MCP prompts">
              <div class="picker-heading">
                GitHub · MCP prompts
              </div>
              <button type="button" class="command-option" @click="selectCommand()">
                <span class="command-name">{{ command }}<small>{{ reviewPullRequestPrompt.description }}</small></span>
              </button>
            </div>
          </template>
          <template v-else-if="!sent">
            <span class="command-badge">{{ command }}</span>{{ ' ' }}<span class="whitespace-pre-wrap break-words">{{ value }}</span>
          </template>
          <span v-else class="text-neutral-400">Type your message...</span>
        </div>
      </template>
      <template #userContext>
        <span class="command-badge">{{ command }}</span>{{ ' ' }}
      </template>
    </ChatAnimation>
    <Modal
      v-model:open="argumentsOpen"
      class="prompt-arguments-modal"
      title="Review a pull request"
      :description="reviewPullRequestPrompt.description"
      @keydown.stop
    >
      <form :id="`${commandId}-arguments`" class="command-arguments" @submit.prevent="usePrompt">
        <label :for="`${commandId}-repository`">Repository</label>
        <input
          :id="`${commandId}-repository`" v-model="argumentsForm.repository"
          name="repository" required autocomplete="off"
          :aria-describedby="`${commandId}-repository-description`"
        >
        <small :id="`${commandId}-repository-description`">{{ reviewPullRequestPrompt.arguments[0].description }}</small>
        <label :for="`${commandId}-pull-request`">Pull request</label>
        <input
          :id="`${commandId}-pull-request`" v-model="argumentsForm.pull_request"
          name="pull_request" required inputmode="numeric" pattern="[1-9][0-9]*" autocomplete="off"
          :aria-describedby="`${commandId}-pull-request-description`"
        >
        <small :id="`${commandId}-pull-request-description`">{{ reviewPullRequestPrompt.arguments[1].description }}</small>
      </form>
      <template #footer>
        <div class="argument-actions">
          <button type="button" class="cancel-arguments" @click="argumentsOpen = false">
            Cancel
          </button>
          <button type="submit" class="use-prompt" :form="`${commandId}-arguments`" :disabled="!canUsePrompt">
            Use prompt
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.mcp-prompt-demo {
  position: absolute;
  inset: 0;
  font-size: 14px;
  line-height: 1.45;
}
.mcp-prompt-demo :deep(.assistant-content) {
  font-size: 16px;
}
.prompt-composer {
  position: relative;
  width: 100%;
  outline: none;
  overflow-wrap: anywhere;
}
.command-input {
  width: 100%;
  background: transparent;
  font: inherit;
  color: var(--slidev-theme-primary);
  padding: 4px 0;
  border: 0;
  outline: none;
  box-shadow: none;
}
:global(.prompt-arguments-modal[role="dialog"]) {
  height: auto;
  width: 440px;
  max-width: calc(100vw - 32px);
  font-size: 14px;
  line-height: 1.45;
}
:global(.prompt-arguments-modal[role="dialog"] h2) { font-size: 20px; }
:global(.prompt-arguments-modal[role="dialog"] h2 + p) { font-size: 14px; }
.command-arguments {
  display: grid;
  gap: 6px;
  padding: 20px;
}
.command-arguments label { font-weight: 500; }
.command-arguments input {
  --at-apply: border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900;
  border-radius: 5px;
  padding: 7px 10px;
  font: inherit;
  color: inherit;
  width: 100%;
}
.command-arguments small {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  font-size: 11px;
  margin-bottom: 8px;
}
.argument-actions { display: flex; justify-content: flex-end; gap: 8px; }
.argument-actions button {
  border-radius: 5px;
  padding: 7px 12px;
}
.use-prompt { background: var(--slidev-theme-primary); color: white; }
.cancel-arguments { --at-apply: border border-neutral-200 dark:border-neutral-700; }
.use-prompt:disabled { opacity: 0.4; cursor: not-allowed; }
.command-name, .command-badge {
  color: var(--slidev-theme-primary);
  font-family: var(--slidev-code-font-family);
}
.command-badge {
  font-size: 14px;
  white-space: nowrap;
}
.command-picker {
  --at-apply: border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 340px;
  max-width: 100%;
  z-index: 10;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 8px 28px #0003;
}
.picker-heading {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  padding: 7px 8px;
  font-size: 11px;
}
button {
  font: inherit;
  cursor: pointer;
}
button:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: 2px;
}
.command-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 7px 8px;
  border-radius: 4px;
}
.command-option:hover {
  --at-apply: bg-neutral-50 dark:bg-neutral-800;
}
.command-option small {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  display: block;
  font-size: 11px;
}
</style>
