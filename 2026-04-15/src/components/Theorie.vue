<script lang="ts" setup>
import Pipeline from './Pipeline.vue'
</script>

<template>
  <Pipeline
    :plugins="[
      {
        name: 'Plugin A',
        resolvedId: {
          input: '/src/main.ts',
          output: 'const items = [1, 2, 3];',
        },
        load: {
          input: '',
          output: '',
        },
        transform: {
          input: '',
          output: '',
        },
      },
      {
        name: 'Plugin B',
        resolvedId: {
          input: '',
          output: '',
        },
        load: {
          input: '',
          output: '',
        },
        transform: {
          input: '',
          output: '',
        },
      },
    ]"
  />
</template>
