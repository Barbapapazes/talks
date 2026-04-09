<script setup lang="ts">
import BackgroundImage from '../components/BackgroundImage.vue'
import ThemeRoot from '../components/ThemeRoot.vue'
</script>

<template>
  <ThemeRoot class="relative slidev-layout">
    <BackgroundImage :img="$frontmatter.img" :img-class="$frontmatter.imgClass" class="-z-1" />
    <slot />
  </ThemeRoot>
</template>
