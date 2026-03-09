<script lang="ts" setup>
import indexHtml from 'virtual:vite-transformed-file:index:html'
import mainTs from 'virtual:vite-transformed-file:main-glob:ts'
import Inspect from '../Inspect.vue'

const requests: Request[] = [
  {
    id: 1,
    name: 'localhost',
    type: 'document',
    time: 6,
    response: indexHtml,
  },
  {
    id: 2,
    name: 'main.ts',
    type: 'script',
    initiator: '(index):13',
    time: 26,
    response: mainTs,
  },
]
</script>

<template>
  <Inspect :network="requests" />
</template>
