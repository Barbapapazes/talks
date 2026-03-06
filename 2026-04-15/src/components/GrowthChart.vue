<script lang="ts" setup>
import { VisArea, VisXYContainer } from '@unovis/vue'
import { rspack, vite, webpack } from 'virtual:growth-chart'

type DataRecord = [string, number]

const x = (d: DataRecord, i: number) => i
const y = (d: DataRecord) => d[1]
</script>

<template>
  <div class="absolute z-10 top-8 bottom-0 inset-x-0">
    <VisXYContainer class="w-full h-full">
      <VisArea
        v-if="$clicks >= 1"
        :data="vite"
        :x="x"
        :y="y"
        :opacity="0.3"
        :line="true"
        color="#A156FE"
        line-color="#A156FE"
      />
      <VisArea
        v-if="$clicks >= 2"
        :data="webpack"
        :x="x"
        :y="y"
        :opacity="0.3"
        :line="true"
        color="#8ED6FB"
        line-color="#8ED6FB"
      />
      <VisArea
        v-if="$clicks >= 3"
        :data="rspack"
        :x="x"
        :y="y"
        :opacity="0.3"
        :line="true"
        color="#FA3A1F"
        line-color="#FA3A1F"
      />
    </VisXYContainer>
  </div>
</template>
