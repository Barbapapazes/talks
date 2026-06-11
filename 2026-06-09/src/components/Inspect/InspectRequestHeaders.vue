<script lang="ts" setup>
import type { Request } from '../../types/network-tab'
import { computed } from 'vue'

interface HeaderRow {
  label: string
  value: string
}

interface HeaderSection {
  title: string
  rows: HeaderRow[]
}

const props = defineProps<{
  request: Request
}>()

const IMAGE_REQUEST_RE = /\.(?:png|apng|avif|gif|jpe?g|svg|webp)(?:\?|$)/
const SVG_REQUEST_RE = /\.svg(?:\?|$)/
const PNG_REQUEST_RE = /\.png(?:\?|$)/
const WEBP_REQUEST_RE = /\.webp(?:\?|$)/
const AVIF_REQUEST_RE = /\.avif(?:\?|$)/
const GIF_REQUEST_RE = /\.gif(?:\?|$)/
const HTML_TAG_RE = /<[^>]+>/g
const ENTITY_LT_RE = /&lt;/g
const ENTITY_GT_RE = /&gt;/g
const ENTITY_AMP_RE = /&amp;/g
const ENTITY_QUOT_RE = /&quot;/g
const ENTITY_APOS_RE = /&#39;/g
const NON_ALPHANUMERIC_RE = /[^a-z0-9]/gi

function imageSubtype(name: string) {
  if (SVG_REQUEST_RE.test(name))
    return 'svg+xml'

  if (PNG_REQUEST_RE.test(name))
    return 'png'

  if (WEBP_REQUEST_RE.test(name))
    return 'webp'

  if (AVIF_REQUEST_RE.test(name))
    return 'avif'

  if (GIF_REQUEST_RE.test(name))
    return 'gif'

  return 'jpeg'
}

const baseUrl = 'http://localhost:5173'
const baseWsUrl = 'ws://localhost:5173'
const fixedDate = 'Sun, 08 Mar 2026 13:23:16 GMT'
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
const isWebSocketRequest = computed(() => props.request.type === 'websocket')

const requestPath = computed(() => {
  if (props.request.url)
    return props.request.url

  if (props.request.name === 'localhost' || props.request.type === 'document')
    return '/'

  if (props.request.name.startsWith('http://') || props.request.name.startsWith('https://'))
    return props.request.name

  if (props.request.name.startsWith('/'))
    return props.request.name

  return `/src/${props.request.name}`
})

const requestUrl = computed(() => {
  if (requestPath.value.startsWith('http://') || requestPath.value.startsWith('https://'))
    return requestPath.value

  if (requestPath.value.startsWith('ws://') || requestPath.value.startsWith('wss://'))
    return requestPath.value

  if (isWebSocketRequest.value)
    return `${baseWsUrl}${requestPath.value}`

  return `${baseUrl}${requestPath.value}`
})

const contentType = computed(() => {
  if (isWebSocketRequest.value)
    return 'N/A'

  if (props.request.type === 'document')
    return 'text/html'

  if (props.request.type === 'stylesheet' || props.request.name.endsWith('.css'))
    return 'text/css'

  if (IMAGE_REQUEST_RE.test(props.request.name) && !props.request.name.includes('?import'))
    return `image/${imageSubtype(props.request.name)}`

  return 'text/javascript'
})

const estimatedContentLength = computed(() => {
  if (!props.request.response)
    return '0'

  const plainResponse = props.request.response
    .replace(HTML_TAG_RE, '')
    .replace(ENTITY_LT_RE, '<')
    .replace(ENTITY_GT_RE, '>')
    .replace(ENTITY_AMP_RE, '&')
    .replace(ENTITY_QUOT_RE, '"')
    .replace(ENTITY_APOS_RE, '\'')

  return String(plainResponse.length)
})

const requestAccept = computed(() => {
  if (isWebSocketRequest.value)
    return '*/*'

  if (props.request.type === 'document') {
    return 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }

  if (props.request.type === 'stylesheet')
    return 'text/css,*/*;q=0.1'

  return '*/*'
})

const fetchDestination = computed(() => {
  if (isWebSocketRequest.value)
    return 'websocket'

  if (props.request.type === 'document')
    return 'document'

  if (props.request.type === 'stylesheet')
    return 'style'

  return 'script'
})

const responseHeaders = computed<HeaderRow[]>(() => {
  if (isWebSocketRequest.value) {
    return [
      {
        label: 'Connection',
        value: 'Upgrade',
      },
      {
        label: 'Date',
        value: fixedDate,
      },
      {
        label: 'Sec-WebSocket-Accept',
        value: 'UHJldHR5TGVnaXRCdXRUaGlzSXNJdEZha2U9',
      },
      {
        label: 'Upgrade',
        value: 'websocket',
      },
    ]
  }

  return [
    {
      label: 'Access-Control-Allow-Origin',
      value: baseUrl,
    },
    {
      label: 'Cache-Control',
      value: 'no-cache',
    },
    {
      label: 'Connection',
      value: 'keep-alive',
    },
    {
      label: 'Content-Length',
      value: estimatedContentLength.value,
    },
    {
      label: 'Content-Type',
      value: contentType.value,
    },
    {
      label: 'Date',
      value: fixedDate,
    },
    {
      label: 'Etag',
      value: `W/"vite-${props.request.id}-${props.request.time}-${props.request.name.replace(NON_ALPHANUMERIC_RE, '').toLowerCase() || 'request'}"`,
    },
    {
      label: 'Keep-Alive',
      value: 'timeout=5',
    },
    {
      label: 'Vary',
      value: 'Origin',
    },
  ]
})

