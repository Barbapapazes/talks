<script lang="ts" setup>
import { useSlideContext } from '@slidev/client'
import { VisArea, VisXYContainer } from '@unovis/vue'
import { isString, rspack, vite, webpack } from 'virtual:growth-chart'

const { $clicks } = useSlideContext()

type DataRecord = [string, number]

const x = (d: DataRecord, i: number) => i
const y = (d: DataRecord) => d[1]
</script>

<template>
  <div class="absolute z-10 top-14 left-14">
    <div v-click class="flex flex-row items-center gap-2 text-[#A156FE] font-light">
      <img
        class="size-5"
        src="https://raw.githubusercontent.com/voidzero-dev/community-design-resources/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vite/vite-icon-color-dark.svg"
      >
      Vite
    </div>
    <div v-click class="flex flex-row items-center gap-2 text-[#8ED6FB] font-light">
      <div class="i-devicon-webpack size-5" />
      Webpack
    </div>
    <div v-click class="flex flex-row items-center gap-2 text-[#FA3A1F] font-light">
      <img
        class="size-5"
        src="https://raw.githubusercontent.com/rstackjs/rstack-design-resources/e25f6d56e04bc6ff82dcee6cd1e4c31711b22365/rspack/rspack-logo.svg"
      >
      Rspack
    </div>
    <div v-click class="flex flex-row items-center gap-2 text-[#fde047] font-light">
      <div class="i-devicon-javascript size-5" />
      is-string
    </div>
  </div>

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
      <VisArea
        v-if="$clicks >= 4"
        :data="isString"
        :x="x"
        :y="y"
        :opacity="0.3"
        :line="true"
        color="#fde047"
        line-color="#fde047"
      />
    </VisXYContainer>
  </div>
</template>
