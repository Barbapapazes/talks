<script setup lang="ts">
import type { Map as LeafletMap } from 'leaflet'
import { onMounted, onUnmounted, ref } from 'vue'
import talk from '../package.json'
import 'leaflet/dist/leaflet.css'

const { latitude, longitude } = talk.event.location
const pubLocation: [number, number] = [latitude, longitude]
const container = ref<HTMLElement | null>(null)
const unavailable = ref(typeof navigator !== 'undefined' && !navigator.onLine)
let map: LeafletMap | undefined

onMounted(async () => {
  if (!container.value || unavailable.value)
    return

  try {
    const L = await import('leaflet')
    if (!container.value)
      return

    map = L.map(container.value, { scrollWheelZoom: false }).setView(pubLocation, 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 18,
    }).on('tileerror', () => {
      unavailable.value = true
      map?.remove()
      map = undefined
    }).addTo(map)
    L.circleMarker(pubLocation, {
      radius: 8,
      color: '#be123c',
      fillColor: '#fb7185',
      fillOpacity: 1,
    }).bindPopup('Hackathon pub · Prague').addTo(map)
    requestAnimationFrame(() => map?.invalidateSize())
  }
  catch {
    unavailable.value = true
  }
})

onUnmounted(() => map?.remove())
</script>

<template>
  <section class="overflow-hidden rounded-xl border border-slate-200 bg-slate-100" aria-label="Interactive map of the hackathon pub in Prague">
    <div v-show="!unavailable" ref="container" class="w-full" style="height: 180px" />
    <div v-if="unavailable" class="h-44 flex flex-col items-center justify-center gap-2 text-center text-slate-600">
      <div class="i-lucide-map-pin size-9" aria-hidden="true" />
      <span>Hackathon pub in Prague · Map tiles unavailable offline</span>
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>
    </div>
    <div class="px-3 py-1.5 text-xs text-slate-600">
      <slot />
    </div>
  </section>
</template>
