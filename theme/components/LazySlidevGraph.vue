<script lang="ts" setup>
import type { DataItem } from 'slidev-addon-graph'
import { onSlideEnter } from '@slidev/client'
import { ref } from 'vue'

interface LazySlidevGraphProps {
  id: string
  items: DataItem[]
  clicks?: number
}

const props = withDefaults(defineProps<LazySlidevGraphProps>(), {
  clicks: 0,
})

const show = ref(false)

onSlideEnter(() => {
  show.value = true
})
</script>

<template>
  <SlidevGraph
    v-if="show"
    :id="props.id"
    :clicks="props.clicks"
    :items="props.items"
  />
</template>
