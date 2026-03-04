<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="bottom-left" :img="$frontmatter.img" :img-class="$frontmatter.imgClass">
    <slot />
    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
