<script setup lang="ts">
import Card from '../components/Card.vue'
</script>

<template>
  <div class="relative slidev-layout bottom-left-card">
    <img :src="$frontmatter.img" alt="Presentation Image" class="absolute top-0 w-full h-full object-cover left--0">
    <div class="absolute left-14 bottom-10" :class="$frontmatter.positionClass">
      <Card :class="$frontmatter.cardClass">
        <slot />
      </Card>
    </div>

    <slot name="outside" />
  </div>
</template>
