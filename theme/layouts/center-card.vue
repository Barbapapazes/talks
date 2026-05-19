<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'
</script>

<template>
  <CardLayout position="center" :img="$frontmatter.img" :img-class="$frontmatter.imgClass" :position-class="$frontmatter.positionClass">
    <slot />
  </CardLayout>
</template>
