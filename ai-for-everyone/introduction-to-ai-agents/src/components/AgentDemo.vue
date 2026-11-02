<script setup lang="ts">
import type { DemoMode } from './agent-demo'
import { computed } from 'vue'
import { scenarios, sources } from './agent-demo'

const props = defineProps<{ mode: DemoMode, step: number }>()
const scenario = computed(() => scenarios[props.mode])
const step = computed(() => Math.max(0, Math.min(props.step, scenario.value.events.length - 1)))
const events = computed(() => scenario.value.events.slice(0, step.value + 1))
const revision = computed(() => [...events.value].reverse().find(event => event.revision)?.revision)
const tests = computed(() => [...events.value].reverse().find(event => event.tests)?.tests)
const staleTests = computed(() => events.value.findLastIndex(event => event.revision) > events.value.findLastIndex(event => event.tests))
const trace = computed(() => events.value.map((event, index) => ({ ...event, id: `${props.mode}-${index}`, index })).slice(-2))
const away = computed(() => props.mode === 'background' && step.value >= 2 && step.value < 4)
const showFindings = computed(() => props.mode === 'delegation' && step.value >= 1 && step.value < 4)
const chatEvents = computed(() => events.value
  .filter(event => ['Model request', 'Coordinator', 'Assistant', 'Notification'].includes(event.actor)))
const complete = computed(() => props.mode !== 'conversation' && step.value === scenario.value.events.length - 1)
</script>

<template>
  <div class="agent-demo not-content">
    <div class="workspace">
      <ChatWindow label="Chat" class="chat">
        <ChatMessage type="user" content="Find a bug in this project and fix it." />
        <ChatMessage v-for="(event, index) in chatEvents" :key="index" type="assistant" :content="event.detail" />
        <ChatMessage v-if="complete" type="assistant" content="The fix is ready for review. Both tests pass. Nothing has been deployed." />
        <div v-if="mode === 'conversation' && step >= 2" class="notice text-neutral-500 dark:text-neutral-400">
          <span class="i-lucide-lock-keyhole" aria-hidden="true" />
          No file was read or changed.
        </div>
      </ChatWindow>
      <div class="execution" aria-label="Execution">
        <section v-if="away" class="project panel" aria-label="User task list">
          <div class="panel-heading">
            <span class="i-lucide-list-todo" aria-hidden="true" />My tasks
          </div>
          <div class="task">
            <span class="i-lucide-check" aria-hidden="true" />Prepare the next session
          </div>
          <div class="task">
            <span class="i-lucide-clock" aria-hidden="true" />Review checkout fix <small>{{ step === 2 ? 'Running in background' : 'Ready for review' }}</small>
          </div>
          <div v-if="step === 3" class="notification rounded-md border border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950" role="status">
            <span class="i-lucide-bell text-primary" aria-hidden="true" />
            <strong>Checkout fix ready for review</strong>
            <span>2 tests passed. Open the result to inspect the change.</span>
          </div>
        </section>
        <section v-else-if="showFindings" class="project panel" aria-label="Delegated investigations">
          <div class="panel-heading">
            <span class="i-lucide-network" aria-hidden="true" />Coordinator → investigators
          </div>
          <div v-for="file in ['cart.ts', 'cart.test.ts']" :key="file" class="investigator rounded-md border border-neutral-200 dark:border-neutral-700">
            <div><span class="i-lucide-repeat-2 text-primary" aria-hidden="true" /><strong>{{ file === 'cart.ts' ? 'Code investigator' : 'Test investigator' }}</strong><small>Read only · Same model</small></div>
            <p>{{ step === 1 ? `Inspect ${file} and report findings.` : file === 'cart.ts' ? 'The discount is subtracted twice.' : 'The total must never be negative.' }}</p>
          </div>
          <p class="coordination text-neutral-500 dark:text-neutral-400">
            Separate contexts and tool calls. More coordination, not automatically a better result.
          </p>
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
        <MessageLog v-else title="Execution trace · latest events" :items="trace" class="trace">
          <template #default="{ item }">
            <div class="trace-event" :class="{ latest: item.index === step }">
              <div class="eyebrow text-primary">
                {{ item.actor }}
              </div>
              <strong>{{ item.title }}</strong>
              <p :class="{ 'font-mono': item.actor === 'Model request' }">
                {{ item.detail }}
              </p>
            </div>
          </template>
        </MessageLog>
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
.trace { padding: 12px; gap: 8px; }
.trace :deep(ul) { margin: 0; padding: 0; list-style: none; gap: 7px; }
.trace-event { --at-apply: border border-neutral-200 bg-white rounded-md dark:border-neutral-700 dark:bg-neutral-800; padding: 9px 11px; }
.trace-event:not(.latest) { opacity: .55; }
.trace-event strong { display: block; font-size: 13px; margin-top: 3px; }
.trace-event p { margin: 4px 0 0; font-size: 11px; overflow-wrap: anywhere; }
.trace-event.latest { border-color: #a855f7; }
.task { display: flex; align-items: center; gap: 8px; padding: 16px 14px; font-size: 12px; }
.task small { margin-left: auto; font-size: 9px; opacity: .6; }
.notification { display: grid; grid-template-columns: 18px 1fr; gap: 6px 8px; margin: 8px 14px; padding: 12px; font-size: 12px; }
.notification > span:last-child { grid-column: 2; font-size: 11px; }
.investigator { margin: 12px 14px; padding: 10px; }
.investigator > div { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.investigator small { margin-left: auto; font-size: 8px; opacity: .6; }
.investigator p { margin: 7px 0 0; font-size: 12px; }
.coordination { margin: 10px 14px; font-size: 11px; }
</style>
