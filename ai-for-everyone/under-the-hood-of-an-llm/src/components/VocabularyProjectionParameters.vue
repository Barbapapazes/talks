<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import ProbabilityBar from '@theme/components/ai/ProbabilityBar.vue'
import DiagramPanel from '@theme/components/DiagramPanel.vue'

const { $clicks } = useSlideContext()
const candidates = [
  { token: 'Paris', score: '3.0', probability: 78 },
  { token: 'Lyon', score: '1.4', probability: 16 },
  { token: 'Others', score: '…', probability: 6 },
]
</script>

<template>
  <div class="parameter-demo output-demo" :class="{ 'stage-one': $clicks >= 1, 'stage-two': $clicks >= 2 }">
    <div class="demo-column">
      <DiagramPanel class="vector">
        <span v-for="(value, index) in [0.6, -0.2, 0.9, 0.3]" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + Math.abs(value) * 0.7 }" />
        <span class="ellipsis">…</span>
      </DiagramPanel>
    </div>
    <div class="operation step step-one" :aria-hidden="$clicks < 1">
      <span class="font-mono">W<sub>vocab</sub></span><span class="connector"><span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" /></span>
    </div>
    <DiagramPanel class="readout step step-one" :aria-hidden="$clicks < 1">
      <div class="candidate table-head">
        <span>Token</span><span>Logit</span><span class="step step-two" :aria-hidden="$clicks < 2">Probability</span>
      </div>
      <div v-for="(candidate, row) in candidates" :key="candidate.token" class="candidate" :style="{ '--row': row }">
        <span class="font-mono">{{ candidate.token }}</span>
        <span class="score font-mono">{{ candidate.score }}</span>
        <ProbabilityBar class="step step-two" :value="candidate.probability" variant="labelled" :revealed="$clicks >= 2" :aria-hidden="$clicks < 2" />
      </div>
    </DiagramPanel>
  </div>
</template>

<style scoped src="./parameter-diagrams.css" />
