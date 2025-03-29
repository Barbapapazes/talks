<script setup lang="ts">
import Card from '../components/Card.vue'
</script>

<template>
  <div class="slidev-layout bottom-left-card relative grid mx-auto grid justify-center items-start">
    <img :src="$frontmatter.img" alt="Presentation Image" class="absolute left--0 top-0 w-full h-full object-cover" :class="$frontmatter.imgClass">
    <Card class="relative">
      <slot />
    </Card>
  </div>
</template>
