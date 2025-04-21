<script setup lang="ts">
import Card from '../components/Card.vue'
</script>

<template>
  <div class="slidev-layout relative grid mx-auto grid items-center justify-center bottom-left-card">
    <img :src="$frontmatter.img" alt="Presentation Image" class="absolute top-0 w-full h-full object-cover left--0" :class="$frontmatter.imgClass">
    <Card class="relative">
      <slot />
    </Card>
  </div>
</template>
