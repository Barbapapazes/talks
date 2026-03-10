<script lang="ts" setup>
import ExplainedVisuallyBrowser from './ExplainedVisually/ExplainedVisuallyBrowser.vue'
import ExplainedVisuallyServer from './ExplainedVisually/ExplainedVisuallyServer.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <ExplainedVisuallyBrowser v-click="1" class="row-span-2 aspect-auto h-full w-auto" />
    <div class="my-8 flex flex-col justify-between text-neutral-500">
      <div v-click="3" class="flex flex-row items-center justify-center gap-2">
        Ask Page <div class="i-lucide-arrow-right" />
      </div>
      <div v-click="4" class="flex flex-row items-center justify-center gap-2">
        <div class="i-lucide-arrow-left" /> Send Page
      </div>
    </div>
    <ExplainedVisuallyServer v-click="2" logo-src="/laravel.svg" class="w-full h-full" />
    <div class="my-8 flex flex-col justify-between text-neutral-500">
      <div v-click="5" class="flex flex-row items-center justify-center gap-2">
        Ask Assets <div class="i-lucide-arrow-right" />
      </div>
      <div v-click="7" class="flex flex-row items-center justify-center gap-2">
        <div class="i-lucide-arrow-left" /> Send Assets
      </div>
    </div>
    <ExplainedVisuallyServer v-click="6" class="w-full h-full" />
  </div>
</template>
