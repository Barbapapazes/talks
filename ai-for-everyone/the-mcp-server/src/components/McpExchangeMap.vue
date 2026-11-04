<script setup lang="ts">
import { useId } from 'vue'

withDefaults(defineProps<{
  withMcp?: boolean
  focus?: 'model' | 'server' | 'api' | 'all'
}>(), { focus: 'all' })

const arrowId = useId()
</script>

<template>
  <div class="exchange-map not-content" :class="`focus-${focus}`" role="img" :aria-label="withMcp ? 'The user talks to the application. The application exchanges messages with the model and calls the MCP server. The server calls the GitHub API.' : 'The user talks to the application. The application exchanges messages with the model and calls the GitHub API directly.'">
    <svg viewBox="0 0 880 140" aria-hidden="true">
      <defs>
        <marker :id="arrowId" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 6 3 L 0 6" fill="currentColor" stroke="none" />
        </marker>
      </defs>
      <path class="user-link" d="M 163 101 H 227" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
      <path class="model-link" d="M 310 51 V 73" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
      <template v-if="withMcp">
        <path class="server-link" d="M 393 101 H 487" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
        <path class="api-link" d="M 653 101 H 717" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
      </template>
      <path v-else class="api-link" d="M 393 101 H 717" :marker-start="`url(#${arrowId})`" :marker-end="`url(#${arrowId})`" />
    </svg>
    <div class="map-node user-node">
      <span class="i-lucide-user size-3.5" aria-hidden="true" />
      User
    </div>
    <div class="map-node model-node">
      <span class="i-lucide-sparkles size-3.5" aria-hidden="true" />
      Model
    </div>
    <div class="map-node application-node">
      <span class="i-lucide-messages-square size-4" aria-hidden="true" />
      Application
    </div>
    <div v-if="withMcp" class="map-node server-node">
      <span class="i-lucide-server size-4" aria-hidden="true" />
      MCP server
    </div>
    <div class="map-node api-node">
      <span class="i-simple-icons-github size-4" aria-hidden="true" />
      GitHub API
    </div>
    <span v-if="withMcp" class="link-label mcp-label">MCP</span>
    <span class="link-label http-label" :class="{ direct: !withMcp }">HTTP</span>
  </div>
</template>

<style scoped>
.exchange-map { position: relative; width: 880px; height: 140px; color: #a3a3a3; }
.exchange-map svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.5; }
.map-node { position: absolute; left: 25px; width: 160px; height: 50px; display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid; border-radius: 6px; font-size: 15px; font-weight: 600; transition: border-color 200ms, background-color 200ms; --at-apply: border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300; }
.user-node { left: 0; top: 76px; }
.model-node { left: 230px; top: 0; }
.application-node { left: 230px; top: 76px; }
.server-node { left: 490px; top: 76px; }
.api-node { left: 720px; top: 76px; }
.link-label { position: absolute; top: 77px; font-size: 12px; }
.mcp-label { left: 425px; }
.http-label { left: 665px; }
.http-label.direct { left: 535px; }
.focus-model .model-node, .focus-model .application-node,
.focus-server .application-node, .focus-server .server-node,
.focus-api .api-node, .focus-api .server-node { --at-apply: border-primary/40 bg-primary/5 text-primary; }
.focus-api:not(:has(.server-node)) .application-node { --at-apply: border-primary/40 bg-primary/5 text-primary; }
.focus-model .model-link, .focus-server .server-link, .focus-api .api-link { color: var(--slidev-theme-primary); }
</style>
