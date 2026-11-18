<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DiagramPanel from '@theme/components/DiagramPanel.vue'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const activated = computed(() => $clicks.value >= 2)
const values = [-0.5, 0.8, -0.3, 0.6, 0.9, -0.7, 0.4, 0.2]
</script>

<template>
  <div class="parameter-demo" :class="{ 'stage-one': $clicks >= 1, 'stage-two': activated, 'stage-three': $clicks >= 3 }">
    <div class="demo-column">
      <DiagramPanel class="vector vertical-vector">
        <span v-for="(value, index) in values.slice(0, 4)" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + Math.abs(value) * 0.7 }" />
      </DiagramPanel>
    </div>
    <div class="operation step step-one" :aria-hidden="$clicks < 1">
      <span class="connector"><span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" /></span><span class="font-mono">W₁</span>
    </div>
    <div class="demo-column step step-one" :aria-hidden="$clicks < 1">
      <DiagramPanel class="vector vertical-vector" :class="{ 'active-panel': activated }">
        <span v-for="(value, index) in values" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ 'opacity': activated && value < 0 ? 0.12 : 0.2 + Math.abs(value) * 0.7, '--row': index }" />
      </DiagramPanel>
    </div>
    <div class="operation step step-three" :aria-hidden="$clicks < 3">
      <span class="connector"><span class="i-ph-arrow-right-thin block size-6" aria-hidden="true" /></span><span class="font-mono">W₂</span>
    </div>
    <div class="demo-column step step-three" :aria-hidden="$clicks < 3">
      <DiagramPanel class="vector vertical-vector">
        <span v-for="(value, index) in [0.6, -0.2, 0.9, 0.3]" :key="index" class="vector-cell" :class="value < 0 ? 'bg-teal-600' : 'bg-primary'" :style="{ opacity: 0.2 + Math.abs(value) * 0.7 }" />
      </DiagramPanel>
    </div>
  </div>
</template>

<style scoped src="./parameter-diagrams.css" />
