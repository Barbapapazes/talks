<script setup lang="ts">
import CardLayout from '../components/CardLayout.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <CardLayout position="center-right" :img="$frontmatter.img" :img-class="$frontmatter.imgClass" :position-class="$frontmatter.positionClass">
    <slot />

    <template #outside>
      <slot name="outside" />
    </template>
  </CardLayout>
</template>
