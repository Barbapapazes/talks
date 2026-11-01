<script lang="ts" setup>
import { computed } from 'vue'
import Tabs from '../../../../theme/components/Inspect/InspectTabs.vue'

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
  { name: 'Elements', disabled: true },
  {
    name: 'Console',
    active: props.activeTab === 'Console',
    disabled: !isEnabled('Console'),
  },
  { name: 'Sources', disabled: true },
  {
    name: 'Network',
    active: props.activeTab === 'Network',
    disabled: !isEnabled('Network'),
  },
  { name: 'Performance', disabled: true },
  { name: 'Memory', disabled: true },
  { name: 'Application', disabled: true },
  { name: 'Security', disabled: true },
])
</script>

<template>
  <Tabs :items="tabs" @select="emits('select', $event)" />
</template>
