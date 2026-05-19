<script lang="ts" setup>
const props = defineProps<{
  description: string
}>()
</script>

<template>
  <div class="text-xs">
    {{ props.description }}
  </div>
</template>

<style scoped>
html[data-theme='default'],
html[data-theme='flowers'] {
  .description {
    --at-apply: text-neutral-500;
  }
}

html[data-theme='brutalism'] {
  .description {
    --at-apply: text-[var(--theme-brutalism-text-muted)];
  }
}
</style>
