<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core'

interface HookNodeData {
  label: string
  plugins: {
    name: string
    input: string
    output: string
  }[]
}

interface HookNodeProps extends NodeProps<HookNodeData> {
  selectedPlugin?: {
    name: string
    hook: string
  }
}
interface HookNodeEmits {
  pluginClick: [string, string]
}
const props = defineProps<HookNodeProps>()
const emits = defineEmits<HookNodeEmits>()

function onClick(pluginName: string) {
  emits('pluginClick', props.data.label, pluginName)
}

function isSelected(pluginName: string) {
  return props.selectedPlugin?.name === pluginName
    && props.selectedPlugin?.hook === props.data.label
}
</script>

<template>
  <div class="w-80 bg-neutral-50 border border-neutral-200 rounded-lg divide-y">
    <div class="py-1 px-2 text-xl font-semibold">
      {{ props.data.label }}
    </div>

    <div class="p-1">
      <div class="bg-neutral-100 rounded-b-md p-1">
        <div
          v-for="plugin in props.data.plugins"
          :key="plugin.name"
          class="relative"
          :class="{
            'bg-blue-100': isSelected(plugin.name),
            'hover:bg-neutral-200': !isSelected(plugin.name),
          }"
        >
          {{ plugin.name }}

          <button class="absolute inset-0" @click="onClick(plugin.name)" />
          <div />
        </div>
      </div>
    </div>
  </div>
</template>
