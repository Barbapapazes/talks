<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="text-sm text-neutral-500 font-light flex flex-row items-center gap-1">
    <div class="i-ph-arrow-left-thin size-4" />
    {{ props.text }}
    <div class="i-ph-arrow-right-thin size-4" />
  </div>
</template>
