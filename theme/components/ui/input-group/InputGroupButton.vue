<script setup lang="ts">
import Button from '../button/Button.vue'

withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'icon'
}>(), {
  variant: 'ghost',
  size: 'sm',
})
</script>

<template>
  <Button data-slot="input-group-button" :variant="variant" :size="size">
    <slot />
  </Button>
</template>
