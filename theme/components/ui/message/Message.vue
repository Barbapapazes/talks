<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

withDefaults(defineProps<PrimitiveProps & { align?: 'start' | 'end' }>(), {
  as: 'div',
  align: 'start',
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" data-slot="message" class="ui-message" :data-align="align">
    <slot />
  </Primitive>
</template>

<style scoped>
.ui-message { position: relative; display: flex; width: 100%; min-width: 0; }
.ui-message[data-align='end'] { flex-direction: row-reverse; }
</style>
