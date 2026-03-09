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

// TODO: move class to their respective components, there is no reason to move them
const props = withDefaults(defineProps<{
  browserAddress?: string
  browserAddressClick?: ExplainedVisuallyClickValue
  browserClick?: ExplainedVisuallyClickValue
  fileExplorerClick?: ExplainedVisuallyClickValue
  fileExplorerDefaultExpanded?: string[]
  fileSystemItems: ExplainedVisuallyFileSystemItem[]
  httpLogs: ExplainedVisuallyHttpLog[]
  httpLogsClick?: ExplainedVisuallyClickValue
  httpLogsClass?: string
  httpLogsTitle?: string
  readFilesEdgeClick?: ExplainedVisuallyClickValue
  readFilesEdgeText?: string
  requestEdgeClick?: ExplainedVisuallyClickValue
  requestEdgeText?: string
  sceneClass?: string
  serverClick?: ExplainedVisuallyClickValue
  serverLogoAlt?: string
  serverLogoSrc?: string
  serverStatusClass?: string
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
  httpLogsClass: 'absolute left-10 -bottom-2 right-3/10 pb-10',
  httpLogsTitle: 'HTTP Logs',
  readFilesEdgeClick: undefined,
  readFilesEdgeText: 'Read Files',
  requestEdgeClick: undefined,
  requestEdgeText: 'HTTP Requests',
  sceneClass: 'absolute left-10 right-10 top-14 flex fex-row items-center justify-between',
  serverClick: undefined,
  serverLogoAlt: 'Server logo',
  serverLogoSrc: '/vite-icon-color-dark.svg',
  serverStatusClass: 'absolute bottom-1 left-1/2 flex flex-row gap-1 -translate-x-1/2 text-xs text-cyan-700',
  serverStatusClick: undefined,
  serverStatusIcon: undefined,
  serverStatusText: undefined,
})

defineSlots<{
  'browser'?: () => any
  'server'?: () => any
  'server-status'?: () => any
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
  <div :class="props.sceneClass">
    <ExplainedVisuallyBrowser v-click="props.browserClick">
      <slot name="browser">
        <span v-if="props.browserAddress" v-click="props.browserAddressClick">
          {{ props.browserAddress }}
        </span>
      </slot>
    </ExplainedVisuallyBrowser>

    <ExplainedVisuallyEdge
      v-click="props.requestEdgeClick"
      :text="props.requestEdgeText"
    />

    <ExplainedVisuallyServer
      v-click="props.serverClick"
      :logo-alt="props.serverLogoAlt"
      :logo-src="props.serverLogoSrc"
      :status-class="props.serverStatusClass"
      :status-click="props.serverStatusClick"
      :status-icon="props.serverStatusIcon"
      :status-text="props.serverStatusText"
    >
      <slot name="server" />

      <template #status>
        <slot name="server-status">
          <span v-if="props.serverStatusIcon" :class="props.serverStatusIcon" />
          <span v-if="props.serverStatusText">
            {{ props.serverStatusText }}
          </span>
        </slot>
      </template>
    </ExplainedVisuallyServer>

    <ExplainedVisuallyEdge
      v-click="props.readFilesEdgeClick"
      :text="props.readFilesEdgeText"
    />

    <ExplainedVisuallyFileExplorer
      v-click="props.fileExplorerClick"
      :default-expanded="props.fileExplorerDefaultExpanded"
      :items="props.fileSystemItems"
      @select="onSelectFile"
    />
  </div>

  <ExplainedVisuallyHttpLogs
    v-click="props.httpLogsClick"
    :items="props.httpLogs"
    :title="props.httpLogsTitle"
    :class="props.httpLogsClass"
    @select="onSelectHttpLog"
  />

  <ExplainedVisuallyCodeModal v-model="file" />

  <ExplainedVisuallyHttpResponseModal v-model="httpResponse" />
</template>
