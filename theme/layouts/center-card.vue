<script setup lang="ts">
import Card from '../components/Card.vue'
</script>

<template>
  <div class="slidev-layout bottom-left-card relative grid mx-auto grid items-center justify-center">
    <img :src="$frontmatter.img" alt="Presentation Image" class="absolute left--0 top-0 w-full h-full object-cover">
    <Card class="relative">
      <slot />
    </Card>
  </div>
</template>
