<script lang="ts" setup>
import type { TimelineItem } from '../types/timeline'

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
