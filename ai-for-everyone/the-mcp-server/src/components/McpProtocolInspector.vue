<script setup lang="ts">
import InspectRpc from '../../../../theme/components/Inspect/InspectRpc.vue'
import { mcpExchanges } from '../data/mcp-exchanges'

defineProps<{
  kind: keyof typeof mcpExchanges
}>()

const mainCalls = { tools: 'tools/call', resources: 'resources/read', prompts: 'prompts/get' }
</script>

<template>
  <InspectRpc :exchanges="mcpExchanges[kind]" :selected-id="mainCalls[kind]" />
</template>
