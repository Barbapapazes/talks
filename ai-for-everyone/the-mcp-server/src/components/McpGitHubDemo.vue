<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import ChatAnimation from '../../../../theme/components/Chat/ChatAnimation.vue'
import ChatToolCall from '../../../../theme/components/Chat/ChatToolCall.vue'

const props = defineProps<{ withServer?: boolean }>()
const nameId = useId()
const urlId = useId()
const panelOpen = ref(false)
const addingServer = ref(false)
const connected = ref(false)
const serverName = ref('')
const serverUrl = ref('')

const featurePrompt = 'How can we prevent users from accidentally deleting a project?'
const issuePrompt = 'Sounds good. Create an issue for this on GitHub.'
function frames(text: string) {
  const words = text.split(' ')
  return words.map((_, index) => words.slice(0, index + 1).join(' '))
}
const suggestionFrames = frames('Show a confirmation dialog before deleting a project. Require the user to type the project’s name to confirm.')
const replyFrames = computed(() => frames(props.withServer
  ? 'Created issue #42 in acme/project-dashboard: Require confirmation before deleting a project.'
  : 'I can draft the issue, but I can’t create it on GitHub. I don’t have access to your repository.'))
const canConnect = computed(() => {
  try {
    return serverName.value.trim().length > 0 && new URL(serverUrl.value).protocol === 'https:'
  }
  catch {
    return false
  }
})
const ready = computed(() => !props.withServer || connected.value)

function connect() {
  if (canConnect.value)
    connected.value = true
}
</script>

<template>
  <div class="mcp-demo not-content" @click.stop>
    <ChatAnimation
      :enabled="ready && !panelOpen"
      :user-prompt="featurePrompt"
      :assistant-html-frames="suggestionFrames"
      :follow-up-prompt="issuePrompt"
      :follow-up-html-frames="replyFrames"
      :typewriter-char-delay-ms="30"
      :integrations="withServer ? { connected, open: panelOpen } : undefined"
      @toggle-integrations="panelOpen = !panelOpen"
    >
      <template v-if="withServer" #followUpTool="{ phase, started }">
        <ChatToolCall
          v-if="started && ['searching', 'thinking', 'streaming', 'done'].includes(phase)"
          name="create_issue"
          :arguments="JSON.stringify({ repository: 'acme/project-dashboard', title: 'Require confirmation before deleting a project', body: 'Before deleting a project, show a confirmation dialog requiring the user to type the project\'s name.' }, null, 2)"
          :result="JSON.stringify({ content: [{ type: 'text', text: 'Created issue #42 in acme/project-dashboard: Require confirmation before deleting a project.' }], isError: false }, null, 2)"
          compact
          :status="phase === 'streaming' || phase === 'done' ? 'completed' : 'running'"
        />
      </template>
    </ChatAnimation>

    <section v-if="panelOpen" class="integrations-panel" aria-label="Integrations" @keydown.stop>
      <header class="panel-header">
        <strong>Integrations</strong>
        <button type="button" aria-label="Close integrations" @click="panelOpen = false">
          Close
        </button>
      </header>
      <template v-if="!connected">
        <p>Give your assistant access to external tools.</p>
        <button v-if="!addingServer" type="button" class="primary-button" @click="addingServer = true">
          Add MCP server
        </button>
        <form v-else class="server-form" @submit.prevent="connect">
          <label :for="nameId">Name</label>
          <input :id="nameId" v-model="serverName" placeholder="GitHub" autocomplete="off" required>
          <label :for="urlId">Server URL</label>
          <input :id="urlId" v-model="serverUrl" type="url" placeholder="https://github-mcp.example.com/mcp" autocomplete="off" required>
          <small>Use a fictional HTTPS URL. No credentials needed.</small>
          <button type="submit" class="primary-button" :disabled="!canConnect">
            Connect
          </button>
        </form>
      </template>
      <template v-else>
        <div class="connection-state" role="status">
          <strong>{{ serverName }} · Connected</strong>
          <span>{{ serverUrl }}</span>
        </div>
        <div class="discovered-tool">
          <span class="i-ph-wrench size-5" aria-hidden="true" />
          <div><code>create_issue</code><small>Discovered by the application · ready to use</small></div>
        </div>
        <button type="button" class="primary-button" @click="panelOpen = false">
          Start conversation
        </button>
      </template>
    </section>
  </div>
</template>

<style scoped>
.mcp-demo {
  position: absolute;
  inset: 0;
  font-size: 14px;
  line-height: 1.45;
}
.mcp-demo :deep(.assistant-content) {
  font-size: 16px;
}
.panel-header, .discovered-tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
button {
  cursor: pointer;
  font: inherit;
}
button:disabled {
  cursor: default;
  opacity: 0.4;
}
button:focus-visible, input:focus-visible {
  outline: 2px solid #9b65d0;
  outline-offset: 3px;
}
.primary-button {
  border-radius: 8px;
  background: #6c1eb9;
  color: white;
  padding: 8px 13px;
  white-space: nowrap;
}
.integrations-panel {
  --at-apply: bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700;
  position: absolute;
  inset: 8px 8px 8px auto;
  width: 420px;
  max-width: calc(100% - 16px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: -12px 0 40px #0002;
  overflow-y: auto;
}
.panel-header {
  margin-bottom: 14px;
}
.panel-header button {
  font-size: 12px;
}
.integrations-panel p {
  margin: 20px 0;
}
.server-form {
  display: grid;
  gap: 9px;
  margin-top: 18px;
}
.server-form input {
  --at-apply: border border-neutral-300 dark:border-neutral-600;
  border-radius: 7px;
  padding: 8px 10px;
  background: transparent;
  font: inherit;
  width: 100%;
}
.server-form small, .discovered-tool small {
  --at-apply: text-neutral-500 dark:text-neutral-400;
  display: block;
  font-size: 11px;
}
.connection-state {
  --at-apply: text-teal-700 dark:text-teal-400;
  display: grid;
  gap: 6px;
  margin: 24px 0;
}
.connection-state span {
  font-size: 11px;
  overflow-wrap: anywhere;
}
.discovered-tool {
  justify-content: flex-start;
  margin-bottom: 24px;
}
</style>
