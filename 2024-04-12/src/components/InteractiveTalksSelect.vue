<script lang="ts" setup>
import { computed } from 'vue'
import type { Answer, Question } from '../types'

const props = defineProps<{
  question: Question
  answers: Answer[]
}>()

const selectOptions = computed(() => {
  if (props.question.type !== 'select' && props.question.type !== 'multi-select')
    throw new Error('Invalid question type')

  return props.question.options
})
</script>

<template>
  <template v-if="selectOptions.chartType === 'bar'">
    <InteractiveTalksSelectBar :question="question" :answers="answers" />
  </template>

  <template v-if="selectOptions.chartType === 'donut'">
    <InteractiveTalksSelectDonut :question="question" :answers="answers" />
  </template>
</template>
