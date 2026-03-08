<script lang="ts" setup>
import Pipeline from './Pipeline.vue'

const plugins = [
  {
    name: 'Plugin A',
    resolveId: {
      input: { code: './App.vue', language: 'plain' },
      output: { code: './App.vue', language: 'plain' },
    },
    load: {
      input: {
        code: './App.vue',
        language: 'plain',
      },
      output: {
        code: `<!-- /* @slidev-injection */ -->
<script lang="ts" setup>
import { ref } from 'vue';

const world = ref<string>('World')
<\/script>

<template>
  <div>
    Hello {{ world }}!
  </div>
</template>`,
        language: 'vue',
      },
    },
    transform: {
      input: './src/main.css',
      output: ``,
    },
  },
  {
    name: 'Plugin B',
    resolveId: {
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
]
</script>

<template>
  <Pipeline
    :plugins="plugins"
  />
</template>
