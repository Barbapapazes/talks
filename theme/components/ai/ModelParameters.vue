<script setup lang="ts">
import DiagramPanel from '../DiagramPanel.vue'

withDefaults(defineProps<{ trained?: boolean }>(), { trained: true })

// Illustrative parameters only. They change during training, not during use.
function cellOpacity(index: number, learned: boolean) {
  const value = learned ? ((index * 17 + 7) % 31) / 31 : ((index * 3 + 2) % 11) / 44
  return 0.15 + value * 0.7
}
</script>

<template>
  <DiagramPanel class="parameter-grid" role="img" aria-label="Illustrative grid of numerical model parameters">
    <span v-for="index in 48" :key="index" :class="index % 3 === 0 ? 'bg-teal-700' : 'bg-primary'" :style="{ opacity: cellOpacity(index, trained), transitionDelay: `${(index % 8) * 55}ms` }" />
  </DiagramPanel>
</template>

<style scoped>
.parameter-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; padding: 16px; }
.parameter-grid span { aspect-ratio: 1; border-radius: 2px; transition: opacity 900ms; }
@media (prefers-reduced-motion: reduce) { * { transition-duration: 1ms !important; transition-delay: 0ms !important; } }
</style>
