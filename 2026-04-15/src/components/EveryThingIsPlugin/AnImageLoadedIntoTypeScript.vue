<script lang="ts" setup>
import type { Request } from '../../types/network-tab'
import imagePng from 'virtual:vite-transformed-file:image:ts'
import indexHtml from 'virtual:vite-transformed-file:index:html'
import mainTs from 'virtual:vite-transformed-file:main-image:ts'
import Inspect from '../Inspect/Inspect.vue'

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
    waterfallStart: 6,
    time: 26,
    response: mainTs,
  },
  {
    id: 3,
    name: 'image.jpg?import',
    url: '/src/assets/image.jpg?import',
    type: 'script',
    initiator: 'main.ts:1',
    waterfallStart: 32,
    time: 12,
    response: imagePng,
  },
]
</script>

<template>
  <Inspect :network="requests" />
</template>
