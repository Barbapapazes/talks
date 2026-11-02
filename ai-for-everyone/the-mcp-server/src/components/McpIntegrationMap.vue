<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $clicks } = useSlideContext()

const apps = [
  { name: 'GitHub', icon: 'i-simple-icons-github' },
  { name: 'Notion', icon: 'i-simple-icons-notion' },
  { name: 'Slack', icon: 'i-simple-icons-slack' },
]
const integrations = [
  { name: 'ChatGPT', icon: 'i-simple-icons-openai' },
  { name: 'Claude', icon: 'i-simple-icons-anthropic' },
  { name: 'Cursor', icon: 'i-simple-icons-cursor' },
]
const colors = ['#238636', '#0284c7', '#d97706']
const protocolColor = '#9333ea'
const rows = [70, 210, 350]
</script>

<template>
  <div
    role="img"
    aria-label="GitHub needs a separate integration for ChatGPT, Claude and Cursor. Notion and Slack must each build the same set of integrations."
    class="relative w-full"
    style="aspect-ratio: 820 / 420"
  >
    <span v-click="5" class="absolute h-0 w-0" aria-hidden="true" />
    <svg viewBox="0 0 820 420" aria-hidden="true" class="absolute inset-0 h-full w-full">
      <g v-for="(integration, index) in integrations" :key="integration.name" v-click="index + 1">
        <path
          :d="`M 210 ${rows[0]} C 370 ${rows[0]}, 450 ${rows[index]}, 610 ${rows[index]}`"
          fill="none"
          :stroke="$clicks >= 5 ? protocolColor : colors[0]"
          class="transition-[stroke] duration-500"
          stroke-width="3"
          stroke-opacity="0.7"
        />
      </g>
      <g v-click="4">
        <g v-for="appIndex in [1, 2]" :key="appIndex">
          <path
            v-for="(integration, index) in integrations"
            :key="integration.name"
            :d="`M 210 ${rows[appIndex]} C 370 ${rows[appIndex]}, 450 ${rows[index]}, 610 ${rows[index]}`"
            fill="none"
            :stroke="$clicks >= 5 ? protocolColor : colors[appIndex]"
            class="transition-[stroke] duration-500"
            stroke-width="3"
            stroke-opacity="0.7"
          />
        </g>
      </g>
    </svg>

    <div
      v-for="(app, index) in apps"
      :key="app.name"
      v-click="index === 0 ? 0 : 4"
      class="map-node absolute left-0 flex items-center gap-4 rounded-xl border-2 bg-white px-6 dark:bg-neutral-900"
      :style="{ top: `${(rows[index] - 42) / 420 * 100}%`, width: '25.61%', height: '20%', borderColor: colors[index] }"
    >
      <span :class="app.icon" class="shrink-0 text-3xl" aria-hidden="true" />
      <span class="text-xl font-semibold">{{ app.name }}</span>
    </div>

    <div
      v-for="(integration, index) in integrations"
      :key="integration.name"
      v-click="index + 1"
      class="map-node absolute right-0 flex items-center gap-4 rounded-xl border-2 border-neutral-300 bg-white px-6 dark:border-neutral-700 dark:bg-neutral-900"
      :style="{ top: `${(rows[index] - 42) / 420 * 100}%`, width: '25.61%', height: '20%' }"
    >
      <span :class="integration.icon" class="shrink-0 text-3xl" aria-hidden="true" />
      <span class="text-xl font-semibold">{{ integration.name }}</span>
    </div>
  </div>
</template>
