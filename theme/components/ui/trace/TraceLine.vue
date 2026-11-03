<script setup lang="ts">
defineProps<{ status?: 'running' | 'error' | 'pending' }>()
</script>

<template>
  <span data-slot="trace-line" :data-status="status" class="ui-trace-line">
    <slot />
  </span>
</template>

<style scoped>
.ui-trace-line { display: flex; align-items: center; gap: 8px; max-width: 100%; min-width: 0; color: var(--ui-muted-foreground); }
.ui-trace-line[data-status='error'] { color: #dc2626; }
.ui-trace-line[data-status='pending'] { opacity: 0.6; }
</style>
