<script lang="ts" setup>
import imagePng from 'virtual:vite-transformed-file:image:ts'
import indexHtml from 'virtual:vite-transformed-file:index:html'
import inlineImagePng from 'virtual:vite-transformed-file:inline-image:ts'
import mainTs from 'virtual:vite-transformed-file:main-image:ts'
import RawImagePng from 'virtual:vite-transformed-file:raw-image:ts'
import tinyImagePng from 'virtual:vite-transformed-file:tiny-image:ts'
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
    time: 26,
    response: mainTs,
  },
  {
    id: 3,
    name: 'image.jpg?import',
    type: 'script',
    initiator: 'main.ts:1',
    time: 26,
    response: imagePng,
  },
  {
    id: 4,
    name: 'tiny-image.jpg?import',
    type: 'script',
    initiator: 'main.ts:3',
    time: 12,
    response: tinyImagePng,
  },
  {
    id: 5,
    name: 'image.jpg?import&inline',
    type: 'script',
    initiator: 'main.ts:5',
    time: 20,
    response: inlineImagePng,
  },
  {
    id: 6,
    name: 'image.jpg?import&raw',
    type: 'script',
    initiator: 'main.ts:7',
    time: 87,
    response: RawImagePng,
  },
]
</script>

<template>
  <Inspect :network="requests" />
</template>
