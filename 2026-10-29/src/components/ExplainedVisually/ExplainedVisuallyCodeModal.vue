<script lang="ts" setup>
import type { ExplainedVisuallySelectedFile } from './types'

const file = defineModel<ExplainedVisuallySelectedFile | null>({ required: true })
</script>

<template>
  <Modal
    :open="file !== null"
    :title="file ? `File ${file.file}` : undefined"
    @update:open="() => file = null"
  >
    <div v-if="file" class="min-h-0 flex-1 text-xl overflow-auto p-4" v-html="file.code" />
  </Modal>
</template>
