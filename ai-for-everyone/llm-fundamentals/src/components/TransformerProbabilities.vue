<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { computed, onUnmounted, ref, watch } from 'vue'

const { $clicks } = useSlideContext()
const stage = ref(0)
const phase = ref<'embedding' | 'attention' | 'mlp' | 'output'>('embedding')
const layer = ref('')
let timers: ReturnType<typeof setTimeout>[] = []

const tokens = ['The', '·capital', '·of', '·France', '·is']
// Illustrative activations, not extracted from a model. The first three
// coordinates match TextToVectors so the two slides start with the same values.
const embeddings = [
  [0.12, -0.34, 0.08, 0.45, -0.23, 0.61, -0.12, 0.3],
  [-0.21, 0.67, 0.15, -0.31, 0.42, 0.08, -0.52, 0.19],
  [0.43, 0.02, -0.56, 0.12, -0.38, 0.29, 0.51, -0.17],
  [0.71, -0.18, 0.39, -0.44, 0.16, 0.54, -0.27, 0.05],
  [-0.09, 0.31, 0.62, 0.18, -0.46, 0.03, 0.35, -0.29],
]
const vectors = computed(() => embeddings.map((values, row) => values.map((value, column) => {
  if (stage.value === 0)
    return value
  return Math.sin(value * 3 + stage.value * 0.83 + row * 0.47 + column * 0.69) * 0.9
})))
const showTransformer = computed(() => $clicks.value >= 1)
const output = computed(() => $clicks.value >= 5)
const contextual = computed(() => stage.value > 0)
// The displayed scores and probabilities agree under softmax, rounded to integers.
const candidates = [
  { token: '·Paris', score: '4.36', probability: 78 },
  { token: '·Lyon', score: '2.20', probability: 9 },
  { token: '·the', score: '1.61', probability: 5 },
  { token: 'Others', score: '…', probability: 8 },
]

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
  stage.value = click < 2 ? 0 : click === 2 ? 1 : click === 3 ? 2 : 10
  layer.value = click === 0 ? '' : click <= 2 ? '1' : click === 3 ? '2' : 'N'
  phase.value = click === 0 ? 'embedding' : click >= 4 ? 'output' : click === 2 ? 'mlp' : 'attention'
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
    <div v-show="showTransformer" class="transformer-frame">
      <div class="frame-title">
        Transformer <span v-if="layer">/ Layer {{ layer }}</span>
      </div>
      <div v-if="phase !== 'embedding'" class="operations">
        <span :class="{ active: phase === 'attention' }">Attention</span>
        <span class="operation-arrow">→</span>
        <span :class="{ active: phase === 'mlp' }">MLP</span>
        <span v-if="output" class="done">✓</span>
      </div>
    </div>
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
      <div class="token font-mono">
        {{ token }}
      </div>
      <div v-show="showTransformer" class="input-arrow">
        →
      </div>
      <div v-show="showTransformer" class="vector" :aria-label="`${token}: ${vectors[row]?.map(value => value.toFixed(2)).join(', ')}`">
        <div
          v-for="(value, column) in vectors[row]" :key="column" class="cell"
          :title="value.toFixed(2)"
          :style="{ backgroundColor: `color-mix(in srgb, ${value >= 0 ? 'var(--accent)' : '#269b9b'} ${18 + Math.abs(value) * 76}%, #fafafa)` }"
        />
        <span class="ellipsis">…</span>
      </div>
      <div v-if="row === 4" class="output-arrow">
        →
      </div>
    </div>

    <div class="readout" :aria-hidden="!output">
      <div class="readout-title">
        Output projection <span>→ softmax</span>
      </div>
      <div class="table-head">
        <span>Vocabulary</span><span>Logits</span><span>Probability</span>
      </div>
      <div v-for="candidate in candidates" :key="candidate.token" class="candidate">
        <span class="font-mono">{{ candidate.token }}</span>
        <span class="score font-mono">{{ candidate.score }}</span>
        <span class="probability"><span class="bar" :style="{ width: `${candidate.probability}%` }" /><span>{{ candidate.probability }}%</span></span>
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
  --accent: var(--slidev-theme-primary, #6c1eb9);
}
.column-label { position: absolute; top: 56px; font-size: 13px; color: #737373; }
.tokens-label { left: 0; }
.vectors-label { left: 300px; }
.transformer-frame {
  position: absolute;
  top: 0;
  left: 145px;
  width: 410px;
  height: 318px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background: #fafafa;
}
.frame-title { position: absolute; left: 18px; top: 12px; font-size: 15px; font-weight: 600; }
.frame-title span { color: var(--accent); }
.operations { position: absolute; right: 16px; top: 15px; display: flex; align-items: center; gap: 8px; color: #a3a3a3; font-size: 12px; }
.operations .active { color: var(--accent); font-weight: 700; }
.operation-arrow { color: #a3a3a3; }
.done { color: var(--accent); }
.attention-links { position: absolute; inset: 0; width: 880px; height: 365px; pointer-events: none; overflow: visible; }
.attention-links path { fill: none; stroke: var(--accent); stroke-width: 1.5; stroke-dasharray: 5 7; opacity: 0; transition: opacity 350ms; }
.attention .attention-links path { opacity: 0.18; animation: information-flow 1.1s linear infinite; }
.attention .attention-links path.important { opacity: 0.7; stroke-width: 2.5; }
.token-row { position: absolute; top: calc(84px + var(--row) * 46px); left: 0; width: 585px; height: 36px; transition: opacity 500ms; }
.token { position: absolute; left: 0; top: 0; width: 116px; height: 36px; line-height: 34px; padding: 0 10px; font-size: 19px; color: var(--accent); border: 1px solid color-mix(in srgb, var(--accent) 18%, #e5e5e5); border-radius: 6px; background: color-mix(in srgb, var(--accent) 7%, #fafafa); }
.input-arrow { position: absolute; left: 124px; top: 4px; color: #a3a3a3; }
.vector { position: absolute; left: 300px; top: 0; display: flex; align-items: center; gap: 4px; height: 36px; padding: 5px; border: 1px solid #d4d4d4; border-radius: 6px; background: white; transition: box-shadow 400ms, border-color 400ms; }
.cell { width: 22px; height: 24px; border-radius: 3px; transition: background-color 650ms; }
.ellipsis { padding: 0 2px; color: #a3a3a3; font-size: 13px; }
.mlp .vector { border-color: color-mix(in srgb, var(--accent) 45%, #d4d4d4); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 8%, transparent); }
.output .token-row:not(.last) { opacity: 0.25; }
.output .last .vector { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 12%, transparent); }
.output-arrow { position: absolute; left: 557px; top: 1px; color: var(--accent); font-size: 23px; opacity: 0; transition: opacity 500ms; }
.output .output-arrow { opacity: 1; }
.readout { position: absolute; left: 595px; top: 310px; width: 285px; opacity: 0; transform: translateY(-100%); transition: opacity 500ms; }
.output .readout { opacity: 1; }
.readout-title { font-size: 14px; font-weight: 600; margin-bottom: 17px; }
.readout-title span { color: var(--accent); }
.table-head, .candidate { display: grid; grid-template-columns: 88px 48px 1fr; gap: 8px; align-items: center; }
.table-head { font-size: 11px; color: #737373; margin-bottom: 8px; }
.candidate { height: 32px; font-size: 15px; }
.score { color: #737373; font-size: 13px; }
.probability { position: relative; display: flex; align-items: center; height: 24px; font-size: 12px; font-variant-numeric: tabular-nums; }
.probability .bar { position: absolute; left: 0; top: 0; height: 100%; border-radius: 3px; background: color-mix(in srgb, var(--accent) 15%, white); transform: scaleX(0); transform-origin: left; transition: transform 700ms 250ms; }
.output .probability .bar { transform: scaleX(1); }
.probability > span:last-child { position: relative; padding-left: 6px; }
@keyframes information-flow { to { stroke-dashoffset: -24; } }
@media (prefers-reduced-motion: reduce) {
  .transformer-demo *, .attention-links path { animation: none !important; transition: none !important; }
}
</style>
