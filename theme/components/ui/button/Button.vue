<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

withDefaults(defineProps<PrimitiveProps & {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'icon'
}>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :type="as === 'button' && !asChild ? 'button' : undefined"
    class="ui-button"
    :data-variant="variant"
    :data-size="size"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--ui-radius);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background-color 150ms, color 150ms;
}
.ui-button:focus-visible {
  outline: 2px solid var(--ui-ring);
  outline-offset: 2px;
}
.ui-button:disabled {
  pointer-events: none;
  opacity: 0.5;
}
.ui-button[data-size='default'] { height: 36px; padding: 0 16px; }
.ui-button[data-size='sm'] { height: 32px; padding: 0 12px; font-size: 12px; }
.ui-button[data-size='icon'] { width: 36px; height: 36px; padding: 0; }
.ui-button[data-variant='default'] {
  background: var(--ui-primary);
  color: var(--ui-primary-foreground);
  box-shadow: var(--ui-shadow);
}
.ui-button[data-variant='default']:hover { background: var(--ui-primary-hover); }
.ui-button[data-variant='secondary'] { background: var(--ui-muted); color: var(--ui-highlighted); }
.ui-button[data-variant='outline'] { border-color: var(--ui-border); background: var(--ui-background); color: var(--ui-foreground); }
.ui-button[data-variant='ghost'] { background: transparent; color: var(--ui-muted-foreground); }
.ui-button:is([data-variant='secondary'], [data-variant='outline'], [data-variant='ghost']):hover {
  background: var(--ui-accent);
  color: var(--ui-foreground);
}
@media (prefers-reduced-motion: reduce) {
  .ui-button { transition: none; }
}
</style>
