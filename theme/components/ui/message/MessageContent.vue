<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-slot="message-content" class="ui-message-content">
    <slot />
  </Primitive>
</template>

<style scoped>
.ui-message-content { display: flex; width: 100%; min-width: 0; flex-direction: column; overflow-wrap: anywhere; }
</style>
