<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const history = ref<HTMLElement>()

// Scripted reasoning summaries for the demo, not a live model's internal trace.
const messages = [
  { id: 'setup', at: 0, role: 'System', icon: 'i-lucide-sliders-horizontal', content: 'Instructions + available tools + history' },
  { id: 'inspect-reasoning', at: 2, role: 'Assistant', icon: 'i-lucide-lightbulb', kind: 'Reasoning summary', content: 'Inspect the cart calculation before choosing a fix.' },
  { id: 'fix-reasoning', at: 7, role: 'Assistant', icon: 'i-lucide-lightbulb', kind: 'Reasoning summary', content: 'The discount is subtracted twice. Subtract it once instead.' },
  { id: 'test-reasoning', at: 10, role: 'Assistant', icon: 'i-lucide-lightbulb', kind: 'Reasoning summary', content: 'The file changed successfully. Run the tests to check the behavior.' },
  { id: 'goal', at: 1, role: 'User', icon: 'i-lucide-user', content: 'Find a bug in this project and fix it.' },
  { id: 'read', at: 3, role: 'Assistant', icon: 'i-lucide-brain', content: 'read_file("cart.ts")', code: true },
  { id: 'source', at: 6, role: 'Tool', icon: 'i-lucide-wrench', content: 'return total - discount * 2', code: true },
  { id: 'edit', at: 8, role: 'Assistant', icon: 'i-lucide-brain', content: 'edit_file("cart.ts", "return total - discount")', code: true },
  { id: 'edited', at: 9, role: 'Tool', icon: 'i-lucide-wrench', content: 'File updated.' },
  { id: 'test', at: 11, role: 'Assistant', icon: 'i-lucide-brain', content: 'run_tests()', code: true },
  { id: 'tested', at: 12, role: 'Tool', icon: 'i-lucide-wrench', content: '12 tests passed.' },
  { id: 'answer', at: 13, role: 'Assistant', icon: 'i-lucide-brain', content: 'Fixed the discount calculation. All 12 tests pass.' },
]

const stages = [
  { actor: 'Harness', title: 'Prepare the context', detail: 'Set up instructions and available tools before the user sends a message.', icon: 'i-lucide-text-search', context: true },
  { actor: 'User', title: 'Send a message', detail: 'The user provides a goal. The harness adds the message to the context and calls the model.', icon: 'i-lucide-user', context: true },
  { actor: 'Model', title: 'Plan the inspection', detail: 'The model generates a short reasoning summary before requesting a tool.', icon: 'i-lucide-lightbulb' },
  { actor: 'Model', title: 'Generate a tool call', detail: 'The model asks to read cart.ts. It has not read the file yet.', icon: 'i-lucide-brain' },
  { actor: 'Harness', title: 'Check permissions', detail: 'Validate the arguments and allow this read inside the project. Ask for approval if required.', icon: 'i-lucide-shield-check' },
  { actor: 'Harness', title: 'Dispatch the tool', detail: 'The file tool reads cart.ts in the execution environment. The runtime enforces access restrictions.', icon: 'i-lucide-wrench' },
  { actor: 'Harness', title: 'Append the result', detail: 'The tool result joins the history. The harness calls the model with the updated context.', icon: 'i-lucide-list-plus', context: true },
  { actor: 'Model', title: 'Identify the correction', detail: 'The model uses the returned code to decide what to change. This is a scripted reasoning summary.', icon: 'i-lucide-lightbulb' },
  { actor: 'Model', title: 'Choose the next action', detail: 'The discount is subtracted twice. Using the tool result, the model requests a correction.', icon: 'i-lucide-brain' },
  { actor: 'Harness', title: 'Execute and append', detail: 'After validation and permission checks, the edit runs. Its result enters the next model call.', icon: 'i-lucide-list-plus', context: true },
  { actor: 'Model', title: 'Plan the verification', detail: 'The edit succeeded, but the behavior still needs checking. The model chooses to run tests.', icon: 'i-lucide-lightbulb' },
  { actor: 'Model', title: 'Request verification', detail: 'The model asks to run the tests. A successful edit alone does not prove the bug is fixed.', icon: 'i-lucide-brain' },
  { actor: 'Harness', title: 'Return the test result', detail: 'The harness checks and dispatches the test request, then adds the result to the context and calls the model again.', icon: 'i-lucide-list-plus', context: true },
  { actor: 'Model', title: 'Generate a final answer', detail: 'The harness ends this run. The test result is evidence, not a guarantee that every bug is gone.', icon: 'i-lucide-message-square' },
]

