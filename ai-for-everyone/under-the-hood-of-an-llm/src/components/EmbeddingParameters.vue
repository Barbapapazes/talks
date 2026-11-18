<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import TokenChip from '@theme/components/ai/TokenChip.vue'
import DiagramPanel from '@theme/components/DiagramPanel.vue'

const { $clicks } = useSlideContext()
const values = [0.2, -0.7, 0.4, 0.8, -0.3, 0.6]
</script>

<template>
  <div class="parameter-demo" :class="{ 'stage-one': $clicks >= 1, 'stage-two': $clicks >= 2 }">
    <div class="demo-column">
      <TokenChip size="lg">
        42
      </TokenChip>
    </div>
    <div class="connector">
      <span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" />
    </div>
    <div class="demo-column">
      <DiagramPanel class="matrix">
        <div v-for="row in 5" :key="row" class="matrix-row" :class="{ 'selected-row': row === 3 }">
          <span class="row-id font-mono">{{ 39 + row }}</span>
          <span v-for="(value, col) in values" :key="col" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: row === 3 ? 0.2 + Math.abs(value) * 0.7 : 0.18 + ((row * 7 + col * 3) % 9) / 15 }" />
        </div>
      </DiagramPanel>
    </div>
    <div class="connector step step-two" :aria-hidden="$clicks < 2">
      <span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" />
    </div>
    <div class="demo-column step step-two" :aria-hidden="$clicks < 2">
      <DiagramPanel class="vector">
        <span v-for="(value, index) in values" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + Math.abs(value) * 0.7 }" />
        <span class="ellipsis">…</span>
      </DiagramPanel>
    </div>
  </div>
</template>

<style scoped src="./parameter-diagrams.css" />
