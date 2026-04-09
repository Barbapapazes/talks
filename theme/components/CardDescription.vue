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
html[data-theme='default'] {
  .description {
    --at-apply: text-neutral-500;
  }
}

html[data-theme='brutaliste'] {
  .description {
    --at-apply: text-[var(--theme-brutaliste-text-muted)];
  }
}

html[data-theme='futuristic'] {
  .description {
    --at-apply: text-[var(--theme-futuristic-text-muted)];
  }
}
</style>
