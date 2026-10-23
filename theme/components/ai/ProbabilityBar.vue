<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  variant?: 'track' | 'labelled'
  active?: boolean
  revealed?: boolean
}>(), { variant: 'track', active: false, revealed: true })

const percentage = computed(() => Math.min(100, Math.max(0, props.value)))
</script>

<template>
  <div
    class="relative overflow-hidden rounded"
    :class="variant === 'track' ? 'h-2 rounded-full bg-neutral-200' : 'h-6 text-xs tabular-nums'"
    role="meter"
    aria-label="Probability"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="percentage"
  >
    <span
      class="absolute inset-y-0 left-0 origin-left rounded transition-transform duration-700 delay-250 motion-reduce:transition-none"
      :class="[variant === 'labelled' ? 'bg-primary/15' : active ? 'bg-primary' : 'bg-neutral-400', revealed ? 'scale-x-100' : 'scale-x-0']"
      :style="{ width: `${percentage}%` }"
    />
    <span v-if="variant === 'labelled'" class="relative flex h-full items-center pl-1.5">{{ percentage }}%</span>
  </div>
</template>
