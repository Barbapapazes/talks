<script setup lang="ts">
import type { RpcExchange } from '../../types/inspect'
import { computed, ref, watch } from 'vue'
import Inspect from './Inspect.vue'
import InspectJson from './InspectJson.vue'
import InspectTabs from './InspectTabs.vue'

const props = defineProps<{
  exchanges: RpcExchange[]
  selectedId?: string
}>()

const selected = ref('')
const tab = ref('Request')
const exchange = computed(() => props.exchanges.find(item => item.id === selected.value))
const payload = computed(() => tab.value === 'Response' ? exchange.value?.response : exchange.value?.request)
const note = computed(() => tab.value === 'Response' ? exchange.value?.responseNote : exchange.value?.requestNote)

watch([() => props.exchanges, () => props.selectedId], () => {
  selected.value = props.exchanges.find(item => item.id === props.selectedId)?.id ?? props.exchanges[0]?.id ?? ''
  tab.value = 'Request'
}, { immediate: true })

function selectExchange(id: string) {
  selected.value = id
  tab.value = 'Request'
}
</script>

<template>
  <Inspect class="rpc-inspector" @click.stop>
    <template #header>
      <div class="rpc-heading">
        <span>MCP Inspector</span>
        <span class="rpc-protocol">JSON-RPC 2.0 · simulated exchange</span>
      </div>
    </template>
    <div class="rpc-layout">
      <nav class="rpc-calls" aria-label="MCP calls">
        <div class="rpc-calls-label">
          Method
        </div>
        <button
          v-for="item in exchanges" :key="item.id" type="button"
          class="rpc-call" :class="{ 'rpc-selected': item.id === selected }"
          :aria-pressed="item.id === selected" @click="selectExchange(item.id)"
        >
          {{ item.method }}
        </button>
      </nav>
      <section v-if="exchange" class="rpc-detail" :aria-label="exchange.method">
        <InspectTabs
          :items="[
            { name: 'Request', active: tab === 'Request' },
            { name: 'Response', active: tab === 'Response', disabled: !exchange.response },
          ]"
          @select="tab = $event"
        />
        <div class="rpc-direction">
          {{ tab === 'Request' ? 'Client → server' : 'Server → client' }}
          <span v-if="exchange.request.id !== undefined">id: {{ exchange.request.id }}</span>
        </div>
        <div :key="`${selected}-${tab}`" class="rpc-payload">
          <InspectJson v-if="payload" :value="payload" :highlight-fields="exchange.highlightFields" />
        </div>
        <div v-if="note" class="rpc-note">
          {{ note }}
        </div>
      </section>
      <div v-else class="rpc-empty">
        No calls to inspect.
      </div>
    </div>
  </Inspect>
</template>

<style scoped>
.rpc-inspector { overflow: hidden; }
.rpc-heading { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; border-bottom: 1px solid #404040; font-size: 15px; font-weight: 600; }
.rpc-protocol { color: #a3a3a3; font-size: 12px; font-weight: 400; }
.rpc-layout { display: flex; height: 100%; min-height: 0; }
.rpc-calls { flex: 0 0 190px; border-right: 1px solid #404040; background: #171717; overflow: auto; }
.rpc-calls-label { padding: 10px 14px; color: #a3a3a3; font-size: 12px; }
.rpc-call { display: block; width: 100%; padding: 12px 14px; text-align: left; font-family: monospace; font-size: 15px; white-space: nowrap; border-left: 3px solid transparent; }
.rpc-call:hover { background: #262626; }
.rpc-call.rpc-selected { background: #3b2160; border-left-color: #a78bfa; color: #ede9fe; }
.rpc-detail { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rpc-direction { display: flex; justify-content: space-between; padding: 5px 16px; color: #a3a3a3; font-size: 12px; border-bottom: 1px solid #303030; }
.rpc-payload { flex: 1; min-height: 0; overflow: auto; }
.rpc-note { padding: 8px 16px; border-top: 1px solid #404040; color: #ddd6fe; font-size: 13px; line-height: 1.4; }
.rpc-empty { padding: 16px; color: #a3a3a3; }
</style>
