<script lang="ts" setup>
import type { DataItem } from 'slidev-addon-graph'

const items: DataItem[] = [
  {
    name: 'a',
    display: 'A',
    color: '#dc2626',
    clicks: 1,
    to: ['b'],
  },
  {
    name: 'b',
    display: 'B',
    color: '#2563eb',
    clicks: 2,
    to: ['c', 'a'],
  },
  {
    name: 'c',
    display: 'C',
    color: '#7c3aed',
    clicks: 3,
    to: ['b'],
  },
]
</script>

<template>
  <SlidevGraph
    id="double-linked-list"
    :clicks="0"
    :items="items"
  />
</template>
