<script lang="ts" setup>
import { VisBulletLegend, VisDonut, VisSingleContainer } from '@unovis/vue'
import { computed } from 'vue'
import { toArray } from '../utils/toArray'
import type { Answer, Question } from '../types'

interface Item {
  count: number
  color: string
}

const props = defineProps<{
  question: Question
  answers: Answer[]
}>()

const data = computed<Map<string, Item>>(() => {
  if (props.question.type === 'select') {
    return props.answers.reduce((acc, answer) => {
      if (answer.type !== 'select')
        return acc

      if (props.question.type === 'text')
        return acc

      const option = props.question.options.options.find(option => option.value === answer.value.value)

      if (!acc.has(answer.value.value)) {
        acc.set(answer.value.value, {
          count: 0,
          color: option.color,
        })
      }

      const items = acc.get(answer.value.value)!

      acc.set(answer.value.value, {
        ...items,
        count: items.count + 1,
      })

      return acc
    }, new Map<string, Item>())
  }

  if (props.question.type === 'multi-select') {
    return props.answers.reduce((acc, answer) => {
      if (answer.type !== 'multi-select')
        return acc

      for (const value of answer.value.values) {
        // Create a new entry using the correct option
        if (!acc.has(value)) {
          if (props.question.type === 'text')
            return acc

          const option = props.question.options.options.find(option => option.value === value)

          acc.set(value, {
            count: 0,
            color: option.color,
          })
        }

        const items = acc.get(value)!

        // Add 1 entry
        acc.set(value, {
          ...items,
          count: items.count + 1,
        })
      }

      return acc
    }, new Map<string, Item>())
  }

  return new Map<string, Item>()
})

const value = (item: Item) => item.count
const color = (item: Item) => item.color

const items = computed(() => {
  if (props.question.type === 'text')
    return []

  return props.question.options.options.map((option) => {
    const count = data.value.get(option.value)?.count || 0

    return { name: `${option.text} (${count})`, color: option.color }
  })
})
</script>

<template>
  <VisSingleContainer :data="toArray(data)">
    <VisDonut :value="value" :color="color" :arc-width="40" :show-background="false" :corner-radius="5" :pad-angle="0.05" />
  </VisSingleContainer>
  <VisBulletLegend :items="items" label-class-name="text-lg! text-white! opacity-75" absolute left-8 right-8 bottom-8 text-center />
</template>