const requestHeaders = computed<HeaderRow[]>(() => {
  if (isWebSocketRequest.value) {
    return [
      {
        label: 'Accept-Encoding',
        value: 'gzip, deflate, br, zstd',
      },
      {
        label: 'Accept-Language',
        value: 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7',
      },
      {
        label: 'Cache-Control',
        value: 'no-cache',
      },
      {
        label: 'Connection',
        value: 'Upgrade',
      },
      {
        label: 'Host',
        value: 'localhost:5173',
      },
      {
        label: 'Origin',
        value: baseUrl,
      },
      {
        label: 'Pragma',
        value: 'no-cache',
      },
      {
        label: 'Sec-WebSocket-Extensions',
        value: 'permessage-deflate; client_max_window_bits',
      },
      {
        label: 'Sec-WebSocket-Key',
        value: 'ZGVtby10YWxrLXNvY2tldA==',
      },
      {
        label: 'Sec-WebSocket-Version',
        value: '13',
      },
      {
        label: 'Upgrade',
        value: 'websocket',
      },
      {
        label: 'User-Agent',
        value: userAgent,
      },
    ]
  }

  const rows: HeaderRow[] = [
    {
      label: 'Accept',
      value: requestAccept.value,
    },
    {
      label: 'Accept-Encoding',
      value: 'gzip, deflate, br, zstd',
    },
    {
      label: 'Accept-Language',
      value: 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7',
    },
    {
      label: 'Cache-Control',
      value: 'no-cache',
    },
    {
      label: 'Connection',
      value: 'keep-alive',
    },
    {
      label: 'Host',
      value: 'localhost:5173',
    },
  ]

  if (props.request.type === 'document') {
    rows.push(
      {
        label: 'Sec-Fetch-Dest',
        value: 'document',
      },
      {
        label: 'Sec-Fetch-Mode',
        value: 'navigate',
      },
      {
        label: 'Sec-Fetch-Site',
        value: 'none',
      },
      {
        label: 'Sec-Fetch-User',
        value: '?1',
      },
      {
        label: 'Upgrade-Insecure-Requests',
        value: '1',
      },
    )
  }
  else {
    rows.push(
      {
        label: 'Origin',
        value: baseUrl,
      },
      {
        label: 'Pragma',
        value: 'no-cache',
      },
      {
        label: 'Referer',
        value: `${baseUrl}/`,
      },
      {
        label: 'Sec-Fetch-Dest',
        value: fetchDestination.value,
      },
      {
        label: 'Sec-Fetch-Mode',
        value: 'cors',
      },
      {
        label: 'Sec-Fetch-Site',
        value: 'same-origin',
      },
    )
  }

  rows.push({
    label: 'User-Agent',
    value: userAgent,
  })

  return rows
})

const sections = computed<HeaderSection[]>(() => [
  {
    title: 'General',
    rows: [
      {
        label: 'Request URL',
        value: requestUrl.value,
      },
      {
        label: 'Request Method',
        value: props.request.method ?? 'GET',
      },
      {
        label: 'Status Code',
        value: props.request.status ? `${props.request.status} ${props.request.status === 101 ? 'Switching Protocols' : 'OK'}` : '200 OK',
      },
      {
        label: 'Remote Address',
        value: '[::1]:5173',
      },
      {
        label: 'Protocol',
        value: props.request.protocol ?? 'http/1.1',
      },
      {
        label: 'Referrer Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        label: 'Initiator',
        value: props.request.initiator ?? 'Other',
      },
    ],
  },
  {
    title: 'Response headers',
    rows: responseHeaders.value,
  },
  {
    title: 'Request headers',
    rows: requestHeaders.value,
  },
])
</script>

<template>
  <div class="flex flex-col text-sm text-neutral-100">
    <section
      v-for="section in sections"
      :key="section.title"
      class="bg-neutral-900"
    >
      <div class="flex items-center gap-2 border-y border-neutral-700 px-3 py-2 text-xs font-semibold tracking-wide text-neutral-400 uppercase bg-violet-900/10">
        <span class="i-ph-caret-down-fill text-[10px]" />
        {{ section.title }}
      </div>

      <dl>
        <div
          v-for="row in section.rows"
          :key="`${section.title}-${row.label}`"
          class="grid grid-cols-2 gap-4 border-b border-neutral-800 px-3 py-2 last:border-b-0 odd:bg-neutral-900 even:bg-neutral-800/40"
        >
          <dt class="font-medium text-neutral-400 whitespace-nowrap">
            {{ row.label }}
          </dt>
          <dd class="font-mono text-[13px] break-all text-neutral-100">
            {{ row.value }}
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
