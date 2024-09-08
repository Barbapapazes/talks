<script lang="ts" setup>
import { onUnmounted, ref, shallowRef, watch } from 'vue'
import { useNav } from '@slidev/client'
import type { Transmit } from '@adonisjs/transmit-client'
import { fetchQuestion } from '../utils/InteractiveTalksFetchQuestion'
import { INTERACTIVE_TALKS_BASE_URL, INTERACTIVE_TALKS_TOKEN } from '../utils/InteractiveTalksConstants'
import { getAnswerQuestionUrl, getAnswersUrl, getQuestionEventsChannel, getQuestionUrl } from '../utils/InteractiveTalksUrls'
import { createListener } from '../utils/InteractiveTalksCreateListener'
import { fetchAnswers } from '../utils/InteractiveTalksFetchAnswers'
import type { Answer } from '../types'
import InteractiveTalksQR from './InteractiveTalksQR.vue'
import InteractiveTalksText from './InteractiveTalksText.vue'

const props = defineProps<{
  slide: number
  talkSlug: string
  questionSlug: string
}>()

const { currentPage } = useNav()

const data = ref<Answer[]>([])

const baseUrl = INTERACTIVE_TALKS_BASE_URL
const token = INTERACTIVE_TALKS_TOKEN

const questionUrl = getQuestionUrl(baseUrl, props.talkSlug, props.questionSlug)
const answersUrl = getAnswersUrl(baseUrl, props.talkSlug, props.questionSlug)

const question = await fetchQuestion(questionUrl, token)
const answers = await fetchAnswers<Answer>(answersUrl, token)

data.value = answers

const answerQuestionUrl = getAnswerQuestionUrl(baseUrl, question.id)
const questionChannel = getQuestionEventsChannel(question.id)

const transmit = shallowRef<Transmit | null>(null)

if (currentPage.value === props.slide && !transmit.value) {
  transmit.value = createListener(baseUrl, token)
  transmit.value.listenOn<Answer>(questionChannel, (payload) => {
    data.value = [...data.value, payload]
  })
}

watch([currentPage, () => props.slide], async () => {
  if (currentPage.value !== props.slide) {
    transmit.value?.close()
    transmit.value = null
    return
  }

  if (transmit.value)
    return

  // Refresh the answers
  const answers = await fetchAnswers<Answer>(answersUrl, token)
  data.value = answers

  transmit.value = createListener(baseUrl, token)
  transmit.value.listenOn<Answer>(questionChannel, (payload) => {
    data.value = [...data.value, payload]
  })
})

onUnmounted(() => {
  transmit.value?.close()
})
</script>

<template>
  <div flex="~ row" gap-8>
    <div grow flex="~ col" gap-8>
      <h1>
        {{ question.question }}
      </h1>

      <slot :question="question" :answers="data">
        <InteractiveTalksText v-if="question.type === 'text'" :answers="data" />
        <InteractiveTalksSelect v-if="question.type === 'select' || question.type === 'multi-select'" :question="question" :answers="data" />
      </slot>
    </div>

    <InteractiveTalksQR h-40 w-40 shrink-0 rounded-lg overflow-hidden :url="answerQuestionUrl" />
  </div>
</template>
