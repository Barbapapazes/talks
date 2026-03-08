<script lang="ts" setup>
import appVue from 'virtual:vite-file-system:App:vue'
import indexHtml from 'virtual:vite-file-system:index:html'
import mainTs from 'virtual:vite-file-system:main:ts'
import packageJson from 'virtual:vite-file-system:package:json'
import styleCss from 'virtual:vite-file-system:style:css'
import tsconfigAppJson from 'virtual:vite-file-system:tsconfig:app:json'
import tsconfigJson from 'virtual:vite-file-system:tsconfig:json'
import tsconfigNodeJson from 'virtual:vite-file-system:tsconfig:node:json'
import viteConfigTs from 'virtual:vite-file-system:vite.config:ts'
import { ref } from 'vue'
import ViteExplainedVisuallyBrowser from './ViteExplainedVisually/ViteExplainedVisuallyBrowser.vue'
import ViteExplainedVisuallyEdge from './ViteExplainedVisually/ViteExplainedVisuallyEdge.vue'
import ViteExplainedVisuallyFileModal from './ViteExplainedVisually/ViteExplainedVisuallyFileModal.vue'
import ViteExplainedVisuallyFileSystem from './ViteExplainedVisually/ViteExplainedVisuallyFileSystem.vue'
import ViteExplainedVisuallyHttpLogs from './ViteExplainedVisually/ViteExplainedVisuallyHttpLogs.vue'
import ViteExplainedVisuallyHttpResponseModal from './ViteExplainedVisually/ViteExplainedVisuallyHttpResponseModal.vue'
import ViteExplainedVisuallyViteServer from './ViteExplainedVisually/ViteExplainedVisuallyViteServer.vue'

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
      {
        title: 'style.css',
        icon: 'i-vscode-icons-file-type-css',
        code: styleCss,
      },
      {
        title: 'App.vue',
        icon: 'i-vscode-icons-file-type-vue',
        code: appVue,
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
]

function foundFileByTitle(title: string) {
  return fileSystem
    .flatMap(item => item.children || item)
    .find(item => item.title === title) || null
}

const file = ref<{ file: string, code: string } | null>(null)
function onFileClick(_file: string) {
  const foundFile = foundFileByTitle(_file)

  if (foundFile) {
    file.value = { file: foundFile.title, code: foundFile.code }
  }
  else {
    file.value = null
  }
}

const httpResponse = ref<{
  request: string
  response: { file: string | undefined, code: string }
  file: string | undefined
} | null>(null)
function onHttpResponse(request: string, file: string | undefined, response: string) {
  const foundFile = foundFileByTitle(file || '')

  httpResponse.value = {
    request,
    response: { file, code: response },
    file: foundFile ? foundFile.code : undefined,
  }
}
</script>

<template>
  <div class="absolute left-10 right-10 top-14 flex fex-row items-center justify-between">
    <ViteExplainedVisuallyBrowser
      v-click="[1, 13]"
    >
      <span v-click="7">
        localhost:5173
      </span>
    </ViteExplainedVisuallyBrowser>

    <ViteExplainedVisuallyEdge
      v-click="[4, 13]"
      text="HTTP Requests"
    />

    <ViteExplainedVisuallyViteServer
      v-click="3"
      class="relative"
    >
      <span
        v-click="[6, 13]"
        class="absolute left-1/2 -translate-x-1/2 bottom-1 flex flex-row gap-1 text-cyan-700 text-xs"
      >
        <span
          class="i-ph-spinner animate-spin animate-duration-[3s] size-4"
        />
        <span>
          http://localhost:5173/
        </span>
      </span>
    </ViteExplainedVisuallyViteServer>

    <ViteExplainedVisuallyEdge
      v-click="[5, 13]"
      text="Read Files"
    />

    <ViteExplainedVisuallyFileSystem
      v-click="[2, 13]"
      :items="fileSystem"
      @file-click="onFileClick"
    />
  </div>

  <ViteExplainedVisuallyHttpLogs
    v-click="[7, 13]"
    :initial-click="8"
    class="absolute left-10 -bottom-2 right-3/10 pb-10"
    @http-response="onHttpResponse"
  />

  <ViteExplainedVisuallyFileModal
    v-model="file"
  />

  <ViteExplainedVisuallyHttpResponseModal
    v-model="httpResponse"
  />
</template>
