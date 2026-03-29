<script lang="ts" setup>
import indexHtml from 'virtual:vite-transformed-file:index-jsx:html'
import mainTs from 'virtual:vite-transformed-file:main:jsx'
import itemTs from 'virtual:vite-transformed-file:item:jsx'
import Inspect from '../Inspect/Inspect.vue'
import type { Request } from '../../types/network-tab'

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
    name: 'main.jsx',
    type: 'script',
    initiator: '(index):13',
    waterfallStart: 6,
    time: 26,
    response: mainTs,
  },
  {
    id: 3,
    name: 'item.jsx',
    type: 'script',
    initiator: 'main.jsx:1',
    waterfallStart: 32,
    time: 4,
    response: itemTs,
  },
]
</script>

<template>
  <Inspect :network="requests" />
</template>
