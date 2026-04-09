<script lang="ts" setup>
import type { ConsoleEntry } from '../../../types/console-tab'

interface ConsoleTabProps {
  entries: ConsoleEntry[]
}

const props = defineProps<ConsoleTabProps>()

function icon(level: ConsoleEntry['level']) {
  switch (level) {
    case 'error':
      return 'i-lucide-circle-x'
    case 'warn':
      return 'i-lucide-triangle-alert'
    case 'info':
      return 'i-lucide-info'
    default:
      return 'i-lucide-terminal'
  }
}

function rowClass(level: ConsoleEntry['level']) {
  switch (level) {
    case 'error':
      return 'text-rose-300'
    case 'warn':
      return 'text-amber-200'
    case 'info':
      return 'text-sky-200'
    default:
      return 'text-neutral-100'
  }
}
</script>

<template>
  <div class="h-full overflow-auto text-sm">
    <div
      v-for="entry in props.entries"
      :key="entry.id"
      class="border-b border-neutral-800 bg-neutral-950/60 last:border-b-0"
    >
      <div class="flex items-start gap-3 px-4 py-3 font-mono" :class="rowClass(entry.level)">
        <div class="mt-0.5 size-4 shrink-0" :class="icon(entry.level)" />

        <div class="min-w-0 flex-1">
          <div class="whitespace-pre-wrap break-words leading-5">
            {{ entry.message }}
          </div>

          <div v-if="entry.source || entry.details" class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-80">
            <span v-if="entry.source" class="underline">
              {{ entry.source }}
            </span>
            <span v-if="entry.details">
              {{ entry.details }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
