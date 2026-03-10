<script lang="ts" setup>
import type { ConsoleEntry } from '../types/console-tab'
import type { Request } from '../types/network-tab'
import waterfallHar from '../waterfall.har?raw'
import Inspect from './Inspect/Inspect.vue'

interface HarEntry {
  startedDateTime?: string
  time?: number
  request?: {
    method?: string
    url?: string
  }
  response?: {
    status?: number
    bodySize?: number
    content?: {
      size?: number
    }
  }
}

const consoleEntries: ConsoleEntry[] = [
  {
    id: 1,
    level: 'error',
    message: 'Uncaught SyntaxError: The requested module \'http://localhost:5173/@fs/.../react/index.js?v=9bb1a453\' doesn\'t provide an export named \'default\'',
    source: 'main.js:1:144',
    details: 'Le navigateur attend de l’ESM, mais la dépendance exposée ici est encore en CommonJS.',
  },
]

const harEntries = (JSON.parse(waterfallHar) as { log?: { entries?: HarEntry[] } }).log?.entries ?? []
const startReference = harEntries
  .map(entry => entry.startedDateTime ? Date.parse(entry.startedDateTime) : Number.NaN)
  .find(startedDateTime => Number.isFinite(startedDateTime)) ?? 0

const sizeFallbacks: Record<string, string> = {
  'localhost': '0.7 kB',
  'client': '185 kB',
  'main.ts': '0.5 kB',
  'lodash.js?v=ddd15626': '538 kB',
}

function formatRequestName(url: URL) {
  if (url.pathname === '/')
    return 'localhost'

  return `${url.pathname.split('/').pop() ?? url.pathname}${url.search}`
}

function formatRequestSize(size: number | undefined, name: string, isWebSocket: boolean) {
  if (isWebSocket)
    return '0.0 kB'

  if (typeof size === 'number' && size >= 0) {
    if (size < 1024)
      return `${size} B`

    return `${(size / 1024).toFixed(1)} kB`
  }

  return sizeFallbacks[name] ?? '1.1 kB'
}

function getInitiator(name: string, isWebSocket: boolean) {
  if (name === 'client')
    return '(index):4'

  if (name === 'main.ts')
    return '(index):13'

  if (name === 'localhost')
    return undefined

  if (isWebSocket)
    return 'client:744'

  if (name.startsWith('lodash.js'))
    return 'main.ts:1'

  return 'lodash.js:1'
}

const lodashRequests: Request[] = harEntries.flatMap((entry, index) => {
  const rawUrl = entry.request?.url

  if (!rawUrl)
    return []

  const url = new URL(rawUrl)
  const name = formatRequestName(url)
  const isWebSocket = entry.response?.status === 101 || url.searchParams.has('token')
  const startedDateTime = entry.startedDateTime ? Date.parse(entry.startedDateTime) : Number.NaN
  const duration = Math.max(Math.round(entry.time ?? 0), isWebSocket ? 0 : 1)

  return [{
    id: index + 1,
    name,
    method: entry.request?.method ?? 'GET',
    status: entry.response?.status ?? (isWebSocket ? 101 : 200),
    protocol: isWebSocket ? 'websocket' : 'http/1.1',
    type: isWebSocket ? 'websocket' : url.pathname === '/' ? 'document' : 'script',
    initiator: getInitiator(name, isWebSocket),
    size: formatRequestSize(entry.response?.content?.size ?? entry.response?.bodySize, name, isWebSocket),
    time: duration,
    waterfallStart: Number.isFinite(startedDateTime) ? Math.max(startedDateTime - startReference, 0) : index * 2,
    waterfallDuration: duration,
  } satisfies Request]
})
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <Inspect
      class="min-h-0 flex-1"
      active-tab="Console"
      :console="consoleEntries"
      :network="lodashRequests"
    />
  </div>
</template>
