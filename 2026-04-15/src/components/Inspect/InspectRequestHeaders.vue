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

const baseUrl = 'http://localhost:5173'
const fixedDate = 'Sun, 08 Mar 2026 13:23:16 GMT'
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'

const requestPath = computed(() => {
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

  return `${baseUrl}${requestPath.value}`
})

const contentType = computed(() => {
  if (props.request.type === 'document')
    return 'text/html'

  if (props.request.type === 'stylesheet' || props.request.name.endsWith('.css'))
    return 'text/css'

  if (/\.(png|apng|avif|gif|jpe?g|svg|webp)(\?|$)/.test(props.request.name) && !props.request.name.includes('?import'))
    return `image/${props.request.name.match(/\.svg(\?|$)/) ? 'svg+xml' : props.request.name.match(/\.png(\?|$)/) ? 'png' : props.request.name.match(/\.webp(\?|$)/) ? 'webp' : props.request.name.match(/\.avif(\?|$)/) ? 'avif' : props.request.name.match(/\.gif(\?|$)/) ? 'gif' : 'jpeg'}`

  return 'text/javascript'
})

const estimatedContentLength = computed(() => {
  const plainResponse = props.request.response
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')

  return String(plainResponse.length)
})

const requestAccept = computed(() => {
  if (props.request.type === 'document') {
    return 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }

  if (props.request.type === 'stylesheet')
    return 'text/css,*/*;q=0.1'

  return '*/*'
})

const fetchDestination = computed(() => {
  if (props.request.type === 'document')
    return 'document'

  if (props.request.type === 'stylesheet')
    return 'style'

  return 'script'
})

const responseHeaders = computed<HeaderRow[]>(() => [
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
    value: `W/"vite-${props.request.id}-${props.request.time}-${props.request.name.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'request'}"`,
  },
  {
    label: 'Keep-Alive',
    value: 'timeout=5',
  },
  {
    label: 'Vary',
    value: 'Origin',
  },
])

const requestHeaders = computed<HeaderRow[]>(() => {
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
        value: 'GET',
      },
      {
        label: 'Status Code',
        value: '200 OK',
      },
      {
        label: 'Remote Address',
        value: '[::1]:5173',
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
