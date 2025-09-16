<script lang="ts" setup>
import type { TimelineItem } from '../types/timeline'

const props = defineProps<TimelineItem>()
</script>

<template>
  <div>
    <div class="flex items-center gap-4">
      <div :class="props.icon" class="size-5 opacity-60" />
      <div class="w-full h-1px bg-gray-900/20 rounded-full" />
    </div>

    <div class="mt-4 pr-8">
      <div class="mt-4 text-sm opacity-60">
        {{ props.date }}
      </div>

      <div class="font-bold text-lg">
        {{ props.title }}
      </div>

      <div v-click class="mt-2 flex gap-1">
        <div v-for="item in props.stack" :key="item.name" :title="item.name" class="inline-block mr-2">
          <div v-if="item.icon" :class="item.icon" class="size-6" />
          <img v-else-if="item.src" :src="item.src" class="size-6 rounded-sm">
        </div>
      </div>
    </div>
  </div>
</template>
