<script lang="ts" setup>
import type { DataItem } from 'slidev-addon-graph'

const items: DataItem[] = [
  {
    name: 'quantity',
    display: 'Quantity',
    color: '#dc2626',
    clicks: 1,
    to: ['total'],
  },
  {
    name: 'price',
    display: 'Price',
    color: '#2563eb',
    clicks: 1,
    to: ['total'],

  },
  {
    name: 'total',
    display: 'Total',
    color: '#7c3aed',
    clicks: 2,
    to: ['effect'],
  },
  {
    name: 'effect',
    display: 'Effect',
    color: '#16a34a',
    clicks: 3,
  },
]
</script>

<template>
  <SlidevGraph
    id="graph-and-reactivity"
    :clicks="0"
    :items="items"
  />
</template>
