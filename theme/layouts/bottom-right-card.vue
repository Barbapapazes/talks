<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="bottom-right" :img="$frontmatter.img" :img-class="$frontmatter.imgClass">
    <slot />
  </CardLayout>
</template>
