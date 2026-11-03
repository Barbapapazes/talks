<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'default' | 'sm'
}>(), {
  size: 'default',
})
</script>

<template>
  <div data-slot="code-block" :data-size="size" class="ui-code-block">
    <slot />
  </div>
</template>

<style scoped>
.ui-code-block { min-width: 0; border: 1px solid var(--ui-border); border-radius: var(--ui-radius); background: var(--ui-muted); }
</style>
