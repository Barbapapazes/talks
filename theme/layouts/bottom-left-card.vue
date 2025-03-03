<script setup lang="ts">
import Card from '../components/Card.vue'
</script>

<template>
  <div class="slidev-layout bottom-left-card relative">
    <img :src="$frontmatter.img" alt="Presentation Image" class="absolute left--0 top-0 w-full h-full object-cover">
    <div class="absolute left-14 bottom-10">
      <Card>
        <slot />
      </Card>
    </div>
  </div>
</template>
