<script lang="ts" setup>
import type { Request } from '../types/network-tab'
import { transformerRemoveComments } from '@shikijs/transformers'
import { codeToHtml } from 'shiki'

const requests: Request[] = [
  {
    id: 1,
    name: 'localhost',
    type: 'document',
    time: 6,
    response: await codeToHtml(`<!-- /* @slidev-injection */ -->
<!doctype html>
<html lang="en">
  <head>
    <script type="module" src="/@vite/client" />
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Du CSS importé dans un fichier TypeScript</title>
  </head>
  <body>
    <div id="app" />
    <script type="module" src="/src/main.ts?t=1772791142408" />
  </body>
</html>`, {
      lang: 'html',
      theme: 'github-dark',
      colorReplacements: {
        '#24292e': 'transparent',
      },
      includeExplanation: true,
      transformers: [
        transformerRemoveComments(),
      ],
    }),
  },
  {
    id: 2,
    name: 'main.ts',
    type: 'script',
    initiator: '(index):13',
    time: 26,
    response: await codeToHtml(`import "/src/style.css";`, {
      lang: 'ts',
      theme: 'github-dark',
      colorReplacements: {
        '#24292e': 'transparent',
      },
    }),
  },
  {
    id: 3,
    name: 'style.css',
    type: 'stylesheet',
    initiator: 'main.ts:1',
    time: 4,
    response: await codeToHtml(`import {createHotContext as __vite__createHotContext} from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/style.css");
import {updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle} from "/@vite/client"
const __vite__id = "/home/esteban/dev/tmp/vite-hmr/src/style.css"
const __vite__css = ":root {  --primary-color: #3498db;  --secondary-color: #2ecc71;  --background-color: #f5f5f5;  --text-color: #333333;}"
__vite__updateStyle(__vite__id, __vite__css)
import.meta.hot.accept()
import.meta.hot.prune( () => __vite__removeStyle(__vite__id))`, {
      lang: 'ts',
      theme: 'github-dark',
      colorReplacements: {
        '#24292e': 'transparent',
      },
    }),
  },
]
</script>

<template>
  <NetworkTab
    :requests="requests"
  />
</template>
