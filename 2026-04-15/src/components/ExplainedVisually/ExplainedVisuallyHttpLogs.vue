<script lang="ts" setup>
import type { ExplainedVisuallyClickValue, ExplainedVisuallyHttpLog } from './types'
import VClick from '@slidev/client/builtin/VClick.ts'
import ExplainedVisuallyBox from './ExplainedVisuallyBox.vue'

const props = withDefaults(defineProps<{
  click?: ExplainedVisuallyClickValue
  items: ExplainedVisuallyHttpLog[]
  title?: string
}>(), {
  title: 'HTTP Logs',
})

const emits = defineEmits<{
  select: [ExplainedVisuallyHttpLog]
}>()

function onSelect(log: ExplainedVisuallyHttpLog) {
  emits('select', log)
}
</script>

<template>
  <ExplainedVisuallyBox class="flex flex-col gap-2 p-2">
    <span class="text-sm text-neutral-500 font-semibold">
      {{ props.title }}
    </span>
    <div class="grow flex flex-col gap-1 rounded p-2">
      <VClick
        v-for="(log, index) in props.items"
        :key="index"
        :at="props.click"
      >
        <div
        class="group relative forward:delay-[--delay] cursor-pointer transition"
        :style="{ '--delay': `calc(${index} * 50ms)` }"
        >
          <div class="overflow-auto" v-html="log.request" />
          <button
            v-if="log.response"
            class="absolute right-0 top-1/2 -translate-y-1/2 rounded-md border border-neutral-200 bg-neutral-100 px-2 py-1 text-xs text-neutral-500 font-semibold opacity-0 group-hover:opacity-100"
            @click="onSelect(log)"
          >
            View response
          </button>
        </div>
      </VClick>
    </div>
  </ExplainedVisuallyBox>
</template>
