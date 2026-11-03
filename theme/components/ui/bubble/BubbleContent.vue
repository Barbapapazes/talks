<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-slot="bubble-content" class="ui-bubble-content">
    <slot />
  </Primitive>
</template>

<style scoped>
.ui-bubble-content { min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
</style>
