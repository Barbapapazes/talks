<script setup lang="ts">
import ProgressiveList from '@theme/components/ProgressiveList.vue'

const items = [
  'Tools <span class="text-neutral-500">(core)</span>',
  'Resources <span class="text-neutral-500">(core)</span>',
  'Prompts <span class="text-neutral-500">(core)</span>',
  'Completions <span class="text-neutral-500">(core)</span>',
  'MCP Apps <span class="text-neutral-500">(extension)</span>',
  'Tasks <span class="text-neutral-500">(extension)</span>',
  'Skills over MCP <span class="text-neutral-500">(extension)</span>',
]
</script>

<template>
  <ProgressiveList :items="items" />
</template>
