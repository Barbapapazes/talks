<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { computed } from 'vue'
import type { Answer, Question } from 'slidev-addon-inalia/types'

const props = defineProps<{
  question: Question
  answers: Answer<'single_select'>[]
}>()

const [parent] = useAutoAnimate()

const items = computed(() => {
  return [...props.answers].sort((a, b) => b.value - a.value)
})
</script>

<template>
  <div ref="parent" flex="~ row wrap items-center justify-center gap-4">
    <div v-for="item in items" :key="item.value" flex="~ col items-center" gap-1>
      <img :src="`https://unjs.io/assets/logos/${item.label}.svg`" w-6 h-6>
      <div flex="~ row" gap-1 text="gray-400 xs">
        <span>{{ item.label }}</span>
        <span>({{ item.value }})</span>
      </div>
    </div>
  </div>
</template>
