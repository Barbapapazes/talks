<script setup lang="ts">
import Card from '@theme/components/Card.vue'
import CardDescription from '@theme/components/CardDescription.vue'
import CardTitle from '@theme/components/CardTitle.vue'
import { protocolVersion } from '../data/mcp-protocol'

const capabilities = [
  { name: 'Tools', icon: 'i-lucide-wrench', description: 'Expose functions the model can request the application to call.', status: 'Core' },
  { name: 'Resources', icon: 'i-lucide-file-text', description: 'Expose content the application can add to the model context.', status: 'Core' },
  { name: 'Prompts', icon: 'i-lucide-message-square', description: 'Provide reusable messages with arguments supplied by the user.', status: 'Core' },
  { name: 'Completions', icon: 'i-lucide-list-filter', description: 'Suggest values for prompt arguments and resource template parameters.', status: 'Core' },
  { name: 'Elicitation', icon: 'i-lucide-message-circle-question-mark', description: 'Ask the user for additional information through the client.', status: 'Core · client' },
  { name: 'Authorization extensions', icon: 'i-lucide-shield-check', description: 'Support machine-to-machine and enterprise-managed access.', status: 'Extension' },
  { name: 'MCP Apps', icon: 'i-lucide-panels-top-left', description: 'Display interactive interfaces alongside tool results.', status: 'Extension' },
  { name: 'Tasks', icon: 'i-lucide-clock', description: 'Track long-running work and retrieve its result later.', status: 'Extension' },
  { name: 'Skills over MCP', icon: 'i-lucide-book-open', description: 'Discover and load reusable workflow instructions.', status: 'Extension' },
]
</script>

<template>
  <div class="capabilities-grid absolute inset-x-8 top-8 bottom-12 grid grid-cols-3 content-center gap-3" :aria-label="`MCP ${protocolVersion} capabilities`">
    <Card
      v-for="capability in capabilities"
      :key="capability.name"
      class="[&_.surface]:p-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <CardTitle :icon="capability.icon" :title="capability.name" />
        <span
          class="rounded-full px-2 py-0.5 text-[10px] font-medium"
          :class="capability.status.startsWith('Core') ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-500'"
        >{{ capability.status }}</span>
      </div>
      <CardDescription :description="capability.description" class="mt-2 leading-5" />
    </Card>
  </div>
</template>
