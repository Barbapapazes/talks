<script lang="ts" setup>
import { computed } from 'vue'
import Tabs from './Internal/Tabs.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: 'Response',
})

const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()

const availableTabs = [
  'Headers',
  'Payload',
  'Preview',
  'Response',
  'Initiator',
  'Timing',
  'Cookies',
]

const enabledTabs = new Set(['Headers', 'Response'])

const tabs = computed(() => availableTabs.map(name => ({
  name,
  active: name === props.modelValue,
  disabled: !enabledTabs.has(name),
})))

function onSelect(name: string) {
  if (!enabledTabs.has(name))
    return

  emits('update:modelValue', name)
}
</script>

<template>
  <Tabs :items="tabs" @select="onSelect" />
</template>
