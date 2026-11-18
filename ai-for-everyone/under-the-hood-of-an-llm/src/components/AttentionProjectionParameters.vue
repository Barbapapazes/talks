<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DiagramPanel from '@theme/components/DiagramPanel.vue'

const { $clicks } = useSlideContext()
const projections = ['Q', 'K', 'V']
const input = [0.2, -0.7, 0.4, 0.8]
</script>

<template>
  <div class="parameter-demo" :class="{ 'stage-one': $clicks >= 1, 'stage-two': $clicks >= 2 }">
    <div class="demo-column">
      <DiagramPanel class="vector">
        <span v-for="(value, index) in input" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + Math.abs(value) * 0.7 }" />
        <span class="ellipsis">…</span>
      </DiagramPanel>
    </div>
    <div class="projection-rows">
      <div v-for="(name, row) in projections" :key="name" class="projection-row" :style="{ '--row': row }">
        <div class="connector step step-one" :aria-hidden="$clicks < 1">
          <span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" />
        </div>
        <DiagramPanel class="projection-weight step step-one" :aria-hidden="$clicks < 1">
          <span class="font-mono">W<sub>{{ name }}</sub></span>
          <div class="mini-matrix">
            <span v-for="cell in 12" :key="cell" class="weight-cell" :class="cell % 3 === 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + ((cell * 7 + row * 3) % 11) / 16 }" />
          </div>
        </DiagramPanel>
        <div class="connector step step-two" :aria-hidden="$clicks < 2">
          <span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" />
        </div>
        <div class="projected-vector step step-two" :aria-hidden="$clicks < 2">
          <span class="vector-name">{{ name }}</span>
          <DiagramPanel class="vector">
            <span v-for="cell in 4" :key="cell" class="vector-cell" :class="(cell + row) % 3 === 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.25 + ((cell * 3 + row * 7) % 9) / 14 }" />
            <span class="ellipsis">…</span>
          </DiagramPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./parameter-diagrams.css" />
