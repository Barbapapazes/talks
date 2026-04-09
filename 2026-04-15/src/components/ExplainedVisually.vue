<script lang="ts" setup>
import type {
  ExplainedVisuallyClickValue,
  ExplainedVisuallyFileSystemItem,
  ExplainedVisuallyHttpLog,
  ExplainedVisuallySelectedFile,
  ExplainedVisuallySelectedResponse,
} from './ExplainedVisually/types'
import { ref } from 'vue'
import ExplainedVisuallyBrowser from './ExplainedVisually/ExplainedVisuallyBrowser.vue'
import ExplainedVisuallyCodeModal from './ExplainedVisually/ExplainedVisuallyCodeModal.vue'
import ExplainedVisuallyEdge from './ExplainedVisually/ExplainedVisuallyEdge.vue'
import ExplainedVisuallyFileExplorer from './ExplainedVisually/ExplainedVisuallyFileExplorer.vue'
import ExplainedVisuallyHttpLogs from './ExplainedVisually/ExplainedVisuallyHttpLogs.vue'
import ExplainedVisuallyHttpResponseModal from './ExplainedVisually/ExplainedVisuallyHttpResponseModal.vue'
import ExplainedVisuallyServer from './ExplainedVisually/ExplainedVisuallyServer.vue'

const props = withDefaults(defineProps<{
  browserAddress?: string
  browserAddressClick?: ExplainedVisuallyClickValue
  browserClick?: ExplainedVisuallyClickValue
  fileExplorerClick?: ExplainedVisuallyClickValue
  fileExplorerDefaultExpanded?: string[]
  fileSystemItems: ExplainedVisuallyFileSystemItem[]
  httpLogs: ExplainedVisuallyHttpLog[]
  httpLogsClick?: ExplainedVisuallyClickValue
  httpLogsTitle?: string
  readFilesEdgeClick?: ExplainedVisuallyClickValue
  readFilesEdgeText?: string
  requestEdgeClick?: ExplainedVisuallyClickValue
  requestEdgeText?: string
  serverClick?: ExplainedVisuallyClickValue
  serverLogoAlt?: string
  serverLogoSrc?: string
  serverStatusClick?: ExplainedVisuallyClickValue
  serverStatusIcon?: string
  serverStatusText?: string
}>(), {
  browserAddress: undefined,
  browserAddressClick: undefined,
  browserClick: undefined,
  fileExplorerClick: undefined,
  fileExplorerDefaultExpanded: () => [],
  httpLogsClick: undefined,
  httpLogsTitle: 'HTTP Logs',
  readFilesEdgeClick: undefined,
  readFilesEdgeText: 'Read Files',
  requestEdgeClick: undefined,
  requestEdgeText: 'HTTP Requests',
  serverClick: undefined,
  serverLogoAlt: 'Server logo',
  serverLogoSrc: '/vite-icon-color-dark.svg',
})

defineSlots<{
  server?: () => any
}>()

function findFileByTitle(
  title: string,
  items: ExplainedVisuallyFileSystemItem[] = props.fileSystemItems,
): ExplainedVisuallyFileSystemItem | null {
  for (const item of items) {
    if (item.title === title)
      return item

    if (item.children) {
      const foundItem = findFileByTitle(title, item.children)

      if (foundItem)
        return foundItem
    }
  }

  return null
}

const file = ref<ExplainedVisuallySelectedFile | null>(null)
function onSelectFile(item: ExplainedVisuallyFileSystemItem) {
  if (item.code) {
    file.value = { file: item.title, code: item.code }
  }
  else {
    file.value = null
  }
}

const httpResponse = ref<ExplainedVisuallySelectedResponse | null>(null)
function onSelectHttpLog(log: ExplainedVisuallyHttpLog) {
  if (!log.response)
    return

  const foundFile = log.response.file
    ? findFileByTitle(log.response.file)
    : null

  httpResponse.value = {
    request: log.request,
    response: log.response,
    file: foundFile?.code,
  }
}
</script>

<template>
  <div class="absolute left-10 right-10 top-1/2 transform -translate-y-1/2 flex fex-row items-center justify-between">
    <ExplainedVisuallyBrowser v-click="[props.browserClick, props.httpLogsClick]">
      <span v-if="props.browserAddress" v-click="props.browserAddressClick">
        {{ props.browserAddress }}
      </span>
    </ExplainedVisuallyBrowser>

    <ExplainedVisuallyEdge
      v-click="[props.requestEdgeClick, props.httpLogsClick]"
      :text="props.requestEdgeText"
    />

    <ExplainedVisuallyServer
      v-click="[props.serverClick, props.httpLogsClick]"
      :logo-alt="props.serverLogoAlt"
      :logo-src="props.serverLogoSrc"
    >
      <slot name="server" />
    </ExplainedVisuallyServer>

    <ExplainedVisuallyEdge
      v-click="[props.readFilesEdgeClick, props.httpLogsClick]"
      :text="props.readFilesEdgeText"
    />

    <ExplainedVisuallyFileExplorer
      v-click="[props.fileExplorerClick, props.httpLogsClick]"
      :default-expanded="props.fileExplorerDefaultExpanded"
      :items="props.fileSystemItems"
      @select="onSelectFile"
    />
  </div>

  <ExplainedVisuallyHttpLogs
    v-click="props.httpLogsClick"
    :click="props.httpLogsClick ? props.httpLogsClick + 1 : undefined"
    :items="props.httpLogs"
    :title="props.httpLogsTitle"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5"
    @select="onSelectHttpLog"
  />

  <ExplainedVisuallyCodeModal v-model="file" />

  <ExplainedVisuallyHttpResponseModal v-model="httpResponse" />
</template>
