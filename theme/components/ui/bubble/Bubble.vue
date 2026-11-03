<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

withDefaults(defineProps<PrimitiveProps & { align?: 'start' | 'end', variant?: 'default' | 'muted' }>(), {
  as: 'div',
  align: 'start',
  variant: 'default',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-slot="bubble" class="ui-bubble" :data-align="align" :data-variant="variant">
    <slot />
  </Primitive>
</template>

<style scoped>
.ui-bubble { display: flex; min-width: 0; max-width: 100%; flex-direction: column; border-radius: var(--ui-radius-lg); }
.ui-bubble[data-variant='muted'] { background: var(--ui-muted); }
.ui-bubble[data-variant='default'] { background: var(--ui-primary); color: var(--ui-primary-foreground); }
</style>
