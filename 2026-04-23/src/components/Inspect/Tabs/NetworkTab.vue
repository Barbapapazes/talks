<script lang="ts" setup>
import type { Request } from '../../../types/network-tab'
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'
import { onClickOutside } from '@vueuse/core'
import { computed, defineComponent, markRaw, shallowRef, useTemplateRef, watch } from 'vue'
import InspectRequestHeaders from '../InspectRequestHeaders.vue'
import InspectRequestMessages from '../InspectRequestMessages.vue'
import InspectRequestTabs from '../InspectRequestTabs.vue'

interface NetworkTabProps {
  requests: Request[]
  showDetails?: boolean
  selectedRequestId?: number | null
  selectedRequestTab?: RequestDetailTab | null
}
const props = withDefaults(defineProps<NetworkTabProps>(), {
  showDetails: true,
  selectedRequestId: null,
  selectedRequestTab: null,
})

type RequestDetailTab = 'Headers' | 'Response' | 'Messages'

function getAvailableDetailTabs(request: Request | null): RequestDetailTab[] {
  if (!request)
    return ['Headers']

  if (request.type === 'websocket' && request.webSocketMessages?.length)
    return ['Headers', 'Messages']

  if (request.response)
    return ['Headers', 'Response']

  return ['Headers']
}

interface NetworkRequestRow {
  request: Request
  delay: number | string
  icon?: string
  method: string
  status: number
  protocol: string
  size: string
  waterfallStyle: {
    left: string
    width: string
  }
}

const ROW_ANIMATION_LIMIT = 120
const PlainWrapper = markRaw(defineComponent({
  setup(_, { slots }) {
    return () => slots.default?.()
  },
}))

function icon(type: string) {
  switch (type) {
    case 'document':
      return 'i-vscode-icons-file-type-html'
    case 'script':
      return 'i-vscode-icons-file-type-js'
    case 'stylesheet':
      return 'i-vscode-icons-file-type-css'
    case 'websocket':
      return 'i-lucide-waypoints'
  }
}

const currentRequest = shallowRef<Request | null>(null)
const currentRequestId = computed(() => currentRequest.value?.id ?? null)
const currentRequestTab = shallowRef<RequestDetailTab>('Headers')
const currentRequestAvailableTabs = computed<RequestDetailTab[]>(() => getAvailableDetailTabs(currentRequest.value))

const shouldAnimateRows = computed(() => props.requests.length <= ROW_ANIMATION_LIMIT)

const requestRows = computed<NetworkRequestRow[]>(() => {
  const maxWaterfallWidth = props.requests.reduce((maxWidth, request) => {
    return Math.max(maxWidth, (request.waterfallStart ?? 0) + (request.waterfallDuration ?? request.time))
  }, 1)

  return props.requests.map((request, index) => {
    const offset = request.waterfallStart ?? 0
    const duration = request.waterfallDuration ?? request.time

    return {
      request,
      delay: shouldAnimateRows.value ? `calc(${index} * 30ms)` : 0,
      icon: icon(request.type),
      method: request.method ?? 'GET',
      status: request.status ?? 200,
      protocol: request.protocol ?? 'http/1.1',
      size: request.size ?? '-',
      waterfallStyle: {
        left: `${(offset / maxWaterfallWidth) * 100}%`,
        width: `${Math.max((duration / maxWaterfallWidth) * 100, 1.5)}%`,
      },
    }
  })
})

const currentRequestTarget = useTemplateRef('currentRequestTarget')
onClickOutside(currentRequestTarget, () => currentRequest.value = null)

watch(
  [currentRequestAvailableTabs, () => props.selectedRequestTab] as const,
  ([tabs, requestedTab]) => {
    if (requestedTab && tabs.includes(requestedTab)) {
      currentRequestTab.value = requestedTab
      return
    }

    if (!tabs.includes(currentRequestTab.value))
      currentRequestTab.value = tabs[0]
  },
  { immediate: true },
)

watch(
  () => [props.requests, props.selectedRequestId, props.selectedRequestTab] as const,
  ([requests, selectedRequestId, selectedRequestTab]) => {
    if (selectedRequestId != null) {
      currentRequest.value = requests.find(request => request.id === selectedRequestId) ?? null

      if (currentRequest.value) {
        const availableTabs = getAvailableDetailTabs(currentRequest.value)

        currentRequestTab.value = selectedRequestTab && availableTabs.includes(selectedRequestTab)
          ? selectedRequestTab
          : availableTabs[0]
      }

      return
    }

    if (currentRequest.value) {
      currentRequest.value = requests.find(request => request.id === currentRequest.value?.id) ?? null
    }
  },
  { immediate: true },
)

