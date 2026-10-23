<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import TokenChip from '@theme/components/ai/TokenChip.vue'
import DiagramPanel from '@theme/components/DiagramPanel.vue'
import { computed } from 'vue'
import { sentence } from '../data/language-model-example'
import { spamMessage } from '../data/spam-example'

const corpus = [
  'The first railways connected cities and changed how people travelled. Stations became meeting places, and new neighbourhoods grew around them.',
  'A plant uses light to turn water and carbon dioxide into sugars. Its leaves absorb sunlight while its roots draw water from the soil.',
  'The capital of France is Paris. The city lies on the Seine. Every morning, people cross its bridges on their way to work.',
  'function sum(a, b) { return a + b }\nA function can take inputs and return a value. Here, the result is the sum of two numbers.',
]

const { $clicks } = useSlideContext()
const trained = computed(() => $clicks.value >= 1)
const isolated = computed(() => $clicks.value === 2)
const using = computed(() => $clicks.value >= 3)
const language = computed(() => $clicks.value < 4)
// Illustrative parameters only. They change during training, not during use.
function cellOpacity(index: number, learned: boolean) {
  const value = learned ? ((index * 17 + 7) % 31) / 31 : ((index * 3 + 2) % 11) / 44
  return 0.15 + value * 0.7
}
</script>

<template>
  <div class="learned-parameters not-content" :class="{ trained, isolated, using, language }">
    <div class="examples" :aria-hidden="isolated || using">
      <div class="corpus-pages">
        <DiagramPanel v-for="(text, index) in corpus" :key="text" class="example" :style="{ '--page': index }">
          {{ text }}
        </DiagramPanel>
      </div>
    </div>

    <div class="input" :aria-hidden="!using">
      <div class="input-text" :class="{ 'font-mono': language }">
        <template v-if="language">
          {{ sentence }}
        </template>
        <template v-else>
          “{{ spamMessage.keyword }}{{ spamMessage.text }}”
        </template>
      </div>
    </div>

    <div class="connector" :aria-hidden="isolated">
      <span class="arrow">→</span>
    </div>

    <div class="model">
      <DiagramPanel class="parameter-grid" role="img" aria-label="Illustrative grid of numerical model parameters">
        <span v-for="index in 48" :key="index" :class="index % 3 === 0 ? 'bg-teal-700' : 'bg-primary'" :style="{ opacity: cellOpacity(index, trained), transitionDelay: `${(index % 8) * 55}ms` }" />
      </DiagramPanel>
    </div>

    <div class="prediction" :aria-hidden="!using">
      <span class="arrow">→</span>
      <div>
        <TokenChip size="lg">
          {{ language ? 'Paris' : spamMessage.label }}
        </TokenChip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learned-parameters { position: relative; width: 100%; height: 400px; }
.examples, .input, .connector, .model, .prediction { top: 50%; transform: translateY(-50%); }
.examples, .input { position: absolute; left: 0; width: 310px; transition: opacity 400ms; }
.examples { display: flex; flex-direction: column; gap: 12px; }
.corpus-pages { position: relative; height: 220px; margin-right: 18px; }
.example { position: absolute; top: calc(var(--page) * 48px); left: calc(var(--page) * 6px); width: 100%; height: 76px; overflow: hidden; padding: 10px 12px; border-radius: 5px; font-size: 12px; line-height: 1.5; white-space: pre-line; --at-apply: text-neutral-500; }
.connector { position: absolute; left: 316px; width: 132px; text-align: center; transition: left 500ms, opacity 400ms; }
.arrow { --at-apply: text-neutral-400; font-size: 28px; }
.model { position: absolute; left: 468px; width: 200px; text-align: center; transition: left 500ms; }
.parameter-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; padding: 16px; }
.parameter-grid span { aspect-ratio: 1; border-radius: 2px; transition: opacity 900ms; }
.input { opacity: 0; }
.input-text { font-size: 21px; line-height: 1.6; }
.prediction { position: absolute; left: 640px; display: flex; align-items: center; gap: 28px; opacity: 0; transition: opacity 400ms 300ms; }
.isolated .examples, .using .examples { opacity: 0; pointer-events: none; }
.isolated .connector { opacity: 0; }
.isolated .model { left: calc(50% - 100px); }
.using .input, .using .prediction { opacity: 1; }
.using .model { left: 412px; }
.using .connector { left: 322px; width: 70px; }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 1ms !important; transition-delay: 0ms !important; } }
</style>
