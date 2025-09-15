<script lang="ts">
interface StackItem {}

export interface TimelineItem {
  img: string
  date: string
  title: string
  stack: StackItem[]
}
</script>

<script lang="ts" setup>
const props = defineProps<TimelineItem>()
</script>

<template>
  <div>
    <div>
      {{ props.date }}
    </div>

    <div>
      {{ props.title }}
    </div>
  </div>
</template>
