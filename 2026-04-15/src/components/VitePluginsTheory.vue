<script lang="ts" setup>
import Pipeline from './Pipeline/Pipeline.vue'
import AppVue from 'virtual:vite-file-system:App:vue'
import AppVueTransformed from 'virtual:vite-transformed-file:App:ts'

const plugins = [
  {
    name: 'VuePlugin',
    color: '#42b883',
    resolveId: {
      input: '/src/App.vue',
      output: '/src/App.vue',
    },
    load: {
      input: '/src/App.vue',
      output: AppVue,
    },
    transform: {
      input: AppVue,
      output: AppVueTransformed,
    },
  },
  {
    name: 'CustomPlugin',
    color: 'var(--slidev-theme-primary)',
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