function onClick(request: Request) {
  currentRequest.value = request
  currentRequestTab.value = 'Headers'
}

function isSelected(requestId: number) {
  return requestId === currentRequestId.value
}

function rowWrapper(index: number) {
  if (!shouldAnimateRows.value)
    return PlainWrapper

  return index === 0 ? VClick : VAfter
}
</script>

<template>
  <div class="h-full relative">
    <table class="w-full text-left text-sm">
      <thead class="sticky top-0 z-10 bg-neutral-900">
        <tr class="border-y border-neutral-700 text-sm text-neutral-500">
          <th class="pl-2 py-2 font-normal">
            Name
          </th>
          <th class="px-1 py-2 font-normal">
            Method
          </th>
          <th class="px-1 py-2 font-normal">
            Status
          </th>
          <th class="px-1 py-2 font-normal">
            Protocol
          </th>
          <th class="px-1 py-2 font-normal">
            Type
          </th>
          <th class="px-1 py-2 font-normal">
            Initiator
          </th>
          <th class="px-1 py-2 text-right font-normal">
            Size
          </th>
          <th class="px-1 py-2 font-normal">
            Time
          </th>
          <th class="px-1 py-2 font-normal">
            Waterfall
          </th>
        </tr>
      </thead>

      <tbody>
        <component
          :is="rowWrapper(index)"
          v-for="(row, index) in requestRows"
          :key="row.request.id"
        >
          <tr
            class="forward:delay-[--delay] cursor-pointer transition"
            :class="{
              'bg-neutral-800': index % 2 && !isSelected(row.request.id),
              'bg-violet-900': isSelected(row.request.id),
              'hover:bg-neutral-700': !isSelected(row.request.id),
            }"
            :style="{
              '--delay': row.delay,
            }"
            @click="onClick(row.request)"
          >
            <td class="pl-2 py-2">
              <div class="flex flex-row items-center gap-2">
                <span class="text-right text-xs text-neutral-500">{{ row.request.id }}</span>
                <div
                  class="size-5"
                  :class="row.icon"
                />
                <span class="truncate max-w-[13ch]">{{ row.request.name }}</span>
              </div>
            </td>
            <td class="px-1 py-2">
              {{ row.method }}
            </td>
            <td class="px-1 py-2">
              {{ row.status }}
            </td>
            <td class="px-1 py-2">
              {{ row.protocol }}
            </td>
            <td class="px-1 py-2">
              {{ row.request.type }}
            </td>
            <td class="px-1 py-2">
              <span v-if="row.request.initiator" class="underline">
                {{ row.request.initiator }}
              </span>
              <span v-else class="text-neutral-500">
                Other
              </span>
            </td>
            <td class="py-2 text-right whitespace-nowrap">
              {{ row.size }}
            </td>
            <td class="py-2 text-right whitespace-nowrap">
              {{ row.request.time }} ms
            </td>
            <td class="p-2">
              <div class="relative h-4 w-36">
                <div
                  class="absolute top-0.5 h-3 rounded-sm bg-sky-400/80"
                  :style="row.waterfallStyle"
                />
              </div>
            </td>
          </tr>
        </component>
      </tbody>
    </table>

    <div
      v-if="props.showDetails && currentRequest"
      ref="currentRequestTarget"
      class="z-10 absolute inset-y-0 right-0 left-1/5 flex flex-col border-l border-neutral-700 bg-neutral-900"
    >
      <InspectRequestTabs
        v-model="currentRequestTab"
        :enabled-tabs="currentRequestAvailableTabs"
      />

      <InspectRequestHeaders
        v-if="currentRequestTab === 'Headers'"
        :request="currentRequest"
        class="grow overflow-auto"
      />

      <InspectRequestMessages
        v-else-if="currentRequestTab === 'Messages' && currentRequest.webSocketMessages"
        :messages="currentRequest.webSocketMessages"
      />

      <div
        v-else
        class="grow overflow-auto p-4"
        v-html="currentRequest.response"
      />
    </div>
  </div>
</template>
