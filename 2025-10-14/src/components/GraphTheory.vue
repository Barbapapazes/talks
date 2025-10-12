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
    to: ['c'],
  },
  {
    name: 'c',
    display: 'C',
    color: '#7c3aed',
    clicks: 3,
  },
  {
    name: 'd',
    display: 'D',
    color: '#16a34a',
    clicks: 4,
    to: ['a', 'b'],
  },
  {
    name: 'e',
    display: 'E',
    color: '#f97316',
    clicks: 4,
    to: ['b'],
  },
  {
    name: 'f',
    display: 'F',
    color: '#3b82f6',
    clicks: 4,
    to: ['c', 'e'],
  },
]
</script>

<template>
  <SlidevGraph
    id="graph-theory"
    :clicks="0"
    :items="items"
  />
</template>
