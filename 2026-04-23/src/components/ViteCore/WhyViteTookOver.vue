<script lang="ts" setup>
import ProgressiveList from '@theme/components/ProgressiveList.vue';

const items = [
   '<span class="text-primary">Native ESM</span> instead of bundling-first',
   'Dev server <span class="text-primary">performance</span>',
   '<span class="text-primary">On-demand</span> transformation',
   '<span class="text-primary">Simpler</span> configuration',
   'Ecosystem <span class="text-primary">alignment</span>'
]
</script>

<template>
  <ProgressiveList
    :items="items"
  />
</template>
