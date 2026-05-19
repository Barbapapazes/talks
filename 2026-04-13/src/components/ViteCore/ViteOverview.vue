<script lang="ts" setup>
const items = [
  '<span class="text-primary">Web Server</span>',
  'Based on <span class="text-primary">ECMAScript Modules</span>',
  'Transform Files <span class="text-primary">On-Demand</span>',
  'Extensible using <span class="text-primary">Plugins</span>',
]
</script>

<template>
  <ProgressiveList
    :items="items"
  />
</template>
