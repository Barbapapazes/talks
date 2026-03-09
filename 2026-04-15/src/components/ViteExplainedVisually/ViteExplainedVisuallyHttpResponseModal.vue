<script lang="ts" setup>
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
  <Modal
    :open="httpResponse !== null"
    title="HTTP Request / Response"
    @update:open="() => httpResponse = null"
  >
    <div v-if="httpResponse" class="min-h-0 flex flex-1 flex-col gap-4 p-4">
      <div class="flex flex-col rounded-md border border-neutral-200/80 dark:border-neutral-700/80">
        <div class="border-b border-neutral-200/80 p-2 text-sm text-neutral-500 font-semibold dark:border-neutral-700/80">
          HTTP Request
        </div>
        <div class="px-2 py-2 overflow-auto" v-html="httpResponse.request" />
      </div>

      <div class="min-h-0 grid flex-1 grid-cols-2 auto-rows-fr gap-4">
        <div class="min-h-0 flex flex-col rounded-md border border-neutral-200/80 dark:border-neutral-700/80">
          <div class="border-b border-neutral-200/80 p-2 text-sm text-neutral-500 font-semibold dark:border-neutral-700/80">
            HTTP Response
          </div>
          <div class="min-h-0 flex-1 overflow-auto px-2 py-2" v-html="httpResponse.response.code" />
        </div>

        <div class="min-h-0 flex flex-col rounded-md border border-neutral-200/80 dark:border-neutral-700/80">
          <div class="border-b border-neutral-200/80 p-2 text-sm text-neutral-500 font-semibold dark:border-neutral-700/80">
            Original File: {{ httpResponse.response.file }}
          </div>
          <div class="min-h-0 flex-1 overflow-auto px-2 py-2" v-html="httpResponse.file" />
        </div>
      </div>
    </div>
  </Modal>
</template>
