<script lang="ts" setup>
import type { Request } from '../types/network-tab'
import Inspect from './Inspect.vue'

const requests: Request[] = [
  {
    id: 1,
    name: 'localhost',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'document',
    time: 5,
    size: '0.7 kB',
    waterfallStart: 0,
    waterfallDuration: 5,
  },
  {
    id: 2,
    name: 'client',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: '(index):4',
    time: 12,
    size: '185 kB',
    waterfallStart: 1,
    waterfallDuration: 12,
  },
  {
    id: 3,
    name: 'main.ts',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: '(index):13',
    time: 10,
    size: '0.5 kB',
    waterfallStart: 2,
    waterfallDuration: 10,
  },
  {
    id: 4,
    name: 'lodash-es.js?v=dcdebb30',
    method: 'GET',
    status: 200,
    protocol: 'http/1.1',
    type: 'script',
    initiator: 'main.ts:1',
    time: 9,
    size: '538 kB',
    waterfallStart: 4,
    waterfallDuration: 9,
  },
]
</script>

<template>
  <Inspect
    active-tab="Network"
    :animate="false"
    :network="{
      requests,
      selectedRequestId: 5,
    }"
  />
</template>
