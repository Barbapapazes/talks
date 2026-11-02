<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DiagramPanel from '@theme/components/DiagramPanel.vue'
import { computed } from 'vue'

const props = defineProps<{
  transport: 'stdio' | 'http'
}>()

const { $clicks } = useSlideContext()
const hostedApp = computed(() => props.transport === 'http' && $clicks.value >= 1)
</script>

<template>
  <div class="server-connection not-content absolute inset-x-14 top-1/2 -translate-y-1/2" :class="{ remote: transport === 'http' }">
    <span v-if="transport === 'http'" v-click="1" class="absolute h-0 w-0" aria-hidden="true" />
    <div class="connection-diagram relative grid grid-cols-[260px_1fr_260px] items-center gap-6 px-6 pt-12 pb-6">
      <div class="computer-boundary absolute inset-0 rounded-xl border border-dashed border-neutral-300 transition-opacity duration-300 dark:border-neutral-700" :class="{ 'opacity-0': hostedApp }" />
      <div class="computer-label absolute left-6 top-3 flex items-center gap-2 text-sm text-neutral-500">
        <span :class="hostedApp ? 'i-lucide-cloud' : 'i-lucide-laptop'" class="size-4" aria-hidden="true" />
        {{ hostedApp ? 'Online application' : 'Your computer' }}
      </div>
      <div v-if="transport === 'http'" class="remote-boundary absolute inset-y-0 right-0 w-77 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
        <div class="absolute left-6 top-3 flex items-center gap-2 text-sm text-neutral-500">
          <span class="i-lucide-cloud size-4" aria-hidden="true" />
          Remote service
        </div>
      </div>

      <DiagramPanel class="connection-panel relative h-48 overflow-hidden">
        <div class="window-bar flex h-9 items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-3 dark:border-neutral-700 dark:bg-neutral-800">
          <span class="size-2 rounded-full bg-red-400" />
          <span class="size-2 rounded-full bg-amber-400" />
          <span class="size-2 rounded-full bg-green-400" />
          <span class="ml-3 text-xs text-neutral-500">{{ hostedApp ? 'ChatGPT' : 'Application' }}</span>
        </div>
        <div class="flex h-39 flex-col items-center justify-center gap-4">
          <span :class="hostedApp ? 'i-simple-icons-openai' : 'i-lucide-messages-square'" class="size-9 text-neutral-500" aria-hidden="true" />
          <div class="rounded-md border border-primary/30 bg-primary/10 px-7 py-2 text-lg text-primary font-medium">
            MCP client
          </div>
        </div>
      </DiagramPanel>

      <div class="relative flex flex-col items-center gap-3 text-center">
        <div class="text-sm text-neutral-500">
          MCP
        </div>
        <div class="flex w-full items-center text-primary" aria-hidden="true">
          <span class="i-lucide-chevron-left size-5 shrink-0 -mr-1" />
          <span class="h-px grow bg-current" />
          <span class="i-lucide-chevron-right size-5 shrink-0 -ml-1" />
        </div>
        <div class="whitespace-nowrap text-sm font-mono">
          {{ transport === 'stdio' ? 'stdin / stdout' : 'Streamable HTTP' }}
        </div>
      </div>

      <DiagramPanel class="connection-panel relative flex h-48 flex-col items-center justify-center gap-3">
        <span class="i-simple-icons-github size-10" aria-hidden="true" />
        <div class="text-lg font-semibold">
          GitHub MCP server
        </div>
        <div class="text-sm text-neutral-500">
          {{ transport === 'stdio' ? 'Child process' : 'Deployed endpoint' }}
        </div>
      </DiagramPanel>
    </div>

    <div class="grid grid-cols-[260px_1fr_260px] gap-6 px-6">
      <div class="col-start-3 flex flex-col items-center gap-2 pt-3 text-neutral-500">
        <span class="i-lucide-arrow-down size-5" aria-hidden="true" />
        <div class="flex items-center gap-2 text-sm">
          <span class="i-lucide-globe size-4" aria-hidden="true" />
          GitHub API
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.remote .computer-boundary {
  width: 308px;
}

.connection-panel {
  --at-apply: dark:border-neutral-700 dark:bg-neutral-900;
}
</style>
