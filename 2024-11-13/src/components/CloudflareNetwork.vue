<script lang="ts" setup>
const locations = [
  {
    flag: '🇩🇪',
    name: 'Frankfurt',
    latency: 34.43,
  },
  {
    flag: '🇳🇱',
    name: 'Amsterdam',
    latency: 35.33,
  },
  {
    flag: '🇬🇧',
    name: 'London',
    latency: 37.72,
  },
  {
    flag: '🇺🇸',
    name: 'New York',
    latency: 58.56,
  },
  {
    flag: '🇺🇸',
    name: 'San Francisco',
    latency: 43.53,
  },
  {
    flag: '🇸🇬',
    name: 'Singapore',
    latency: 38.54,
  },
  {
    flag: '🇦🇺',
    name: 'Sydney',
    latency: 105.74,
  },
  {
    flag: '🇮🇳',
    name: 'Bangalore',
    latency: 56.08,
  },
]
</script>

<template>
  <div class="absolute bottom-0 grid top-0 left-12 right-12 place-content-center grid-cols-2 gap-x-94 gap-y-12">
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

  <div class="absolute text-6xl top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#F37F20]">
    <span class="absolute op-60 blur-md select-none">Cloudflare Network</span>
    <span class="op-80">Cloudflare Network</span>
  </div>

  <CloudflareNetworkGlobe class="relative z-10 mx-auto" />
</template>
