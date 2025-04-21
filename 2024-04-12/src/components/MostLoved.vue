<script lang="ts" setup>
import type { SelectData } from 'slidev-addon-inalia/types/data'
import type { Question } from 'slidev-addon-inalia/types/question'
import type { DeepReadonly } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { computed } from 'vue'

const props = defineProps<{
  question: DeepReadonly<Question>
  data: DeepReadonly<SelectData>
}>()

const [parent] = useAutoAnimate()

const items = computed(() => {
  return [...props.data].sort((a, b) => b.count - a.count)
})
</script>

<template>
  <div ref="parent" flex="~ row wrap items-center justify-center gap-4">
    <div v-for="item in items" :key="item.count" flex="~ col items-center" gap-1>
      <img :src="`https://unjs.io/assets/logos/${item.label}.svg`" w-6 h-6>
      <div flex="~ row" gap-1 text="gray-400 xs">
        <span>{{ item.label }}</span>
        <span>({{ item.count }})</span>
      </div>
    </div>
  </div>
</template>
