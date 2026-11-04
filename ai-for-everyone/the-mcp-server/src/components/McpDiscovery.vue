<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { ref, useTemplateRef, watch } from 'vue'
import InspectJson from '../../../../theme/components/Inspect/InspectJson.vue'
import MessageLog from '../../../../theme/components/MessageLog.vue'
import Modal from '../../../../theme/components/Modal.vue'
import { discoveryMessages } from '../data/mcp-discovery'
import { protocolVersion } from '../data/mcp-protocol'

const { $clicks } = useSlideContext()
const isSlideActive = useIsSlideActive()
const selected = ref<typeof discoveryMessages[number] | null>(null)
const logTarget = useTemplateRef<HTMLDivElement>('logTarget')

watch([$clicks, isSlideActive], () => selected.value = null)
</script>

<template>
  <div ref="logTarget" tabindex="-1" class="not-content absolute left-1/2 top-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 outline-none">
    <MessageLog
      :title="`Server discovery · MCP ${protocolVersion}`"
      :items="discoveryMessages"
      :step="$clicks"
      class="min-h-47"
      @select="selected = $event"
    >
      <template #default="{ item }">
        <div class="flex items-center gap-5 py-3">
          <span class="w-32 shrink-0 text-sm text-neutral-500 dark:text-neutral-400">{{ item.direction }}</span>
          <span class="font-mono text-lg">{{ item.label }}</span>
        </div>
      </template>
    </MessageLog>

    <Modal
      :open="selected !== null"
      title="MCP message"
      @update:open="open => { if (!open) selected = null }"
      @close-auto-focus="event => { event.preventDefault(); logTarget?.focus() }"
      @click.stop
      @keydown="event => { if (event.key !== 'Escape') event.stopPropagation() }"
    >
      <div v-if="selected" class="min-h-0 flex flex-1 flex-col gap-4 p-4 text-xl">
        <div class="flex flex-col rounded-md border border-neutral-200/80 dark:border-neutral-700/80">
          <div class="border-b border-neutral-200/80 p-2 text-neutral-500 font-semibold dark:border-neutral-700/80">
            {{ selected.direction }}
          </div>
          <div class="overflow-auto px-2 py-2 font-mono text-xl">
            {{ selected.label }}
          </div>
        </div>

        <div class="min-h-0 flex flex-1 flex-col rounded-md border border-neutral-200/80 dark:border-neutral-700/80">
          <div class="border-b border-neutral-200/80 p-2 text-neutral-500 font-semibold dark:border-neutral-700/80">
            JSON-RPC payload
          </div>
          <div class="min-h-0 flex-1 overflow-auto px-2 py-2">
            <InspectJson :value="selected.payload" class="discovery-json" />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.discovery-json {
  margin: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  line-height: 1.4;
}
.discovery-json :deep(.json-key) { color: #005cc5; }
.discovery-json :deep(.json-string) { color: #032f62; }
.discovery-json :deep(.json-literal) { color: #005cc5; }
.discovery-json :deep(.json-punctuation) { color: #24292e; }
:global(.dark) .discovery-json :deep(.json-key) { color: #c4b5fd; }
:global(.dark) .discovery-json :deep(.json-string) { color: #a7f3d0; }
:global(.dark) .discovery-json :deep(.json-literal) { color: #fcd34d; }
:global(.dark) .discovery-json :deep(.json-punctuation) { color: #d4d4d4; }
</style>
