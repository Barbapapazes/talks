<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InspectFilters from './InspectFilters.vue'
import InspectTabs from './InspectTabs.vue'
import ConsoleTab from './Tabs/ConsoleTab.vue'
import NetworkTab from './Tabs/NetworkTab.vue'
import type { ConsoleEntry } from '../../types/console-tab'
import type { Request } from '../../types/network-tab'

type InspectTab = 'Console' | 'Network'

interface ConsoleOptions {
  entries: ConsoleEntry[]
}

interface NetworkOptions {
  requests: Request[]
  showDetails?: boolean
  selectedRequestId?: number | null
  selectedRequestTab?: 'Headers' | 'Response' | 'Messages' | null
}

type ConsoleInput = ConsoleEntry[] | ConsoleOptions
type NetworkInput = Request[] | NetworkOptions

const props = defineProps<{
  activeTab?: InspectTab
  console?: ConsoleInput
  network?: NetworkInput
}>()

const consoleData = computed<ConsoleOptions | null>(() => {
  if (!props.console)
    return null

  if (Array.isArray(props.console)) {
    return {
      entries: props.console,
    }
  }

  return props.console
})

const networkData = computed<NetworkOptions | null>(() => {
  if (!props.network)
    return null

  if (Array.isArray(props.network)) {
    return {
      requests: props.network,
    }
  }

  return props.network
})

const availableTabs = computed<InspectTab[]>(() => {
  const tabs: InspectTab[] = []

  if (consoleData.value)
    tabs.push('Console')

  if (networkData.value)
    tabs.push('Network')

  return tabs
})

const currentTab = ref<InspectTab>('Network')

watch(
  [availableTabs, () => props.activeTab],
  ([tabs, requestedTab]) => {
    if (!tabs.length)
      return

    if (requestedTab && tabs.includes(requestedTab)) {
      currentTab.value = requestedTab
      return
    }

    if (!tabs.includes(currentTab.value))
      currentTab.value = tabs[0]
  },
  { immediate: true },
)

const shouldShowFilters = computed(() => currentTab.value === 'Network' && Boolean(networkData.value))

function onSelectTab(tab: string) {
  if (availableTabs.value.includes(tab as InspectTab))
    currentTab.value = tab as InspectTab
}
</script>

<template>
  <div class="flex min-h-0 flex-col border border-neutral-700 bg-neutral-900 text-white">
    <InspectTabs
      :active-tab="currentTab"
      :enabled-tabs="availableTabs"
      @select="onSelectTab"
    />

    <InspectFilters v-if="shouldShowFilters" />

    <div class="relative min-h-0 grow bg-neutral-900 shiki-dark overflow-scroll">
      <ConsoleTab
        v-if="currentTab === 'Console' && consoleData"
        :entries="consoleData.entries"
      />

      <NetworkTab
        v-else-if="currentTab === 'Network' && networkData"
        :requests="networkData.requests"
        :show-details="networkData.showDetails"
        :selected-request-id="networkData.selectedRequestId"
        :selected-request-tab="networkData.selectedRequestTab"
      />
    </div>
  </div>
</template>
