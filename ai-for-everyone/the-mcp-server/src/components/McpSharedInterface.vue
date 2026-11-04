<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import DiagramPanel from '@theme/components/DiagramPanel.vue'

const { $clicks } = useSlideContext()
const applications = [
  { name: 'ChatGPT', icon: 'i-simple-icons-openai' },
  { name: 'Claude', icon: 'i-simple-icons-anthropic' },
  { name: 'Cursor', icon: 'i-simple-icons-cursor' },
]
</script>

<template>
  <div class="shared-interface not-content">
    <span v-click="1" class="absolute h-0 w-0" aria-hidden="true" />
    <template v-if="$clicks === 0">
      <div
        v-for="(app, index) in applications" :key="app.name"
        class="ownership-boundary application-ownership"
        :style="{ top: `${index * 110 + 5}px` }"
        role="group"
        :aria-label="`${app.name}-owned integration code`"
      />
    </template>
    <div v-else class="ownership-boundary github-ownership" role="group" aria-label="GitHub-owned MCP server and API" />
    <svg class="connections" viewBox="0 0 840 330" aria-hidden="true">
      <g v-for="(_, index) in applications" :key="index">
        <path :d="`M 190 ${55 + index * 110} H 325`" :class="{ protocol: $clicks >= 1 }" />
        <path v-if="$clicks === 0" :d="`M 575 ${55 + index * 110} H 610 V 165 H 655`" />
      </g>
      <path v-if="$clicks >= 1" d="M 575 165 H 655" />
    </svg>
    <DiagramPanel
      v-for="(app, index) in applications" :key="app.name"
      class="application-node"
      :style="{ top: `${index * 110 + 20}px` }"
    >
      <span :class="app.icon" class="size-7" aria-hidden="true" />
      <span>{{ app.name }}</span>
    </DiagramPanel>
    <template v-if="$clicks === 0">
      <DiagramPanel
        v-for="(app, index) in applications" :key="app.name"
        class="adapter-node"
        :style="{ top: `${index * 110 + 20}px` }"
      >
        <span class="text-sm font-mono">create_issue → HTTP</span>
      </DiagramPanel>
    </template>
    <div v-else class="mcp-node">
      <span class="i-lucide-server size-8 text-primary" aria-hidden="true" />
      <span class="text-lg font-semibold">GitHub MCP server</span>
      <span class="text-sm text-neutral-500">Discover tools · call tools</span>
      <span class="mt-3 text-sm font-mono">create_issue → HTTP</span>
    </div>
    <DiagramPanel class="github-node">
      <span class="i-simple-icons-github size-9" aria-hidden="true" />
      <span class="text-lg font-semibold">GitHub API</span>
      <span class="text-xs font-mono text-neutral-500">POST /repos/…/issues</span>
    </DiagramPanel>
  </div>
</template>

<style scoped>
.shared-interface { position: absolute; top: 50%; left: 50%; width: 840px; height: 330px; transform: translate(-50%, -50%); }
.ownership-boundary { position: absolute; pointer-events: none; border: 1px dashed; border-radius: 12px; --at-apply: border-neutral-300 dark:border-neutral-700; }
.application-ownership { left: -18px; width: 468px; height: 100px; }
.github-ownership { left: 305px; top: 0; width: 555px; height: 330px; }
.connections { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: #a3a3a3; stroke-width: 1.5; }
.connections .protocol { stroke: var(--slidev-theme-primary); stroke-width: 2; }
.application-node, .adapter-node { position: absolute; height: 70px; display: flex; align-items: center; justify-content: center; gap: 14px; }
.application-node { left: 0; width: 190px; font-size: 20px; font-weight: 600; }
.adapter-node { left: 325px; width: 250px; }
.mcp-node { position: absolute; left: 325px; top: 20px; width: 250px; height: 290px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border: 1px solid; border-radius: 6px; --at-apply: border-primary/40 bg-primary/5; }
.github-node { position: absolute; left: 655px; top: 90px; width: 185px; height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
.application-node, .adapter-node, .github-node { --at-apply: dark:border-neutral-700 dark:bg-neutral-900; }
</style>
