<script lang="ts" setup>
import type { AnswerText } from '../types'

defineProps<{
  answers: AnswerText[]
}>()
</script>

<template>
  <div flex="~ row wrap" gap-x-8 gap-y-2>
    <div v-for="answer in answers" :key="answer.id">
      <div>
        <div>
          {{ answer.value.content }}
        </div>
      </div>
    </div>
  </div>
</template>
