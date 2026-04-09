<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { watchDeep } from '@vueuse/core';
import { useInaliaQuestion } from 'slidev-addon-inalia';
import { computed, watch } from 'vue';
import { SUPPORTED_SLIDE_THEMES } from '../contants';
import { useCurrentTheme } from '../composables/useCurrentTheme'

const { $slidev } = useSlideContext()
const canChooseTheme = computed(() => ($slidev.configs as any).chooseTheme?.questionId)
const questionId = computed(() => canChooseTheme.value ? ($slidev.configs as any).chooseTheme?.questionId : undefined)
const { question, data } = useInaliaQuestion(() => questionId.value, {
  staticContent: {
    question: undefined,
    type: undefined,
    chart: undefined,
    data: undefined,
  },
})
const { setCurrentTheme } = useCurrentTheme()
watch(question, () => {
  if (!question.value) {
    return
  }

  if (question.value.type !== 'single_select') {
    throw new Error(`Unsupported question type "${question.value.type}". Only "single_select" is supported.`)
  }

  for (const choice of question.value.options.choices) {
    if (!SUPPORTED_SLIDE_THEMES.includes(choice.text as any)) {
      throw new Error(`Choice "${choice.text}" is not a supported theme. Supported themes are ${SUPPORTED_SLIDE_THEMES.join(', ')}.`)
    }
  }
}, { immediate: true })
watchDeep(data, () => {
  // TODO: export SelectData from the addon and use it here instead of "any"
  const entry = [...(data.value as any[])].sort((a: any, b: any) => b.count - a.count)[0]

  if (entry) {
    document.documentElement.setAttribute('data-theme', entry.label) // TODO: migrate to the composable
    setCurrentTheme(entry.label)
  }
}, { immediate: true })
</script>

<template>
  <div />
</template>
