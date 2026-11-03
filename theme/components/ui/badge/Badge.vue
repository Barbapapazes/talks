<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'outline'
}>(), {
  variant: 'default',
})
</script>

<template>
  <span class="ui-badge" :data-variant="variant">
    <slot />
  </span>
</template>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border: 1px solid transparent;
  border-radius: var(--ui-radius);
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
}
.ui-badge[data-variant='default'] { background: var(--ui-primary); color: var(--ui-primary-foreground); }
.ui-badge[data-variant='secondary'] { background: var(--ui-muted); color: var(--ui-muted-foreground); }
.ui-badge[data-variant='outline'] { border-color: var(--ui-border); background: var(--ui-elevated); color: var(--ui-muted-foreground); }
</style>
