<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import ProbabilityBar from '@theme/components/ai/ProbabilityBar.vue'
import TokenChip from '@theme/components/ai/TokenChip.vue'
import DiagramPanel from '@theme/components/DiagramPanel.vue'
import { computed, onUnmounted, ref, watch } from 'vue'
import { inputTokens, nextTokenCandidates, visibleToken } from '../data/language-model-example'

const { $clicks } = useSlideContext()
const stage = ref(0)
const phase = ref<'embedding' | 'attention' | 'mlp' | 'output'>('embedding')
const layer = ref('')
let timers: ReturnType<typeof setTimeout>[] = []

const tokens = inputTokens.map(token => visibleToken(token.text))
const embeddings = inputTokens.map(token => token.embedding)
const vectors = computed(() => embeddings.map((values, row) => values.map((value, column) => {
  if (stage.value === 0)
    return value
  return Math.sin(value * 3 + stage.value * 0.83 + row * 0.47 + column * 0.69) * 0.9
})))
const showTransformer = computed(() => $clicks.value >= 1)
const output = computed(() => $clicks.value >= 5)
const contextual = computed(() => stage.value > 0)
const candidates = nextTokenCandidates.map(candidate => ({
  token: candidate.text === null
    ? 'Others'
    : visibleToken(candidate.text),
  score: candidate.logit,
  probability: candidate.probability,
}))

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

function schedule(delay: number, action: () => void) {
  timers.push(setTimeout(action, delay))
}

// Rebuild the timeline on navigation, including backwards clicks and direct entry.
watch($clicks, (rawClick) => {
  clearTimers()
  const click = Math.max(0, rawClick - 1)
  stage.value = click < 2
    ? 0
    : click === 2
      ? 1
      : click === 3
        ? 2
        : 10
  layer.value = click === 0
    ? ''
    : click <= 2
      ? '1'
      : click === 3
        ? '2'
        : 'N'
  phase.value = click === 0
    ? 'embedding'
    : click >= 4
      ? 'output'
      : click === 2
        ? 'mlp'
        : 'attention'
  if (click === 1) {
    schedule(850, () => {
      stage.value = 1
    })
  }
  if (click === 2) {
    schedule(500, () => {
      stage.value = 2
    })
  }
  if (click === 3) {
    const layers = ['2', '3', '…', 'N']
    layers.forEach((label, index) => {
      const start = index * 1300
      schedule(start, () => {
        layer.value = label
        phase.value = 'attention'
      })
      schedule(start + 400, () => {
        stage.value = 3 + index * 2
      })
      schedule(start + 650, () => {
        phase.value = 'mlp'
      })
      schedule(start + 1000, () => {
        stage.value = 4 + index * 2
      })
    })
  }
}, { immediate: true })
onUnmounted(clearTimers)
</script>

