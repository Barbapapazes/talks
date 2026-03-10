<script lang="ts" setup>
import { computed } from 'vue'
import Tabs from './Internal/Tabs.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  enabledTabs?: string[]
}>(), {
  modelValue: 'Response',
  enabledTabs: () => ['Headers', 'Response'],
})

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

const availableTabs = [
  'Headers',
  'Payload',
  'Preview',
  'Response',
  'Messages',
  'Initiator',
  'Timing',
  'Cookies',
]

const tabs = computed(() => {
  const enabledTabs = new Set(props.enabledTabs)

  return availableTabs.map(name => ({
    name,
    active: name === props.modelValue,
    disabled: !enabledTabs.has(name),
  }))
})

function onSelect(name: string) {
  const enabledTabs = new Set(props.enabledTabs)

  if (!enabledTabs.has(name))
    return

  emits('update:modelValue', name)
}
</script>

<template>
  <Tabs :items="tabs" @select="onSelect" />
</template>
