<script lang="ts" setup>
import type { Request } from '../types/network-tab'
import VAfter from '@slidev/client/builtin/VAfter.ts'
import VClick from '@slidev/client/builtin/VClick.ts'
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
import InspectorTab from './InspectorTab.vue'

interface NetworkTabProps {
  requests: Request[]
}
const props = defineProps<NetworkTabProps>()

const tabs = [
  'Elements',
  'Console',
  'Sources',
  {
    name: 'Network',
    active: true,
  },
  'Performance',
  'Memory',
  'Application',
  'Security',
]

const requestTabs = [
  'Headers',
  'Payload',
  'Preview',
  {
    name: 'Response',
    active: true,
  },
  'Initiator',
  'Timing',
  'Cookies',
]

const filters = [
  'Fetch/XHR',
  'Doc',
  'CSS',
  'JS',
  'Font',
  'Img',
  'Media',
  'Manifest',
  'Socket',
  'Wasm',
  'Other',
]

function icon(type: string) {
  switch (type) {
    case 'document':
      return 'i-vscode-icons-file-type-html'
    case 'script':
      return 'i-vscode-icons-file-type-js'
    case 'stylesheet':
      return 'i-vscode-icons-file-type-css'
    default:
      return 'i-vscode-icons-default-file'
  }
}

const currentRequest = ref<Request | null>(null)

const currentRequestTarget = useTemplateRef('currentRequestTarget')
onClickOutside(currentRequestTarget, () => currentRequest.value = null)

function onClick(request: Request) {
  currentRequest.value = request
}
</script>

<template>
  <div class="flex flex-col bg-neutral-900 border border-neutral-700 text-white">
    <InspectorTab
      :items="tabs"
    />

    <div class="flex flex-row gap-2 text-neutral-500 text-xs p-4">
      <div
        class="px-2 py-1 rounded-lg border border-neutral-700 bg-neutral-700 text-white"
      >
        All
      </div>
      <hr class="my-px w-px h-auto bg-neutral-700 border-0">
      <div
        v-for="filter in filters"
        :key="filter"
        class="px-2 py-1 rounded-lg border border-neutral-700"
      >
        {{ filter }}
      </div>
    </div>

    <div class="grow bg-neutral-900 relative">
      <table class="w-full text-left">
        <thead>
          <tr class="text-neutral-500 text-sm border-y border-neutral-700">
            <th class="pl-2 py-2">
              Name
            </th>
            <th class="py-2">
              Type
            </th>
            <th class="py-2">
              Initiator
            </th>
            <th class="py-2">
              Time
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
              class="forward:delay-[--delay] transition"
              :class="{
                'bg-neutral-800': index % 2 && request.name !== currentRequest?.name,
                'bg-blue-900': request.name === currentRequest?.name,
                'hover:bg-neutral-700': request.name !== currentRequest?.name,
              }"
              :style="{
                '--delay': `calc(${(index % 4) + (Math.floor(index / 4))} * 30ms)`,
              }"
              @click="onClick(request)"
            >
              <td class="pl-2 py-2 flex flex-row items-center gap-2">
                <div
                  class="size-5"
                  :class="icon(request.type)"
                />
                {{ request.name }}
              </td>
              <td class="py-2">
                {{ request.type }}
              </td>
              <td class="py-2">
                <span v-if="request.initiator" class="underline">
                  {{ request.initiator }}
                </span>
                <span v-else class="text-neutral-500">
                  Other
                </span>
              </td>
              <td class="pr-2 py-2 text-right">
                {{ request.time }} ms
              </td>
            </tr>
          </component>
        </tbody>
      </table>

      <div v-if="currentRequest" ref="currentRequestTarget" class="absolute left-40 top-0 right-0 bottom-0 bg-neutral-800 border border-neutral-700 flex flex-col">
        <InspectorTab
          :items="requestTabs"
        />
        <div class="grow w-full overflow-auto text-sm font-mono whitespace-pre-wrap bg-neutral-900 p-4" v-html="currentRequest.response" />
      </div>
    </div>
  </div>
</template>
