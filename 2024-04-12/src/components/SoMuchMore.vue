<script lang="ts" setup>
import { Inalia } from 'slidev-addon-inalia/components'
import MostLoved from './MostLoved.vue'
</script>

<template>
  <Inalia
    v-slot="{ question, answers }"
    question="Votre paquet préféré ?"
    type="single_select"
    chart="donut"
    :answers="[
      {
        label: 'changelogen',
        value: 0,
        color: '#000000',
      },
      {
        label: 'magic-regexp',
        value: 0,
        color: '#000000',
      },
      {
        label: 'h3',
        value: 1,
        color: '#000000',
      },
      {
        label: 'unbuild',
        value: 0,
        color: '#000000',
      },
      {
        label: 'nitro',
        value: 5,
        color: '#000000',
      },
      {
        label: 'bundle-runner',
        value: 2,
        color: '#000000',
      },
      {
        label: 'c12',
        value: 0,
        color: '#000000',
      },
      {
        label: 'citty',
        value: 0,
        color: '#000000',
      },
      {
        label: 'consola',
        value: 0,
        color: '#000000',
      },
      {
        label: 'cookie-es',
        value: 0,
        color: '#000000',
      },
      {
        label: 'defu',
        value: 2,
        color: '#000000',
      },
      {
        label: 'destr',
        value: 0,
        color: '#000000',
      },
      {
        label: 'fontaine',
        value: 0,
        color: '#000000',
      },
      {
        label: 'fs-memo',
        value: 0,
        color: '#000000',
      },
      {
        label: 'get-port-please',
        value: 0,
        color: '#000000',
      },
      {
        label: 'giget',
        value: 0,
        color: '#000000',
      },
      {
        label: 'hookable',
        value: 0,
        color: '#000000',
      },
      {
        label: 'httpxy',
        value: 0,
        color: '#000000',
      },
      {
        label: 'image-meta',
        value: 0,
        color: '#000000',
      },
      {
        label: 'ipx',
        value: 1,
        color: '#000000',
      },
      {
        label: 'jimp-compact',
        value: 0,
        color: '#000000',
      },
      {
        label: 'jiti',
        value: 0,
        color: '#000000',
      },
      {
        label: 'knitwork',
        value: 0,
        color: '#000000',
      },
      {
        label: 'listhen',
        value: 0,
        color: '#000000',
      },
      {
        label: 'magicast',
        value: 1,
        color: '#000000',
      },
      {
        label: 'mkdist',
        value: 0,
        color: '#000000',
      },
      {
        label: 'nanotar',
        value: 0,
        color: '#000000',
      },
      {
        label: 'node-fetch-native',
        value: 0,
        color: '#000000',
      },
      {
        label: 'nypm',
        value: 0,
        color: '#000000',
      },
      {
        label: 'ofetch',
        value: 1,
        color: '#000000',
      },
      {
        label: 'ohash',
        value: 0,
        color: '#000000',
      },
      {
        label: 'pathe',
        value: 0,
        color: '#000000',
      },
      {
        label: 'perfect-debounce',
        value: 0,
        color: '#000000',
      },
      {
        label: 'pkg-types',
        value: 0,
        color: '#000000',
      },
      {
        label: 'radix3',
        value: 0,
        color: '#000000',
      },
      {
        label: 'rc9',
        value: 0,
        color: '#000000',
      },
      {
        label: 'scule',
        value: 0,
        color: '#000000',
      },
      {
        label: 'theme-colors',
        value: 0,
        color: '#000000',
      },
      {
        label: 'ufo',
        value: 0,
        color: '#000000',
      },
      {
        label: 'uncrypto',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unctx',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unenv',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unhead',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unimport',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unpdf',
        value: 0,
        color: '#000000',
      },
      {
        label: 'unplugin',
        value: 1,
        color: '#000000',
      },
      {
        label: 'unstorage',
        value: 0,
        color: '#000000',
      },
      {
        label: 'untun',
        value: 0,
        color: '#000000',
      },
      {
        label: 'untyped',
        value: 0,
        color: '#000000',
      },
      {
        label: 'uqr',
        value: 0,
        color: '#000000',
      },
      {
        label: 'webpackbar',
        value: 0,
        color: '#000000',
      },
      {
        label: 'automd',
        value: 0,
        color: '#000000',
      },
      {
        label: 'confbox',
        value: 0,
        color: '#000000',
      },
      {
        label: 'crossws',
        value: 0,
        color: '#000000',
      },
      {
        label: 'db0',
        value: 0,
        color: '#000000',
      },
      {
        label: 'mdbox',
        value: 0,
        color: '#000000',
      },
      {
        label: 'undocs',
        value: 0,
        color: '#000000',
      },
    ]"
  >
    <MostLoved :question="question" :answers="answers" />
  </Inalia>
</template>
