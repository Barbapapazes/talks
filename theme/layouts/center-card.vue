<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="center">
    <slot />

    <!-- TODO: add in every layout -->
    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
