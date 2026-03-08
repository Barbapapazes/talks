<script lang="ts" setup>
import appVue from 'virtual:vite-transformed-file:App:ts'
import indexHtml from 'virtual:vite-transformed-file:index:html'
import mainTs from 'virtual:vite-transformed-file:main:ts'
import styleCss from 'virtual:vite-transformed-file:style:ts'
import { useHighlight } from '../../composables/useHighlight'
import ViteExplainedVisuallyBox from './ViteExplainedVisuallyBox.vue'

const props = defineProps<{
  initialClick: number
}>()
const emits = defineEmits<{
  httpResponse: [string, string | undefined, string]
}>()

const { highlight } = useHighlight()

const getIndexHtml = highlight(`GET http://localhost:5173/`, 'http')
const returnIndexHtml = {
  file: 'index.html',
  code: indexHtml,
}
const getMainTs = highlight(`GET http://localhost:5173/src/main.ts?t=1772882882631`, 'http')
const returnMainTs = {
  file: 'main.ts',
  code: mainTs,
}
const getStyleCss = highlight(`GET http://localhost:5173/src/style.css?t=1772882882631`, 'http')
const returnStyleCss = {
  file: 'style.css',
  code: styleCss,
}
const getVue = highlight(`GET http://localhost:5173/node_modules/.vite/deps/vue.js?v=ed2c93c8`, 'http')
const returnVue = {
  file: undefined,
  code: highlight(`/* vue.js content */`, 'ts'),
}
const getAppVue = highlight(`GET http://localhost:5173/src/App.vue`, 'http')
const returnAppVue = {
  file: 'App.vue',
  code: appVue,
}

const logs = [
  {
    request: getIndexHtml,
    response: returnIndexHtml,
  },
  {
    request: getMainTs,
    response: returnMainTs,
  },
  {
    request: getStyleCss,
    response: returnStyleCss,
  },
  {
    request: getVue,
    response: returnVue,
  },
  {
    request: getAppVue,
    response: returnAppVue,
  },
]

function onClick(request: string, file: string | undefined, response: string) {
  emits('httpResponse', request, file, response)
}
</script>

<template>
  <ViteExplainedVisuallyBox class="p-2 flex flex-col gap-2">
    <span
      class="font-semibold text-neutral-500 text-sm"
    >
      HTTP Logs
    </span>
    <div
      class="grow flex flex-col gap-1 p-2 rounded"
    >
      <div
        v-for="(log, index) in logs"
        :key="index"
        v-click="props.initialClick + index"
        class="relative group"
      >
        <div class="overflow-auto" v-html="log.request" />
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 opacity-0 bg-neutral-100 rounded-md border border-neutral-200 font-semibold text-neutral-500 text-xs group-hover:opacity-100"
          @click="onClick(
            log.request,
            log.response.file,
            log.response.code,
          )"
        >
          View response
        </button>
      </div>
    </div>
  </ViteExplainedVisuallyBox>
</template>
