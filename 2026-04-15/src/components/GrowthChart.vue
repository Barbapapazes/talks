<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { VisArea, VisXYContainer } from '@unovis/vue'
import { series as chartSeries } from 'virtual:growth-chart'

const { $clicks } = useSlideContext()

type DataRecord = [string, number]
type ChartSeries = {
  id: string
  packageName: string
  data: DataRecord[]
}

type SeriesMeta = {
  label: string
  color: string
  iconClass?: string
  iconSrc?: string
}

const x = (d: DataRecord, i: number) => i
const y = (d: DataRecord) => d[1]

const palette = ['#A156FE', '#8ED6FB', '#FA3A1F', '#2D9D78', '#F882AF']

const seriesMeta: Record<string, SeriesMeta> = {
   webpack: {
    label: 'Webpack',
    color: '#8ED6FB',
    iconClass: 'i-devicon-webpack',
  },
  vite: {
    label: 'Vite',
    color: '#A156FE',
    iconSrc: 'https://raw.githubusercontent.com/voidzero-dev/community-design-resources/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vite/vite-icon-color-dark.svg',
  },
  'rspack-core': {
    label: 'Rspack',
    color: '#FA3A1F',
    iconSrc: 'https://raw.githubusercontent.com/rstackjs/rstack-design-resources/e25f6d56e04bc6ff82dcee6cd1e4c31711b22365/rspack/rspack-logo.svg',
  },
  snowpack: {
    label: 'Snowpack',
    color: '#2D9D78',
  },
  'swc-core': {
    label: 'SWC',
    color: '#F882AF',
  },
}

function formatLabel(packageName: string) {
  return packageName
    .split(/[-/]/g)
    .map(part => part ? part[0].toUpperCase() + part.slice(1) : part)
    .join(' ')
}

const series = (chartSeries as ChartSeries[]).map((dataset, index) => ({
  ...dataset,
  label: seriesMeta[dataset.id]?.label ?? formatLabel(dataset.packageName),
  color: seriesMeta[dataset.id]?.color ?? palette[index % palette.length],
  iconClass: seriesMeta[dataset.id]?.iconClass,
  iconSrc: seriesMeta[dataset.id]?.iconSrc,
}))
</script>

<template>
  <div class="absolute z-10 top-14 left-14 flex flex-col gap-1">
    <div
      v-for="dataset in series"
      :key="dataset.id"
      v-click
      class="flex flex-row items-center gap-2 font-light"
      :style="{ color: dataset.color }"
    >
      <img
        v-if="dataset.iconSrc"
        class="size-5"
        :src="dataset.iconSrc"
        :alt="`${dataset.label} logo`"
      >
      <div
        v-else-if="dataset.iconClass"
        :class="[dataset.iconClass, 'size-5']"
      />
      <div
        v-else
        class="size-3 rounded-full"
        :style="{ backgroundColor: dataset.color }"
      />
      {{ dataset.label }}
    </div>
  </div>

  <div class="absolute z-10 top-8 bottom-0 inset-x-0">
    <VisXYContainer class="w-full h-full">
      <template
        v-for="(dataset, index) in series"
        :key="dataset.id"
      >
      <VisArea
        v-if="$clicks >= index + 1"
        :data="dataset.data"
        :x="x"
        :y="y"
        :opacity="0.3"
        :line="true"
        :color="dataset.color"
        :line-color="dataset.color"
      />
      </template>
    </VisXYContainer>
  </div>
</template>
