<script setup lang="ts">
import BackgroundImage from '../components/BackgroundImage.vue'
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="relative slidev-layout">
    <BackgroundImage :img="$frontmatter.img" :img-class="$frontmatter.imgClass" class="-z-1" />
    <slot />
  </div>
</template>
