<script lang="ts" setup>
const props = defineProps<{
  items: (string | { name: string, active: boolean })[]
}>()
</script>

<template>
  <div class="flex flex-row gap-2 text-xs px-4 bg-neutral-800 font-medium">
    <div
      v-for="item in props.items"
      :key="typeof item === 'string' ? item : item.name"
      class="px-2 py-2"
      :class="{ 'text-blue-500 border-b-2 border-blue-500': typeof item === 'string' ? false : item.active }"
    >
      {{ typeof item === 'string' ? item : item.name }}
    </div>
  </div>
</template>
