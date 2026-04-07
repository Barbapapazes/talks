<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="bottom-center">
    <slot />

    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
