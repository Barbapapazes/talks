<script lang="ts" setup>
import type { SelectData } from 'slidev-addon-inalia'
import { Inalia } from 'slidev-addon-inalia'
import MostLoved from './MostLoved.vue'
</script>

<template>
  <Inalia
    v-slot="{ question, data }"
    question="Votre paquet préféré ?"
    type="single_select"
    chart="donut"
    :data="[
      {
        label: 'changelogen',
        count: 2,
        color: '#000000',
      },
      {
        label: 'magic-regexp',
        count: 5,
        color: '#000000',
      },
      {
        label: 'h3',
        count: 2,
        color: '#000000',
      },
      {
        label: 'unbuild',
        count: 1,
        color: '#000000',
      },
      {
        label: 'nitro',
        count: 2,
        color: '#000000',
      },
      {
        label: 'bundle-runner',
        count: 0,
        color: '#000000',
      },
      {
        label: 'c12',
        count: 0,
        color: '#000000',
      },
      {
        label: 'citty',
        count: 0,
        color: '#000000',
      },
      {
        label: 'consola',
        count: 0,
        color: '#000000',
      },
      {
        label: 'cookie-es',
        count: 0,
        color: '#000000',
      },
      {
        label: 'defu',
        count: 0,
        color: '#000000',
      },
      {
        label: 'destr',
        count: 0,
        color: '#000000',
      },
      {
        label: 'fontaine',
        count: 0,
        color: '#000000',
      },
      {
        label: 'fs-memo',
        count: 0,
        color: '#000000',
      },
      {
        label: 'get-port-please',
        count: 0,
        color: '#000000',
      },
      {
        label: 'giget',
        count: 0,
        color: '#000000',
      },
      {
        label: 'hookable',
        count: 0,
        color: '#000000',
      },
      {
        label: 'httpxy',
        count: 0,
        color: '#000000',
      },
      {
        label: 'image-meta',
        count: 0,
        color: '#000000',
      },
      {
        label: 'ipx',
        count: 0,
        color: '#000000',
      },
      {
        label: 'jimp-compact',
        count: 0,
        color: '#000000',
      },
      {
        label: 'jiti',
        count: 0,
        color: '#000000',
      },
      {
        label: 'knitwork',
        count: 0,
        color: '#000000',
      },
      {
        label: 'listhen',
        count: 0,
        color: '#000000',
      },
      {
        label: 'magicast',
        count: 0,
        color: '#000000',
      },
      {
        label: 'mkdist',
        count: 0,
        color: '#000000',
      },
      {
        label: 'nanotar',
        count: 0,
        color: '#000000',
      },
      {
        label: 'node-fetch-native',
        count: 0,
        color: '#000000',
      },
      {
        label: 'nypm',
        count: 0,
        color: '#000000',
      },
      {
        label: 'ofetch',
        count: 0,
        color: '#000000',
      },
      {
        label: 'ohash',
        count: 0,
        color: '#000000',
      },
      {
        label: 'pathe',
        count: 0,
        color: '#000000',
      },
      {
        label: 'perfect-debounce',
        count: 0,
        color: '#000000',
      },
      {
        label: 'pkg-types',
        count: 0,
        color: '#000000',
      },
      {
        label: 'radix3',
        count: 0,
        color: '#000000',
      },
      {
        label: 'rc9',
        count: 0,
        color: '#000000',
      },
      {
        label: 'scule',
        count: 0,
        color: '#000000',
      },
      {
        label: 'theme-colors',
        count: 0,
        color: '#000000',
      },
      {
        label: 'ufo',
        count: 0,
        color: '#000000',
      },
      {
        label: 'uncrypto',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unctx',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unenv',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unhead',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unimport',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unpdf',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unplugin',
        count: 0,
        color: '#000000',
      },
      {
        label: 'unstorage',
        count: 0,
        color: '#000000',
      },
      {
        label: 'untun',
        count: 0,
        color: '#000000',
      },
      {
        label: 'untyped',
        count: 0,
        color: '#000000',
      },
      {
        label: 'uqr',
        count: 0,
        color: '#000000',
      },
      {
        label: 'webpackbar',
        count: 0,
        color: '#000000',
      },
      {
        label: 'automd',
        count: 0,
        color: '#000000',
      },
      {
        label: 'confbox',
        count: 0,
        color: '#000000',
      },
      {
        label: 'crossws',
        count: 0,
        color: '#000000',
      },
      {
        label: 'db0',
        count: 0,
        color: '#000000',
      },
      {
        label: 'mdbox',
        count: 0,
        color: '#000000',
      },
      {
        label: 'undocs',
        count: 0,
        color: '#000000',
      },
    ]"
  >
    <MostLoved :question="question" :data="data as SelectData" />
  </Inalia>
</template>
