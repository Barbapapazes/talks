<script lang="ts" setup>
import type { NodeProps } from '@vue-flow/core'
import ViteHookPills from '../../ViteHookPills.vue'

type HookName = 'resolveId' | 'load' | 'transform'

interface HookNodeData {
  label: string
  hook: {
    name: HookName
    args?: string
  }
  plugins: {
    name: string
    color: string
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
  emits('pluginClick', props.data.hook.name, pluginName)
}

function isSelected(pluginName: string) {
  return props.selectedPlugin?.name === pluginName
    && props.selectedPlugin?.hook === props.data.hook.name
}
</script>

<template>
  <div class="w-80 bg-neutral-50 border border-neutral-200 rounded-lg divide-y">
    <div class="flex justify-between items-center px-2 py-1">
      <span class="font-semibold">{{ props.data.label }}</span>

      <ViteHookPills
        size="sm"
        :hooks="[{ name: props.data.hook.name, args: props.data.hook.args }]"
      />
    </div>

    <div class="p-1">
      <div class="bg-neutral-100 rounded-b-md">
        <div
          v-for="plugin in props.data.plugins"
          :key="plugin.name"
          class="relative rounded-md p-1"
          :class="{
            'bg-[color-mix(in_srgb,_var(--plugin-color)_50%,_white)]': isSelected(plugin.name),
            'hover:bg-[color-mix(in_srgb,_var(--plugin-color)_25%,_white)]': !isSelected(plugin.name),
          }"
          :style="`--plugin-color: ${plugin.color}`"
        >
          {{ plugin.name }}

          <button class="absolute inset-0" @click="onClick(plugin.name)" />
          <div />
        </div>
      </div>
    </div>
  </div>
</template>
