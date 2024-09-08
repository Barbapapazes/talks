<script lang="ts" setup>
import { computed } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import type { Answer, Question } from '../types'

const props = defineProps<{
  question: Question
  answers: Answer[]
}>()

const [parent] = useAutoAnimate()

const items = computed(() => {
  if (props.question.type === 'text')
    return []

  return props.question.options.options.map((option) => {
    const count = props.answers.filter(a => a.type === 'select' && a.value.value === option.value).length
    return {
      text: option.text,
      value: option.value,
      count,
    }
  }).sort((a, b) => b.count - a.count)
})
</script>

<template>
  <div ref="parent" flex="~ row wrap items-center justify-center gap-4">
    <div v-for="item in items" :key="item.value" flex="~ col items-center" gap-1>
      <img :src="`https://unjs.io/assets/logos/${item.value}.svg`" w-6 h-6>
      <div flex="~ row" gap-1 text="gray-400 xs">
        <span>{{ item.text }}</span>
        <span>({{ item.count }})</span>
      </div>
    </div>
  </div>
</template>
