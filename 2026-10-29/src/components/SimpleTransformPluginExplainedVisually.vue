<script lang="ts" setup>
import type {
  ExplainedVisuallyFileSystemItem,
  ExplainedVisuallyHttpLog,
} from './ExplainedVisually/types'
import indexHtml from 'virtual:vite-file-system:index:html'
import mainTs from 'virtual:vite-file-system:main-build-time:ts'
import indexHtmlTransformed from 'virtual:vite-transformed-file:index:html'
import mainTsTransformed from 'virtual:vite-transformed-file:main-build-time:ts'
import { useHighlight } from '../composables/useHighlight'
import ExplainedVisually from './ExplainedVisually.vue'
import ViteHookPills from './ViteHookPills.vue'

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
    request: highlight('GET http://localhost:5173/src/main.ts?t=1773357600000', 'http'),
    response: {
      file: 'main.ts',
      code: mainTsTransformed,
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
  >
    <template #server>
      <ViteHookPills
        class="absolute -bottom-7 left-1/2 -translate-x-1/2"
        :hooks="['transform']"
      />
    </template>
  </ExplainedVisually>
</template>
