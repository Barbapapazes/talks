<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import ChatMessage from '@theme/components/Chat/ChatMessage.vue'
import ChatToolCall from '@theme/components/Chat/ChatToolCall.vue'
import ChatWindow from '@theme/components/Chat/ChatWindow.vue'
import Inspect from '@theme/components/Inspect/Inspect.vue'
import InspectJson from '@theme/components/Inspect/InspectJson.vue'
import CodeBlockContent from '@theme/components/ui/code-block/CodeBlockContent.vue'
import { computed } from 'vue'
import { mcpRequest, mcpResult } from '../data/mcp-protocol'
import McpExchangeMap from './McpExchangeMap.vue'

const props = defineProps<{ withMcp?: boolean }>()

const { $clicks } = useSlideContext()
const prompt = 'Create an issue in acme/project-dashboard to confirm project deletion.'
const args = {
  repository: 'acme/project-dashboard',
  title: 'Confirm project deletion',
  body: 'Require the project name before deleting it.',
}
const issue = { number: 42, html_url: 'https://github.com/acme/project-dashboard/issues/42' }
const tool = {
  type: 'function',
  name: 'create_issue',
  description: 'Create an issue in a GitHub repository.',
  parameters: {
    type: 'object',
    properties: {
      repository: { type: 'string' },
      title: { type: 'string' },
      body: { type: 'string' },
    },
    required: ['repository', 'title', 'body'],
    additionalProperties: false,
  },
  strict: true,
}
// OpenAI Responses API request and function schema:
// https://github.com/openai/openai-openapi/blob/main/openapi.json
const request = {
  model: 'gpt-4.1',
  input: [{ role: 'user', content: prompt }],
  tools: [tool],
}
// Keep parameter types compact in the full request.
function formatSchema(value: Record<string, unknown>) {
  return JSON.stringify(value, null, 2)
    .replace(/\{\n\s*"type": "string"\n\s*\}/g, '{ "type": "string" }')
    .replace(/\[\n\s*"repository",\n\s*"title",\n\s*"body"\n\s*\]/, '["repository", "title", "body"]')
}
const requestJson = formatSchema(request)

const call = {
  type: 'function_call',
  call_id: 'call_42',
  name: 'create_issue',
  arguments: JSON.stringify(args),
}
const reply = 'Created issue #42: Confirm project deletion.'
const directSteps = [
  {
    direction: 'Application → model API',
    label: 'POST /v1/responses · model, user message and tools',
    payload: request,
  },
  {
    direction: 'Model API → application',
    label: 'Response · function call',
    payload: { output: [call] },
  },
  {
    direction: 'Application → GitHub API',
    label: 'POST https://api.github.com/repos/acme/project-dashboard/issues',
    payload: { title: args.title, body: args.body },
  },
  {
    direction: 'GitHub API → application',
    label: '201 Created · response body, selected fields',
    payload: issue,
  },
  {
    direction: 'Application → model API',
    label: 'POST /v1/responses · conversation with the tool result',
    payload: {
      ...request,
      input: [
        ...request.input,
        call,
        { type: 'function_call_output', call_id: 'call_42', output: JSON.stringify(issue) },
      ],
    },
  },
  {
    direction: 'Model API → application',
    label: 'Response · assistant message',
    payload: { output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: reply }] }] },
  },
]
const mcpTool = { name: tool.name, description: tool.description, inputSchema: tool.parameters }
const mcpSteps = [
  {
    direction: 'Application → MCP server',
    label: 'Discover available tools',
    payload: mcpRequest('tools/list', 1),
  },
  {
    direction: 'MCP server → application',
    label: 'tools/list response',
    payload: mcpResult(1, { tools: [mcpTool], ttlMs: 300000, cacheScope: 'public' }),
  },
  {
    direction: 'Application → MCP server',
    label: 'Forward the same create_issue request',
    payload: mcpRequest('tools/call', 2, { name: tool.name, arguments: args }),
  },
  {
    direction: 'MCP server → GitHub API',
    label: 'POST https://api.github.com/repos/acme/project-dashboard/issues',
    payload: { title: args.title, body: args.body },
  },
  {
    direction: 'MCP server → application',
    label: 'tools/call response · after GitHub returns issue #42',
    payload: mcpResult(2, { content: [{ type: 'text', text: JSON.stringify(issue) }], isError: false }),
  },
  {
    direction: 'Model API → application',
    label: 'Same assistant reply',
    payload: directSteps[5]!.payload,
  },
]
const steps = computed(() => props.withMcp ? mcpSteps : directSteps)
const step = computed(() => Math.min($clicks.value, steps.value.length - 1))
const current = computed(() => steps.value[step.value]!)
const focus = computed(() => {
  if (props.withMcp)
    return step.value === 3 ? 'api' : step.value === 5 ? 'model' : 'server'
  return step.value === 2 || step.value === 3 ? 'api' : 'model'
})
const toolVisible = computed(() => step.value >= (props.withMcp ? 2 : 1))
const toolStatus = computed(() => {
  if (step.value >= (props.withMcp ? 4 : 3))
    return 'completed'
  return step.value === (props.withMcp ? 2 : 1) ? 'requested' : 'running'
})
const schema = computed(() => !props.withMcp && step.value === 0)
</script>

