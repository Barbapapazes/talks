<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <CardLayout position="top-right">
    <slot />

    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
