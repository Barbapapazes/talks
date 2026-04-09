<script lang="ts" setup>
const filters = [
  'Fetch/XHR',
  'Doc',
  'CSS',
  'JS',
  'Font',
  'Img',
  'Media',
  'Manifest',
  'Socket',
  'Wasm',
  'Other',
]
</script>

<template>
  <div class="flex flex-row gap-2 text-neutral-500 text-xs p-4">
    <div
      class="px-2 py-1 rounded-lg border border-neutral-700 bg-neutral-700 text-white"
    >
      All
    </div>
    <hr class="my-px w-px h-auto bg-neutral-700 border-0">
    <div
      v-for="filter in filters"
      :key="filter"
      class="px-2 py-1 rounded-lg border border-neutral-700"
    >
      {{ filter }}
    </div>
  </div>
</template>
