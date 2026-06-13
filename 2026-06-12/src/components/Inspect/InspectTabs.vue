<script lang="ts" setup>
import { computed } from 'vue'
import Tabs from './Internal/Tabs.vue'

type InspectorTab = 'Console' | 'Network'

const props = withDefaults(defineProps<{
  activeTab?: InspectorTab
  enabledTabs?: InspectorTab[]
}>(), {
  activeTab: 'Network',
  enabledTabs: () => ['Network'],
})

const emits = defineEmits<{
  select: [tab: string]
}>()

function isEnabled(tab: InspectorTab) {
  return props.enabledTabs.includes(tab)
}

const tabs = computed(() => [
  'Elements',
  {
    name: 'Console',
    active: props.activeTab === 'Console',
    disabled: !isEnabled('Console'),
  },
  'Sources',
  {
    name: 'Network',
    active: props.activeTab === 'Network',
    disabled: !isEnabled('Network'),
  },
  'Performance',
  'Memory',
  'Application',
  'Security',
])
</script>

<template>
  <Tabs :items="tabs" @select="emits('select', $event)" />
</template>