<template>
  <div class="tool-walkthrough not-content">
    <span v-click="5" class="absolute h-0 w-0" aria-hidden="true" />
    <div class="walkthrough-map">
      <McpExchangeMap :with-mcp="withMcp" :focus="focus" />
    </div>
    <ChatWindow label="Application" class="walkthrough-chat">
      <ChatMessage type="user" :content="prompt" />
      <ChatToolCall
        v-if="toolVisible"
        name="create_issue"
        :arguments="JSON.stringify(args, null, 2)"
        :status="toolStatus"
        :result="JSON.stringify(issue, null, 2)"
        compact
      />
      <ChatMessage v-if="step >= 5" type="assistant" :content="reply" />
    </ChatWindow>
    <Inspect class="walkthrough-inspector">
      <template #header>
        <div class="inspector-heading">
          <span>{{ current.direction }}</span>
          <span class="text-xs text-neutral-400">{{ step + 1 }} / {{ steps.length }}</span>
        </div>
        <div class="exchange-label border-b border-neutral-700 font-mono">
          {{ current.label }}
        </div>
      </template>
      <CodeBlockContent v-if="schema" :code="requestJson" language="json" wrap class="tool-schema" />
      <InspectJson v-else :value="current.payload" />
    </Inspect>
  </div>
</template>

<style scoped>
.tool-walkthrough {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr) 160px;
  gap: 0;
}
.walkthrough-map { grid-column: 1 / -1; grid-row: 2; display: flex; align-items: center; justify-content: center; overflow: hidden; border-top: 1px solid #e4e4e7; }
.walkthrough-map :deep(.exchange-map) { flex-shrink: 0; }
.walkthrough-chat { grid-column: 1; grid-row: 1; }
.walkthrough-inspector { grid-column: 2; grid-row: 1; }
.walkthrough-chat { height: 100%; min-width: 0; border: 0; border-radius: 0; box-shadow: none; }
.walkthrough-chat :deep(.chat-window-messages) { padding: 16px; }
.walkthrough-inspector { min-width: 0; border: 0; border-radius: 0; }
.inspector-heading { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; font-size: 14px; font-weight: 600; }
.exchange-label { padding: 0 16px 12px; color: #a3a3a3; font-size: 11px; overflow-wrap: anywhere; }
.walkthrough-inspector :deep(.inspect-json) { font-size: 13px; }
.tool-schema { padding: 12px 16px; font-size: 13px; line-height: 1.3; }
.tool-schema :deep(.syntax-token) { color: var(--shiki-dark); }
</style>
