<script lang="ts" setup>
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { ref, watchEffect } from 'vue'
import Globe from './Globe.vue'

const paris = [48.864716, 2.349014] as [number, number]

const globe = ref<typeof Globe | null>(null)
const showGlobe = ref(false)

watchEffect(() => {
  if (globe.value) {
    globe.value.focus(paris[0], paris[1])
  }
})

onSlideEnter(() => {
  showGlobe.value = true
})

onSlideLeave(() => {
  setTimeout(() => {
    showGlobe.value = false
  }, 200)
})

const locations = [
  {
    flag: '🇩🇪',
    name: 'Frankfurt',
    latency: 176.52,
  },
  {
    flag: '🇳🇱',
    name: 'Amsterdam',
    latency: 107.67,
  },
  {
    flag: '🇬🇧',
    name: 'London',
    latency: 221,
  },
  {
    flag: '🇺🇸',
    name: 'New York',
    latency: 378.88,
  },
  {
    flag: '🇺🇸',
    name: 'San Francisco',
    latency: 553.61,
  },
  {
    flag: '🇸🇬',
    name: 'Singapore',
    latency: 622.71,
  },
  {
    flag: '🇦🇺',
    name: 'Sydney',
    latency: 991.94,
  },
  {
    flag: '🇮🇳',
    name: 'Bangalore',
    latency: 526.79,
  },
]
</script>

<template>
  <div class="absolute bottom-0 top-0 left-12 right-12 place-content-center grid grid-cols-2 gap-x-94 gap-y-12">
    <LatencyCard
      v-for="(location, index) in locations"
      :key="location.name"
      :flag="location.flag"
      :city="location.name"
      :latency="location.latency"
      :style="{
        '--duration': `${24 + (index * Math.random() * 5)}s`,
        '--delay': `${index * 0.1}s`,
        'animation-direction': index % 4 === 0 ? 'alternate-reverse' : 'alternate',
      }"
      class="animate-[weightless_var(--duration)_linear_infinite_var(--delay)]"
    />
  </div>

  <div class="absolute text-6xl top-11 left-1/2 -translate-x-1/2">
    <span class="absolute op-60 blur-md select-none">Origin Server</span>
    <span class="op-80">Origin Server</span>
  </div>

  <Transition name="zoom">
    <Globe v-if="showGlobe" ref="globe" :phi="0" :theta="0" :rotation="false" :speed="0.01" :markers="[{ location: paris, size: 0.1 }]" class="relative z-10 mx-auto" />
  </Transition>
</template>
