<script lang="ts" setup>
defineProps<{
  logo?: string
  img?: string
  name: string
}>()
</script>

<template>
  <InlineCard class="flex items-center gap-2">
    <span v-if="logo" class="inline-block size-4" :class="logo" />
    <img v-else-if="img" :src="img" class="size-4">
    <span>{{ name }}</span>
  </InlineCard>
</template>