const currentStep = computed(() => Math.max(0, Math.min(stages.length - 1, props.step)))
const stage = computed(() => stages[currentStep.value]!)
const visibleMessages = computed(() => messages.filter(message => message.at <= currentStep.value).sort((a, b) => a.at - b.at))

async function scrollToLatest() {
  await nextTick()
  if (history.value)
    history.value.scrollTop = history.value.scrollHeight
}

onMounted(scrollToLatest)
watch(() => visibleMessages.value.length, scrollToLatest)
</script>

<template>
  <div class="agent-loop not-content">
    <aside class="explanation">
      <div :key="currentStep" class="stage rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800" aria-live="polite">
        <span class="stage-count text-neutral-500">{{ currentStep + 1 }} / {{ stages.length }}</span>
        <div class="stage-label text-purple-600 dark:text-purple-400">
          <span :class="stage.icon" aria-hidden="true" />
          {{ stage.actor }}
        </div>
        <h2>{{ stage.title }}</h2>
        <p class="text-neutral-600 dark:text-neutral-300">
          {{ stage.detail }}
        </p>
      </div>
    </aside>
    <section
      class="context-panel rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900"
      aria-label="Conversation history sent to the model"
    >
      <header class="context-heading border-b border-neutral-200 dark:border-neutral-700">
        <strong>Model context</strong>
      </header>
      <div ref="history" class="history" role="log" aria-label="User, assistant, and tool messages">
        <TransitionGroup name="message" tag="ol" class="message-list">
          <li
            v-for="message in visibleMessages"
            :key="message.id"
            class="message rounded-md border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
            :class="{ 'assistant-message': message.role === 'Assistant', 'reasoning-message': !!message.kind, 'latest-message': message.id === visibleMessages.at(-1)?.id }"
          >
            <span :class="message.icon" class="message-icon text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <div class="min-w-0">
              <div class="message-role text-neutral-500 dark:text-neutral-400">
                {{ message.role }}<span v-if="message.kind" class="reasoning-label"> · {{ message.kind }}</span>
              </div>
              <div class="message-content" :class="{ 'font-mono': message.code }">
                {{ message.content }}
              </div>
            </div>
          </li>
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<style scoped>
.agent-loop { display: grid; grid-template-rows: 1fr 3fr; gap: 14px; height: 440px; margin-top: 24px; font-size: 14px; line-height: 1.4; }
.context-panel { display: flex; flex-direction: column; min-height: 0; transition: border-color 250ms, box-shadow 250ms; }
.context-heading { padding: 12px 14px; }
.context-heading strong { font-size: 14px; }
.history { min-height: 0; overflow-y: auto; padding: 10px; scrollbar-width: thin; }
.message-list { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; }
.message { display: flex; align-items: flex-start; gap: 9px; padding: 7px 10px; }
.message-icon { width: 14px; height: 14px; flex-shrink: 0; margin-top: 2px; }
.message-role { font-size: 9px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
.message-content { margin-top: 2px; overflow-wrap: anywhere; font-size: 12px; }
.assistant-message .message-icon, .assistant-message .message-role { color: #a855f7; }
.latest-message { box-shadow: 0 1px 3px rgb(0 0 0 / 5%); }
.reasoning-label { font-weight: 400; letter-spacing: normal; text-transform: none; }
.reasoning-message .message-content { font-style: italic; }
.explanation { min-width: 0; min-height: 0; }
.stage { position: relative; display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 14px 18px; }
.stage > :not(.stage-count) { animation: stage-enter 500ms ease both; }
.stage > h2 { animation-delay: 50ms; }
.stage > p { animation-delay: 100ms; }
.stage-label { display: flex; align-items: center; gap: 7px; font-size: 11px; }
.stage-count { position: absolute; top: 14px; right: 18px; font-size: 10px; }
.stage-label > span[aria-hidden] { width: 16px; height: 16px; }
.stage h2 { margin: 6px 0 0; font-size: 22px; font-weight: 600; line-height: 1.2; }
.stage p { margin: 6px 0 0; font-size: 14px; line-height: 1.4; }
.message-enter-active { transition: opacity 300ms ease-out, transform 300ms ease-out; }
.message-enter-from { opacity: 0; transform: translateY(8px); }
@keyframes stage-enter { from { opacity: 0; filter: blur(2px); } to { opacity: 1; filter: blur(0); } }
@media (prefers-reduced-motion: reduce) {
  .message-enter-active, .context-panel { transition: none; }
  .stage > * { animation: none; }
}
</style>
