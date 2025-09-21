<script lang="ts" setup>
import type { TimelineItem as ITimelineItem } from '../types/timeline'
import TimelineItem from './TimelineItem.vue'

const props = defineProps<{
  items: ITimelineItem[]
}>()
</script>

<template>
  <div class="grid gap-8" :style="`grid-template-columns: repeat(${props.items.length}, minmax(0, 1fr))`">
    <v-clicks>
      <TimelineItem
        v-for="(item, index) in props.items"
        :key="item.title"
        :click="props.items.length + index + 1"
        v-bind="item"
      />
    </v-clicks>
  </div>
</template>
