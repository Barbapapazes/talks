<script setup lang="ts">
import type { DemoMode } from './agent-demo'
import { computed } from 'vue'
import { delegationToolCalls, investigations, scenarios, sources } from './agent-demo'

const props = defineProps<{ mode: DemoMode, step: number }>()
const scenario = computed(() => scenarios[props.mode])
const step = computed(() => Math.max(0, Math.min(props.step, scenario.value.events.length - 1)))
const events = computed(() => scenario.value.events.slice(0, step.value + 1))
const revision = computed(() => [...events.value].reverse().find(event => event.revision)?.revision)
const tests = computed(() => [...events.value].reverse().find(event => event.tests)?.tests)
const staleTests = computed(() => events.value.findLastIndex(event => event.revision) > events.value.findLastIndex(event => event.tests))
const trace = computed(() => events.value.map((event, index) => ({ ...event, id: `${props.mode}-${index}`, index })).slice(-2).reverse())
const away = computed(() => props.mode === 'background' && step.value >= 2 && step.value < 4)
const showFindings = computed(() => props.mode === 'delegation' && step.value >= 1 && step.value < 4)
const chatHistory = computed(() => {
  if (props.mode === 'background' && step.value >= 3)
    return scenarios.repository.events.slice(1)
  if (props.mode === 'delegation') {
    return [
      scenario.value.events[0]!,
      ...delegationToolCalls.flatMap((call) => {
        if (step.value < call.requestedAt)
          return []
        return step.value >= call.completedAt ? [call.request, call.result] : [call.request]
      }),
    ]
  }
  return events.value
})
const chatEvents = computed(() => chatHistory.value
  .map((event, index) => ({
    ...event,
    index,
    toolName: event.actor === 'Model request' ? event.detail.slice(0, event.detail.indexOf('(')) : undefined,
    toolArguments: event.actor === 'Model request' ? event.detail.slice(event.detail.indexOf('(') + 1, -1) : undefined,
    result: chatHistory.value[index + 1]?.actor === 'Harness → tool result' ? chatHistory.value[index + 1]?.detail : undefined,
  }))
  .filter(event => ['Model request', 'Coordinator', 'Assistant'].includes(event.actor)))
const complete = computed(() => props.mode !== 'conversation' && step.value === scenario.value.events.length - 1)
</script>

