<script lang="ts" setup>
import indexHtml from 'virtual:vite-transformed-file:index:html'
import mainTs from 'virtual:vite-transformed-file:main-css:ts'
import styleCss from 'virtual:vite-transformed-file:style-css:ts'
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
    name: 'main.ts',
    type: 'script',
    initiator: '(index):13',
    time: 26,
    response: mainTs,
  },
  {
    id: 3,
    name: 'style.css',
    type: 'stylesheet',
    initiator: 'main.ts:1',
    time: 4,
    response: styleCss,
  },
]
</script>

<template>
  <Inspect :network="requests" />
</template>
