<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="top-center" :img="$frontmatter.img" :img-class="$frontmatter.imgClass">
    <slot />
  </CardLayout>
</template>
