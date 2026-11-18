<script setup lang="ts">
import Card from '@theme/components/Card.vue'

const locations = [
  'Embeddings',
  'Attention projections',
  'MLP layers',
  'Output projection',
]
</script>

<template>
  <div class="absolute inset-x-14 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-5">
    <Card v-for="location in locations" :key="location">
      <div class="text-center text-2xl font-semibold">
        {{ location }}
      </div>
    </Card>
  </div>
</template>
