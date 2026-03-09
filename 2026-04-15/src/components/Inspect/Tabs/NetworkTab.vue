<script lang="ts" setup>
import type { Request } from '../../../types/network-tab'
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'
import InspectRequestHeaders from '../InspectRequestHeaders.vue'
import InspectRequestTabs from '../InspectRequestTabs.vue'

interface NetworkTabProps {
  requests: Request[]
  animate?: boolean
  showDetails?: boolean
  selectedRequestId?: number | null
}
const props = withDefaults(defineProps<NetworkTabProps>(), {
  animate: true,
  showDetails: true,
  selectedRequestId: null,
})

type RequestDetailTab = 'Headers' | 'Response'

function icon(type: string) {
  switch (type) {
    case 'document':
      return 'i-vscode-icons-file-type-html'
    case 'script':
      return 'i-vscode-icons-file-type-js'
    case 'stylesheet':
      return 'i-vscode-icons-file-type-css'
  }
}

const currentRequest = ref<Request | null>(null)
const currentRequestTab = ref<RequestDetailTab>('Headers')

const maxWaterfallWidth = computed(() => Math.max(
  ...props.requests.map(request => (request.waterfallStart ?? 0) + (request.waterfallDuration ?? request.time)),
  1,
))

const currentRequestTarget = useTemplateRef('currentRequestTarget')
onClickOutside(currentRequestTarget, () => currentRequest.value = null)

watch(
  () => [props.requests, props.selectedRequestId] as const,
  () => {
    if (props.selectedRequestId != null) {
      currentRequest.value = props.requests.find(request => request.id === props.selectedRequestId) ?? null
      return
    }

    if (currentRequest.value) {
      currentRequest.value = props.requests.find(request => request.id === currentRequest.value?.id) ?? null
    }
  },
  { immediate: true, deep: true },
)

function onClick(request: Request) {
  currentRequest.value = request
  currentRequestTab.value = 'Headers'
}

function isSelected(request: Request) {
  return request.id === currentRequest.value?.id
}

function formatMethod(request: Request) {
  return request.method ?? 'GET'
}

function formatStatus(request: Request) {
  return request.status ?? 200
}

function formatProtocol(request: Request) {
  return request.protocol ?? 'http/1.1'
}

function formatSize(request: Request) {
  return request.size ?? '-'
}

function waterfallStyle(request: Request) {
  const offset = request.waterfallStart ?? 0
  const duration = request.waterfallDuration ?? request.time

  return {
    left: `${(offset / maxWaterfallWidth.value) * 100}%`,
    width: `${Math.max((duration / maxWaterfallWidth.value) * 100, 1.5)}%`,
  }
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
          :is="index === 0 ? VClick : VAfter"
          v-for="(request, index) in props.requests"
          :key="request.id"
        >
          <tr
            class="forward:delay-[--delay] cursor-pointer transition"
            :class="{
              'bg-neutral-800': index % 2 && !isSelected(request),
              'bg-violet-900': isSelected(request),
              'hover:bg-neutral-700': !isSelected(request),
            }"
            :style="{
              '--delay': props.animate ? `calc(${(index % props.requests.length) + (Math.floor(index / props.requests.length))} * 30ms)` : 0,
            }"
            @click="onClick(request)"
          >
            <td class="pl-2 py-2">
              <div class="flex flex-row items-center gap-2">
                <span class="text-right text-xs text-neutral-500">{{ request.id }}</span>
                <div
                  class="size-5"
                  :class="icon(request.type)"
                />
                <span class="truncate">{{ request.name }}</span>
              </div>
            </td>
            <td class="px-1 py-2">
              {{ formatMethod(request) }}
            </td>
            <td class="px-1 py-2">
              {{ formatStatus(request) }}
            </td>
            <td class="px-1 py-2">
              {{ formatProtocol(request) }}
            </td>
            <td class="px-1 py-2">
              {{ request.type }}
            </td>
            <td class="px-1 py-2">
              <span v-if="request.initiator" class="underline">
                {{ request.initiator }}
              </span>
              <span v-else class="text-neutral-500">
                Other
              </span>
            </td>
            <td class="py-2 text-right whitespace-nowrap">
              {{ formatSize(request) }}
            </td>
            <td class="py-2 text-right whitespace-nowrap">
              {{ request.time }} ms
            </td>
            <td class="p-2">
              <div class="relative h-4 w-36">
                <div
                  class="absolute top-0.5 h-3 rounded-sm bg-sky-400/80"
                  :style="waterfallStyle(request)"
                />
              </div>
            </td>
          </tr>
        </component>
      </tbody>
    </table>

    <div
      v-if="props.showDetails && currentRequest?.response"
      ref="currentRequestTarget"
      class="z-10 absolute inset-y-0 right-0 left-1/5 flex flex-col border-l border-neutral-700 bg-neutral-900"
    >
      <InspectRequestTabs v-model="currentRequestTab" />

      <InspectRequestHeaders
        v-if="currentRequestTab === 'Headers'"
        :request="currentRequest"
        class="grow overflow-auto"
      />

      <div
        v-else
        class="grow overflow-auto p-4"
        v-html="currentRequest.response"
      />
    </div>
  </div>
</template>
