<script lang="ts" setup>
import Pipeline from './Pipeline/Pipeline.vue'
import AppVue from 'virtual:vite-file-system:App:vue'
import AppVueTransformed from 'virtual:vite-transformed-file:App:ts'

const plugins = [
  {
    name: 'Plugin A',
    resolveId: {
      input: './App.vue',
      output: './App.vue',
    },
    load: {
      input: './App.vue',
      output: AppVue,
    },
    transform: {
      input: AppVue,
      output: AppVueTransformed,
    },
  },
  {
    name: 'Plugin B',
    resolveId: {
      input: 'skipped',
      output: '',
    },
    load: {
      input: 'skipped',
      output: '',
    },
    transform: {
      input: AppVueTransformed,
      output: AppVueTransformed,
    },
  },
]
</script>

<template>
  <Pipeline
    :plugins="plugins"
  />
</template>
