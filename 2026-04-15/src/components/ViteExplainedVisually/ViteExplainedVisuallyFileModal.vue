<script lang="ts" setup>
const file = defineModel<{
  file: string
  code: string
} | null>({ required: true })
</script>

<template>
  <Modal
    :open="file !== null"
    :title="file ? `File ${file.file}` : undefined"
    @update:open="() => file = null"
  >
    <div v-if="file" class="min-h-0 flex-1 overflow-auto p-4" v-html="file.code" />
  </Modal>
</template>
