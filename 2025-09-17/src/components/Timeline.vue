<script lang="ts" setup>
import type { TimelineItem as ITimelineItem } from '../types/timeline'
import TimelineItem from './TimelineItem.vue'

const props = defineProps<{
  items: ITimelineItem[]
}>()
</script>

<template>
  <div class="grid gap-4" :style="`grid-template-columns: repeat(${props.items.length}, minmax(0, 1fr))`">
    <TimelineItem
      v-for="item in props.items"
      :key="item.title"
      v-bind="item"
    />
  </div>
</template>
