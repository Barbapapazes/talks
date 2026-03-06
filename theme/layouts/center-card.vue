<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import CardLayout from '../components/CardLayout.vue'

const { $frontmatter } = useSlideContext()
</script>

<template>
  <CardLayout position="center" :img="$frontmatter.img" :img-class="$frontmatter.imgClass">
    <slot />

    <!-- TODO: add in every layout -->
    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
