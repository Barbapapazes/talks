<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="h-full grid place-items-center slidev-layout center">
    <BackgroundImage :img="$frontmatter.img" :img-class="$frontmatter.imgClass" class="-z-1" />

    <div class="relative w-full h-full grid place-items-center">
      <slot />
    </div>
  </div>
</template>
