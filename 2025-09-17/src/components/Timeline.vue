<script lang="ts" setup>
import type { TimelineItem as ITimelineItem } from './TimelineItem.vue'
import TimelineItem from './TimelineItem.vue'

const props = defineProps<{
  items: ITimelineItem[]
}>()
</script>

<template>
  <div>
    <TimelineItem
      v-for="item in props.items"
      :key="item.title"
      v-bind="item"
    />
  </div>
</template>
