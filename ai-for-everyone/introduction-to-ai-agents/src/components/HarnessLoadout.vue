<script setup lang="ts">
defineProps<{ step: number }>()

const configurations = [
  {
    name: 'Conversational',
    icon: 'i-lucide-messages-square',
    start: 0,
    description: 'Work through the task together.',
    capabilities: [
      { name: 'User turns', detail: 'Ask questions and steer the next step.', icon: 'i-lucide-message-circle' },
      { name: 'Streaming', detail: 'See the response as it arrives.', icon: 'i-lucide-text-cursor-input' },
      { name: 'Message history', detail: 'Include earlier exchanges in the context.', icon: 'i-lucide-history' },
      { name: 'Optional tools', detail: 'Connect tools, including repository access.', icon: 'i-lucide-wrench' },
    ],
  },
  {
    name: 'Coding',
    icon: 'i-lucide-square-terminal',
    start: 1,
    description: 'Work directly in the project.',
    capabilities: [
      { name: 'Filesystem', detail: 'Inspect the actual project files.', icon: 'i-lucide-folder-open' },
      { name: 'Shell', detail: 'Run permitted commands.', icon: 'i-lucide-terminal' },
      { name: 'Code editing', detail: 'Apply changes to project files.', icon: 'i-lucide-file-pen' },
      { name: 'Tests', detail: 'Use failures to decide what to try next.', icon: 'i-lucide-flask-conical' },
      { name: 'Sandbox', detail: 'Restrict file, network, and process access.', icon: 'i-lucide-shield-check' },
    ],
  },
  {
    name: 'Background',
    icon: 'i-lucide-clock',
    start: 2,
    description: 'Keep working without an open session.',
    capabilities: [
      { name: 'Job / event trigger', detail: 'Start from a submitted task or an event.', icon: 'i-lucide-zap' },
      { name: 'Queue', detail: 'Hold tasks until they can run.', icon: 'i-lucide-list-ordered' },
      { name: 'State tracking', detail: 'Track pending, running, failed, or completed work.', icon: 'i-lucide-activity' },
      { name: 'Completion notification', detail: 'Tell the user when the work ends.', icon: 'i-lucide-bell' },
      { name: 'Optional resumability', detail: 'Save enough state to resume interrupted work.', icon: 'i-lucide-bookmark-check' },
    ],
  },
  {
    name: 'Multi-agent',
    icon: 'i-lucide-network',
    start: 3,
    description: 'Distribute work across agent loops.',
    capabilities: [
      { name: 'Multiple loops', detail: 'Each agent has its own context and tool access.', icon: 'i-lucide-repeat-2' },
      { name: 'Delegation', detail: 'Assign a bounded task to another agent.', icon: 'i-lucide-git-branch' },
      { name: 'Coordination', detail: 'Combine findings and decide what happens next.', icon: 'i-lucide-workflow' },
      { name: 'Handoffs', detail: 'Transfer the task and the context needed to continue.', icon: 'i-lucide-arrow-right-left' },
    ],
  },
]
</script>

<template>
  <div class="loadout not-content" role="group" aria-label="Four reference harness configurations">
    <section
      v-for="configuration in configurations" :key="configuration.name"
      class="configuration" :aria-label="configuration.name"
      :class="{ active: step === configuration.start + 1 || (step === 0 && configuration.start === 0) }"
    >
      <div class="configuration-heading">
        <span :class="configuration.icon" class="portrait" aria-hidden="true" />
        <div><strong>{{ configuration.name }}</strong><span class="description">{{ configuration.description }}</span></div>
      </div>
      <div class="capabilities">
        <div
          v-for="(capability, index) in configuration.capabilities" :key="capability.name"
          v-click="configuration.start + 1"
          class="capability forward:delay-[--delay]"
          :style="{ '--delay': `${(index % 2 + Math.floor(index / 2)) * 50}ms` }"
          :aria-hidden="step <= configuration.start"
        >
          <span :class="capability.icon" class="capability-icon" aria-hidden="true" />
          <div><strong>{{ capability.name }}</strong><span>{{ capability.detail }}</span></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.loadout {
  --accent: #853bd1;
  --line: #dedbe5;
  --panel: #f7f5fa;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  font-size: 12px;
  line-height: 1.35;
}
:global(.dark) .loadout { --accent: #bc85f0; --line: #433b50; --panel: #211c29; }
.configuration { min-width: 0; min-height: 0; padding: 18px 22px; display: flex; flex-direction: column; }
.configuration:nth-child(odd) { border-right: 1px solid var(--line); }
.configuration:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
.configuration.active .portrait { color: var(--accent); }
.configuration-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.configuration-heading strong { display: block; font-size: 21px; }
.portrait { width: 28px; height: 28px; flex-shrink: 0; color: inherit; transition: color 200ms ease; }
.description { display: block; font-size: 11px; opacity: .65; margin-top: 2px; }
.capabilities { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; align-content: start; }
.capability { display: flex; gap: 7px; align-items: center; min-height: 36px; padding: 6px 8px; border-radius: 5px; background: var(--panel); }
.capability-icon { width: 16px; height: 16px; flex-shrink: 0; color: var(--accent); }
.capability strong { display: block; font-size: 11px; }
.capability div > span { display: block; font-size: 9px; opacity: .7; margin-top: 2px; }
@media (prefers-reduced-motion: reduce) { .capability, .portrait { transition: none; } }
</style>
