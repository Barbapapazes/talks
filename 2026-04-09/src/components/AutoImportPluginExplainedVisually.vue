<script lang="ts" setup>
import type {
  ExplainedVisuallyFileSystemItem,
  ExplainedVisuallyHttpLog,
} from './ExplainedVisually/types'
import indexHtml from 'virtual:vite-file-system:index:html'
import mainTs from 'virtual:vite-file-system:mainAutoImport:ts'
import packageJson from 'virtual:vite-file-system:package:json'
import tsconfigAppJson from 'virtual:vite-file-system:tsconfig:app:json'
import tsconfigJson from 'virtual:vite-file-system:tsconfig:json'
import tsconfigNodeJson from 'virtual:vite-file-system:tsconfig:node:json'
import viteConfigTs from 'virtual:vite-file-system:vite.config:ts'
import indexHtmlTransformed from 'virtual:vite-transformed-file:index:html'
import mainTsTransformed from 'virtual:vite-transformed-file:mainAutoImport:ts'
import { useHighlight } from '../composables/useHighlight'
import ExplainedVisually from './ExplainedVisually.vue'

const { highlight } = useHighlight()

const fileSystem = [
  {
    title: 'src',
    icon: 'i-vscode-icons-folder-type-src',
    iconOpened: 'i-vscode-icons-folder-type-src-opened',
    children: [
      {
        title: 'main.ts',
        icon: 'i-vscode-icons-file-type-typescript',
        code: mainTs,
      },
    ],
  },
  {
    title: 'index.html',
    icon: 'i-vscode-icons-file-type-html',
    code: indexHtml,
  },
  {
    title: 'vite.config.ts',
    icon: 'i-vscode-icons-file-type-vite',
    code: viteConfigTs,
  },
  {
    title: 'package.json',
    icon: 'i-vscode-icons-file-type-npm',
    code: packageJson,
  },
  {
    title: 'tsconfig.json',
    icon: 'i-vscode-icons-file-type-tsconfig',
    code: tsconfigJson,
  },
  {
    title: 'tsconfig.app.json',
    icon: 'i-vscode-icons-file-type-tsconfig',
    code: tsconfigAppJson,
  },
  {
    title: 'tsconfig.node.json',
    icon: 'i-vscode-icons-file-type-tsconfig',
    code: tsconfigNodeJson,
  },
] satisfies ExplainedVisuallyFileSystemItem[]

const httpLogs = [
  {
    request: highlight('GET http://localhost:5173/', 'http'),
    response: {
      file: 'index.html',
      code: indexHtmlTransformed,
    },
  },
  {
    request: highlight('GET http://localhost:5173/src/main.ts?t=1772882882631', 'http'),
    response: {
      file: 'main.ts',
      code: mainTsTransformed,
    },
  },
  {
    request: highlight('GET http://localhost:5173/node_modules/.vite/deps/vue.js?v=ed2c93c8', 'http'),
    response: {
      code: highlight('/* vue.js content */', 'ts'),
    },
  },
] satisfies ExplainedVisuallyHttpLog[]
</script>

<template>
  <ExplainedVisually
    :browser-address-click="1"
    :browser-click="1"
    browser-address="localhost:5173"
    :file-explorer-click="1"
    :file-explorer-default-expanded="['src']"
    :file-system-items="fileSystem"
    :http-logs="httpLogs"
    :http-logs-click="2"
    :read-files-edge-click="1"
    :request-edge-click="1"
    :server-click="1"
  />
</template>
