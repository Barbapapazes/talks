<script lang="ts" setup>
import type { SelectData } from 'slidev-addon-inalia'
import { useNav, useSlideContext } from '@slidev/client'
import { useInaliaQuestion } from 'slidev-addon-inalia'
import { computed, watchEffect } from 'vue'

interface ChoicesProps {
  img?: string
}
const props = defineProps<ChoicesProps>()

const { $frontmatter } = useSlideContext()
const { slides, go } = useNav()

const inalia = computed(() => $frontmatter.inalia)
const questionId = computed(() => inalia.value?.questionId)
const { question, data } = useInaliaQuestion(questionId, {
  staticContent: {
    question: inalia.value.question,
    type: inalia.value.type,
    chart: inalia.value.chart,
    data: inalia.value.data,
  },
})

watchEffect(() => {
  if (!question.value) {
    return
  }

  if (question.value.type !== 'single_select') {
    throw new Error(`Unsupported question type "${question.value.type}". Only "single_select" is supported.`)
  }

  for (const choice of question.value.options.choices) {
    const matchingSlide = slides.value.find(slide => slide.meta?.name === choice.text)
    if (!matchingSlide) {
      throw new Error(`Choice "${choice.text}" does not match any slide name.`)
    }
  }
})

const choices = computed(() => slides.value.filter(slide => $frontmatter.choices.includes(slide.meta.name)))
const total = computed(() => (data.value as SelectData).reduce((sum: number, entry) => sum + entry.count, 0))
const enhancedChoices = computed(() => {
  return choices.value.map((choice) => {
    const entry = (data.value as SelectData).find(entry => entry.label === choice.meta.name)
    const count = entry ? entry.count : 0
    const percentage = total.value > 0 ? (count / total.value) * 100 : 0
    const color = entry ? entry.color : undefined

    return {
      color,
      count,
      fillStyle: {
        backgroundColor: color,
        opacity: percentage > 0 ? Math.min(0.18 + percentage / 100 * 0.4, 0.58) : 0,
        width: `${percentage}%`,
      },
      percentage,
      percentageLabel: `${Math.round(percentage)}%`,
      slide: choice,
      total,
    }
  })
})

const cols = computed(() => {
  return choices.value.length === 3 ? 1 : 2
})

const gridStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
  }
})
</script>

<template>
  <div class="h-full slidev-layout grid gap-4 justify-center choices" :style="gridStyle">
    <BackgroundImage :img="$frontmatter.img ?? props.img" :img-class="$frontmatter.imgClass" class="-z-1" />
    <Card v-for="choice in enhancedChoices" :key="choice.slide.meta.name" class="relative isolate overflow-hidden">
      <div class="pointer-events-none absolute inset-y-0 left-0 transition-all duration-300 ease-out" :style="choice.fillStyle" />

      <div class="relative z-10 flex h-full items-center justify-between gap-6">
        <div class="min-w-0">
          <div class="font-bold text-lg text-neutral-700">
            {{ choice.slide.meta.name }}
          </div>

          <div class="mt-1 text-xs text-neutral-500">
            {{ choice.count }} / {{ choice.total }} · {{ choice.percentageLabel }}
          </div>
        </div>

        <div class="shrink-0 text-right text-neutral-700">
          <div class="text-4xl font-black tabular-nums">
            {{ choice.count }}
          </div>

          <div class="text-xs tracking-wide uppercase text-neutral-500">
            votes
          </div>
        </div>
      </div>

      <button class="absolute inset-0 z-20" :aria-label="`Go to ${choice.slide.meta.name}`" @click="go(choice.slide.no)" />
    </Card>
  </div>
</template>

<style scoped>
html[data-theme='brutalism'] {
  .choices {
    --at-apply: gap-12
  }
}
</style>