<template>
  <div class="transformer-demo not-content" :class="[phase, { contextual }]">
    <div class="column-label tokens-label">
      Tokens
    </div>
    <DiagramPanel v-show="showTransformer" class="transformer-frame">
      <div class="frame-title">
        Transformer <span v-if="layer">/ Layer {{ layer }}</span>
      </div>
      <div v-if="phase !== 'embedding'" class="operations">
        <span :class="{ active: phase === 'attention' }">Attention</span>
        <span class="operation-arrow">→</span>
        <span :class="{ active: phase === 'mlp' }">MLP</span>
        <span v-if="output" class="done">✓</span>
      </div>
    </DiagramPanel>
    <div v-show="showTransformer" class="column-label vectors-label">
      {{ contextual ? 'Contextual representations' : 'Embeddings' }}
    </div>

    <!-- Only the last position's incoming attention is highlighted. All sources
         precede it or are the position itself, respecting the causal mask. -->
    <svg v-show="showTransformer" class="attention-links" viewBox="0 0 880 365" aria-hidden="true">
      <path
        v-for="(_, index) in tokens" :key="index"
        :d="`M 300 ${102 + index * 46} C ${170 + index * 15} ${102 + index * 46}, ${170 + index * 15} 286, 300 286`"
        :class="{ important: index === 1 || index === 3 }"
      />
    </svg>

    <div v-for="(token, row) in tokens" :key="token" class="token-row" :class="{ last: row === 4 }" :style="{ '--row': row }">
      <TokenChip class="token">
        {{ token }}
      </TokenChip>
      <div v-show="showTransformer" class="input-arrow">
        →
      </div>
      <div v-show="showTransformer" class="vector" :aria-label="`${token}: ${vectors[row]?.map(value => value.toFixed(2)).join(', ')}`">
        <div
          v-for="(value, column) in vectors[row]" :key="column" class="cell"
          :title="value.toFixed(2)"
          :class="value >= 0 ? 'bg-primary' : 'bg-teal-600'"
          :style="{ opacity: 0.18 + Math.abs(value) * 0.76 }"
        />
        <span class="ellipsis">…</span>
      </div>
      <div v-if="row === 4" class="output-arrow">
        →
      </div>
    </div>

    <div class="readout" :aria-hidden="!output">
      <div class="table-head">
        <span>Vocabulary</span><span>Logits</span><span>Probability</span>
      </div>
      <div v-for="candidate in candidates" :key="candidate.token" class="candidate">
        <span class="font-mono">{{ candidate.token }}</span>
        <span class="score font-mono">{{ candidate.score }}</span>
        <ProbabilityBar :value="candidate.probability" variant="labelled" :revealed="output" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.transformer-demo {
  position: absolute;
  width: 880px;
  height: 318px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.column-label { position: absolute; top: 56px; font-size: 13px; --at-apply: text-neutral-500; }
.tokens-label { left: 0; }
.vectors-label { left: 300px; }
.transformer-frame {
  position: absolute;
  top: 0;
  left: 145px;
  width: 410px;
  height: 318px;
  border-radius: 12px;
}
.frame-title { position: absolute; left: 18px; top: 12px; font-size: 15px; font-weight: 600; }
.frame-title span { --at-apply: text-primary; }
.operations { position: absolute; right: 16px; top: 15px; display: flex; align-items: center; gap: 8px; --at-apply: text-neutral-400; font-size: 12px; }
.operations .active { --at-apply: text-primary; font-weight: 700; }
.operation-arrow { --at-apply: text-neutral-400; }
.done { --at-apply: text-primary; }
.attention-links { position: absolute; inset: 0; width: 880px; height: 365px; pointer-events: none; overflow: visible; }
.attention-links path { fill: none; --at-apply: stroke-primary; stroke-width: 1.5; stroke-dasharray: 5 7; opacity: 0; transition: opacity 350ms; }
.attention .attention-links path { opacity: 0.18; animation: information-flow 1.1s linear infinite; }
.attention .attention-links path.important { opacity: 0.7; stroke-width: 2.5; }
.token-row { position: absolute; top: calc(84px + var(--row) * 46px); left: 0; width: 585px; height: 36px; transition: opacity 500ms; }
.token { position: absolute; left: 0; top: 0; width: 116px; height: 36px; line-height: 34px; padding: 0 10px; font-size: 19px; }
.input-arrow { position: absolute; left: 124px; top: 4px; --at-apply: text-neutral-400; }
.vector { position: absolute; left: 300px; top: 0; display: flex; align-items: center; gap: 4px; height: 36px; padding: 5px; --at-apply: border border-neutral-300 bg-white; border-radius: 6px; transition: box-shadow 400ms, border-color 400ms; }
.cell { width: 22px; height: 24px; border-radius: 3px; transition: opacity 650ms, background-color 650ms; }
.ellipsis { padding: 0 2px; --at-apply: text-neutral-400; font-size: 13px; }
.mlp .vector { --at-apply: border-primary/45 ring-3 ring-primary/8; }
.output .token-row:not(.last) { opacity: 0.25; }
.output .last .vector { --at-apply: border-primary ring-3 ring-primary/12; }
.output-arrow { position: absolute; left: 557px; top: 1px; --at-apply: text-primary; font-size: 23px; opacity: 0; transition: opacity 500ms; }
.output .output-arrow { opacity: 1; }
.readout { position: absolute; left: 595px; top: 310px; width: 285px; opacity: 0; transform: translateY(-100%); transition: opacity 500ms; }
.output .readout { opacity: 1; }
.table-head, .candidate { display: grid; grid-template-columns: 88px 48px 1fr; gap: 8px; align-items: center; }
.table-head { font-size: 11px; --at-apply: text-neutral-500; margin-bottom: 8px; }
.candidate { height: 32px; font-size: 15px; }
.score { --at-apply: text-neutral-500; font-size: 13px; }
@keyframes information-flow { to { stroke-dashoffset: -24; } }
@media (prefers-reduced-motion: reduce) {
  .transformer-demo *, .attention-links path { animation: none !important; transition: none !important; }
}
</style>
