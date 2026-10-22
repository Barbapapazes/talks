<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const trained = computed(() => $clicks.value >= 1)
const using = computed(() => $clicks.value >= 2)
const language = computed(() => $clicks.value >= 3)
const examples = [
  { text: 'Claim your free prize!', label: 'spam' },
  { text: 'Urgent, send your slides.', label: 'not spam' },
  { text: 'Lunch at noon?', label: 'not spam' },
  { text: 'You won! Click here.', label: 'spam' },
]
// Illustrative parameters only. They change during training, not during use.
function cellColor(index: number, learned: boolean) {
  const value = learned ? ((index * 17 + 7) % 31) / 31 : ((index * 3 + 2) % 11) / 44
  return `color-mix(in srgb, ${index % 3 === 0 ? '#0f766e' : '#6c1eb9'} ${15 + value * 70}%, #fff)`
}
</script>

<template>
  <div class="learned-parameters not-content" :class="{ trained, using, language }">
    <div class="examples" :aria-hidden="using">
      <div class="label">
        Labeled examples
      </div>
      <div v-for="example in examples" :key="example.text" class="example">
        <span>{{ example.text }}</span><span class="tag">{{ example.label }}</span>
      </div>
    </div>

    <div class="input" :aria-hidden="!using">
      <div class="label">
        {{ language ? 'Context' : 'New message, not in the examples' }}
      </div>
      <div class="input-text" :class="{ 'font-mono': language }">
        <template v-if="language">
          The capital of France is
        </template>
        <template v-else>
          “Urgent, can you call me?”
        </template>
      </div>
    </div>

    <div class="connector">
      <span class="arrow">→</span>
    </div>

    <div class="model">
      <div class="label">
        {{ trained ? 'Learned parameters' : 'Initial parameters' }}
      </div>
      <div class="parameter-grid" role="img" aria-label="Illustrative grid of numerical model parameters">
        <span v-for="index in 48" :key="index" :style="{ background: cellColor(index, trained), transitionDelay: `${(index % 8) * 55}ms` }" />
      </div>
    </div>

    <div class="prediction" :aria-hidden="!using">
      <span class="arrow">→</span>
      <div>
        <div class="label">
          Prediction
        </div>
        <div class="output font-mono">
          {{ language ? 'Paris' : 'not spam' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learned-parameters { --accent: var(--slidev-theme-primary, #6c1eb9); position: relative; width: 100%; height: 400px; }
.label { color: #737373; font-size: 14px; font-weight: 600; margin-bottom: 16px; }
.examples, .input { position: absolute; left: 0; top: 82px; width: 310px; transition: opacity 400ms; }
.example { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 10px; margin-bottom: 8px; background: #f5f5f5; border: 1px solid #e5e5e5; border-radius: 5px; font-size: 14px; }
.tag { font-size: 11px; color: #737373; white-space: nowrap; }
.connector { position: absolute; left: 316px; top: 168px; width: 132px; text-align: center; transition: left 500ms; }
.arrow { color: #a3a3a3; font-size: 28px; }
.model { position: absolute; left: 468px; top: 82px; width: 200px; text-align: center; transition: left 500ms; }
.parameter-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; padding: 16px; border: 1px solid #e5e5e5; background: #fafafa; border-radius: 6px; box-shadow: 0 1px 2px #0000000d; }
.parameter-grid span { aspect-ratio: 1; border-radius: 2px; transition: background 900ms; }
.input { top: 136px; opacity: 0; }
.input-text { font-size: 21px; line-height: 1.6; }
.prediction { position: absolute; left: 640px; top: 136px; display: flex; align-items: center; gap: 28px; opacity: 0; transition: opacity 400ms 300ms; }
.output { font-size: 22px; color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, #fafafa); border: 1px solid color-mix(in srgb, var(--accent) 18%, #e5e5e5); border-radius: 6px; padding: 8px 16px; white-space: nowrap; }
.using .examples { opacity: 0; pointer-events: none; }
.using .input, .using .prediction { opacity: 1; }
.using .model { left: 412px; }
.using .connector { left: 322px; width: 70px; }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 1ms !important; transition-delay: 0ms !important; } }
</style>
