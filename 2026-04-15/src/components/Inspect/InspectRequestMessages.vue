<script lang="ts" setup>
import type { WebSocketMessage } from '../../types/network-tab'
import { computed, defineComponent, markRaw } from 'vue'

const props = defineProps<{
  messages: WebSocketMessage[]
}>()

const ROW_ANIMATION_LIMIT = 40

const shouldAnimateRows = computed(() => props.messages.length <= ROW_ANIMATION_LIMIT)

const normalizedMessages = computed(() => props.messages.map((message, index) => ({
  ...message,
  delay: shouldAnimateRows.value ? `calc(${index} * 30ms)` : 0,
})))

function icon(direction: WebSocketMessage['direction']) {
  return direction === 'sent'
    ? 'i-lucide-arrow-up-right'
    : 'i-lucide-arrow-down-left'
}

function badgeClass(direction: WebSocketMessage['direction']) {
  return direction === 'sent'
    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
    : 'border-sky-500/40 bg-sky-500/10 text-sky-200'
}

function label(direction: WebSocketMessage['direction']) {
  return direction === 'sent' ? 'Sent' : 'Received'
}

function payloadLength(payload: string) {
  return `${payload.length} B`
}
</script>

<template>
  <div class="h-full overflow-auto text-sm">
    <table class="w-full text-left">
      <thead class="sticky top-0 z-10 bg-neutral-900">
        <tr class="border-y border-neutral-700 text-xs text-neutral-500">
          <th class="px-3 py-2 font-normal">
            Direction
          </th>
          <th class="px-3 py-2 font-normal">
            Message
          </th>
          <th class="px-3 py-2 text-right font-normal">
            Length
          </th>
          <th class="px-3 py-2 text-right font-normal">
            Time
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(message, index) in normalizedMessages"
          :key="message.id"
          class="border-b border-neutral-800 align-top last:border-b-0"
          :class="index % 2 ? 'bg-neutral-900' : 'bg-neutral-950/60'"
        >
          <td class="px-3 py-3 whitespace-nowrap">
            <div
              class="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-medium"
              :class="badgeClass(message.direction)"
            >
              <span class="size-3.5" :class="icon(message.direction)" />
              {{ label(message.direction) }}
            </div>
          </td>

          <td class="px-3 py-3">
            <pre class="font-mono whitespace-pre-wrap break-words leading-5 text-neutral-100">{{ message.payload }}</pre>
          </td>

          <td class="px-3 py-3 text-right font-mono text-xs text-neutral-400 whitespace-nowrap">
            {{ payloadLength(message.payload) }}
          </td>

          <td class="px-3 py-3 text-right font-mono text-xs text-neutral-400 whitespace-nowrap">
            {{ message.time ?? '—' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
