<script lang="ts" setup>
import ViteExplainedVisuallyModal from './ViteExplainedVisuallyModal.vue'

const file = defineModel<{
  file: string
  code: string
} | null>({ required: true })
</script>

<template>
  <ViteExplainedVisuallyModal
    :open="file !== null"
    @update:open="() => file = null"
  >
    <div class="h-full min-h-0 flex flex-col">
      <div class="p-2 text-sm text-neutral-500 font-semibold">
        File {{ file?.file }}
      </div>
      <div class="px-2 overflow-auto" v-html="file!.code" />
    </div>
  </ViteExplainedVisuallyModal>
</template>
