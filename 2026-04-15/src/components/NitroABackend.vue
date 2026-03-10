<script lang="ts" setup>
import ExplainedVisuallyBrowser from './ExplainedVisually/ExplainedVisuallyBrowser.vue'
import ExplainedVisuallyServer from './ExplainedVisually/ExplainedVisuallyServer.vue'
</script>

<template>
  <div class="flex flex-row items-center gap-4">
    <ExplainedVisuallyBrowser v-click="1" class="w-40" />
    <div class="flex flex-col justify-between gap-2 text-neutral-500">
      <div v-click="3" class="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
        Ask Page <div class="i-lucide-arrow-right" />
      </div>
      <div v-click="4" class="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
        <div class="i-lucide-arrow-left" /> Forward Response
      </div>
    </div>
    <ExplainedVisuallyServer v-click="2" class="w-40" />
    <div class="flex flex-col justify-between gap-2 text-neutral-500">
      <div v-click="5" class="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
        Forward Request <div class="i-lucide-arrow-right" />
      </div>
      <div v-click="7" class="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
        <div class="i-lucide-arrow-left" /> Send Response
      </div>
    </div>
    <ExplainedVisuallyServer v-click="6" logo-src="/nitro.svg" class="w-40" />
  </div>
</template>
