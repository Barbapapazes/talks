<script lang="ts" setup>
import ViteExplainedVisuallyModal from './ViteExplainedVisuallyModal.vue'

const httpResponse = defineModel<{
  request: string
  response: {
    file: string | undefined
    code: string
  }
  file: string | undefined
} | null>({ required: true })
</script>

<template>
  <ViteExplainedVisuallyModal
    :open="httpResponse !== null"
    @update:open="() => httpResponse = null"
  >
    <div class="flex flex-col">
      <div class="p-2 text-sm text-neutral-500 font-semibold">
        HTTP Request
      </div>
      <div class="px-2 overflow-auto" v-html="httpResponse!.request" />
    </div>

    <div class="min-h-0 grid grid-cols-2 auto-rows-fr gap-4">
      <div class="min-h-0 flex flex-col">
        <div class="p-2 text-sm text-neutral-500 font-semibold">
          HTTP Response
        </div>
        <div class="flex-1 min-h-0 px-2 overflow-auto" v-html="httpResponse!.response.code" />
      </div>

      <div class="min-h-0 flex flex-col">
        <div class="p-2 text-sm text-neutral-500 font-semibold">
          File: {{ httpResponse!.response.file }}
        </div>
        <div class="flex-1 min-h-0 px-2 overflow-auto" v-html="httpResponse!.file" />
      </div>
    </div>
  </ViteExplainedVisuallyModal>
</template>