<template>
  <div class="agent-demo not-content">
    <div v-if="away" class="task-view">
      <div class="task-view-heading">
        <span class="i-lucide-list-todo text-primary" aria-hidden="true" />
        <strong>My tasks</strong>
        <span class="text-neutral-500 dark:text-neutral-400">The conversation is closed. The job keeps running.</span>
      </div>
      <div class="task-board">
        <section class="panel" aria-label="User task list">
          <div class="panel-heading">
            Today
          </div>
          <div class="task">
            <span class="i-lucide-check" aria-hidden="true" />Prepare the next session
          </div>
          <div class="task">
            <span class="i-lucide-circle" aria-hidden="true" />Write session notes
          </div>
        </section>
        <section class="panel background-job" aria-label="Background job" aria-live="polite">
          <div class="panel-heading">
            <span class="i-lucide-bot text-primary" aria-hidden="true" />Checkout fix
            <small>{{ step === 2 ? 'Running' : 'Completed' }}</small>
          </div>
          <div class="job-progress">
            <div><span class="i-lucide-check" aria-hidden="true" />Read code and tests</div>
            <div><span class="i-lucide-check" aria-hidden="true" />Apply the fix</div>
            <div class="text-primary">
              <span :class="step === 2 ? 'i-lucide-loader-circle' : 'i-lucide-check'" aria-hidden="true" />
              {{ step === 2 ? 'Running tests…' : 'Both tests passed' }}
            </div>
          </div>
        </section>
      </div>
      <div v-if="step === 3" class="notification rounded-md border border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950" role="status">
        <span class="i-lucide-bell text-primary" aria-hidden="true" />
        <strong>Checkout fix ready for review</strong>
        <span>2 tests passed. Open the result to inspect the change. Nothing has been deployed.</span>
        <span class="open-result text-primary">Open result →</span>
      </div>
    </div>
    <div v-else class="workspace">
      <ChatWindow label="Chat" class="chat">
        <ChatMessage type="user" content="Find a bug in this project and fix it." />
        <template v-for="event in chatEvents" :key="event.index">
          <ChatToolCall
            v-if="event.toolName"
            :name="event.toolName"
            :arguments="event.toolArguments"
            :status="event.result ? 'completed' : mode === 'delegation' && event.toolName === 'delegate' ? 'running' : 'requested'"
            :result="event.result"
            compact
          />
          <ChatMessage v-else type="assistant" :content="event.detail" />
        </template>
        <ChatMessage v-if="complete" type="assistant" content="The fix is ready for review. Both tests pass. Nothing has been deployed." />
        <div v-if="mode === 'conversation' && step >= 2" class="notice text-neutral-500 dark:text-neutral-400">
          <span class="i-lucide-lock-keyhole" aria-hidden="true" />
          No file was read or changed.
        </div>
      </ChatWindow>
      <div class="execution" aria-label="Execution">
        <section v-if="mode === 'background'" class="panel background-job" aria-label="Background job status">
          <div class="panel-heading">
            <span class="i-lucide-bot text-primary" aria-hidden="true" />Background job
            <small>{{ step === 0 ? 'Queued' : step === 1 ? 'Running' : 'Completed' }}</small>
          </div>
          <div class="job-activity" role="status">
            {{ step === 0 ? 'Waiting for a worker' : step === 1 ? 'Reading code and tests…' : 'Result opened for review · Not deployed' }}
          </div>
        </section>
        <section v-if="showFindings" class="project panel" aria-label="Delegated investigations">
          <div class="panel-heading">
            <span class="i-lucide-network" aria-hidden="true" />Coordinator → investigators
          </div>
          <div v-for="investigation in investigations" :key="investigation.file" class="investigator rounded-md border border-neutral-200 dark:border-neutral-700">
            <div><span class="i-lucide-repeat-2 text-primary" aria-hidden="true" /><strong>{{ investigation.agent }}</strong><small>Read only · Same model</small></div>
            <ChatToolCall
              name="read"
              :arguments="JSON.stringify({ path: investigation.file })"
              :status="step === 1 ? 'running' : 'completed'"
              :result="step >= 2 ? investigation.finding : undefined"
              compact
            />
            <p>{{ step === 1 ? `Inspecting ${investigation.file}…` : investigation.finding }}</p>
          </div>
        </section>
        <section v-else-if="mode !== 'conversation'" class="project panel" aria-label="Fictional checkout project">
          <div class="panel-heading">
            <span class="i-lucide-file-code" aria-hidden="true" />cart.ts <small>{{ revision ? 'Read from project' : 'Not read yet' }}</small>
          </div>
          <pre v-if="revision" class="source"><code>function total(subtotal, discount) {
  {{ sources[revision] }}
}</code></pre>
          <div v-else class="unread text-neutral-500 dark:text-neutral-400">
            The project starts with the same bug.<br>No file content returned yet.
          </div>
          <div class="test-heading">
            {{ tests ? staleTests ? 'Previous test run · rerun needed' : 'Test results' : 'Expected behavior' }}<span v-if="tests" :class="tests === 'failed' ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'">{{ tests === 'failed' ? '1 passed · 1 failed' : '2 passed' }}</span>
          </div>
          <div class="test-row">
            <span>100 € − 10 € → 90 €</span><small>{{ tests ? 'PASS' : 'Not run' }}</small>
          </div>
          <div class="test-row" :class="{ 'text-red-600 dark:text-red-400': tests === 'failed' }">
            <span>20 € − 30 € → 0 €</span><small>{{ tests === 'failed' ? 'FAIL · got -10 €' : tests === 'passed' ? 'PASS' : 'Not run' }}</small>
          </div>
          <div v-if="revision === 'final' && tests === 'passed'" class="review text-green-700 dark:text-green-400">
            Ready for review · Not deployed
          </div>
        </section>
        <section v-if="mode === 'conversation'" class="project panel" aria-label="Project access">
          <div class="panel-heading">
            <span class="i-lucide-folder-lock" aria-hidden="true" />Checkout project
          </div>
          <div class="locked">
            <span class="i-lucide-lock-keyhole text-primary" aria-hidden="true" /><strong>Not connected</strong><p>The assistant cannot read or edit these files in this configuration.</p>
          </div>
          <div class="test-row">
            <span>cart.ts</span><small>No access</small>
          </div>
          <div class="test-row">
            <span>cart.test.ts</span><small>No access</small>
          </div>
        </section>
        <section v-else-if="mode !== 'background'" class="trace panel" aria-label="Execution trace · latest events">
          <div class="trace-heading text-neutral-500 dark:text-neutral-400">
            Execution trace · latest events
          </div>
          <TransitionGroup name="trace" tag="ul" class="trace-list" aria-live="polite">
            <li v-for="item in trace" :key="item.id" class="trace-event" :class="{ latest: item.index === step }">
              <div class="eyebrow text-primary">
                {{ item.actor }}
              </div>
              <strong>{{ item.title }}</strong>
              <p :class="{ 'font-mono': item.actor === 'Model request' }">
                {{ item.detail }}
              </p>
            </li>
          </TransitionGroup>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agent-demo { --demo-accent: #853bd1; height: 100%; font-size: 13px; line-height: 1.4; }
:global(.dark) .agent-demo { --demo-accent: #bc85f0; }
.agent-demo .text-primary { color: var(--demo-accent); }
.eyebrow { font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.workspace { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }
.workspace > * { min-width: 0; min-height: 0; height: 100%; }
.chat { border: 0; border-radius: 0; }
.chat :deep(.chat-window-messages) { padding-top: 20px; }
.execution { --at-apply: border-l border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950; display: flex; flex-direction: column; gap: 14px; padding: 16px; overflow: auto; }
.execution > .project { flex-shrink: 0; }
.execution > .trace { flex: 1; min-height: 170px; }
.panel { --at-apply: border border-neutral-200 bg-white rounded-md dark:border-neutral-700 dark:bg-neutral-900; overflow: hidden; }
.panel-heading { --at-apply: border-b border-neutral-200 dark:border-neutral-700; display: flex; align-items: center; gap: 8px; padding: 12px 14px; font-weight: 600; }
.panel-heading small { margin-left: auto; font-size: 10px; font-weight: 400; opacity: .6; }
.source { margin: 0; padding: 20px 14px; min-height: 100px; font-size: 12px; line-height: 1.7; background: transparent; white-space: pre-wrap; overflow-wrap: anywhere; }
.unread { padding: 24px 14px; min-height: 100px; }
.test-heading { --at-apply: border-t border-neutral-200 dark:border-neutral-700; display: flex; justify-content: space-between; padding: 10px 14px 6px; font-size: 11px; font-weight: 600; }
.test-row { display: flex; justify-content: space-between; padding: 8px 14px; font-size: 13px; }
.test-row small { font-size: 10px; opacity: .7; }
.review { padding: 8px 14px; font-size: 11px; }
.locked { text-align: center; padding: 20px 35px 10px; }
.locked > span { display: block; width: 24px; height: 24px; margin: 0 auto 8px; }
.locked p { font-size: 12px; opacity: .65; }
.notice { display: flex; gap: 8px; align-items: center; font-size: 12px; }
.trace { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.trace-heading { font-size: 14px; font-weight: 600; }
.trace-list { position: relative; display: grid; grid-template-rows: repeat(2, minmax(0, 1fr)); flex: 1; min-height: 0; margin: 0; padding: 0; list-style: none; gap: 7px; }
.trace-enter-active { transition: opacity 250ms ease; }
.trace-enter-from { opacity: 0; }
.trace-leave-active { display: none; }
.trace-move { transition: none; }
@media (prefers-reduced-motion: reduce) {
  .trace-enter-active, .trace-leave-active, .trace-move { transition: none; }
}
.trace-event { --at-apply: border border-neutral-200 bg-white rounded-md dark:border-neutral-700 dark:bg-neutral-800; padding: 9px 11px; min-height: 0; overflow: auto; transition: none; }
.trace-event.trace-enter-active { transition: opacity 250ms ease; }
.trace-event:not(.latest) { opacity: .55; }
.trace-event strong { display: block; font-size: 13px; margin-top: 3px; }
.trace-event p { margin: 4px 0 0; font-size: 11px; overflow-wrap: anywhere; }
.trace-event.latest { border-color: #a855f7; }
.task { display: flex; align-items: center; gap: 8px; padding: 16px 14px; font-size: 12px; }
.task-view { --at-apply: bg-neutral-100 dark:bg-neutral-950; height: 100%; padding: 36px 48px; }
.task-view-heading { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.task-view-heading > strong { font-size: 24px; }
.task-view-heading > span:last-child { flex-basis: 100%; font-size: 15px; }
.task-board { display: grid; grid-template-columns: 1fr 1fr; align-items: start; gap: 24px; }
.background-job { flex-shrink: 0; }
.background-job .panel-heading small { font-size: 12px; opacity: 1; color: var(--demo-accent); }
.job-progress { display: grid; gap: 16px; padding: 20px 14px; font-size: 15px; }
.job-progress > div { display: flex; align-items: center; gap: 10px; }
.job-activity { padding: 12px 14px; }
.notification { display: grid; grid-template-columns: 22px 1fr; gap: 8px 12px; margin-top: 24px; padding: 20px; font-size: 17px; }
.notification > span:not(:first-child) { grid-column: 2; font-size: 14px; }
.open-result { font-weight: 600; }
.investigator { margin: 12px 14px; padding: 10px; }
.investigator > div { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.investigator small { margin-left: auto; font-size: 8px; opacity: .6; }
.investigator :deep(.chat-tool-call) { margin-top: 10px; }
.investigator p { margin: 7px 0 0; font-size: 12px; }
</style>
