<script lang="ts" setup>
import { useIsSlideActive } from '@slidev/client'
import { Fireworks as FireworksAnimation, type FireworksOptions } from 'fireworks-js'
import { onMounted, onUnmounted, ref, unref, watch } from 'vue'

const FIREWORKS_OPTIONS = {
  opacity: 0.1,
  acceleration: 1.01,
  friction: 0.95,
  gravity: 0.6,
  particles: 30,
  explosion: 1,
  intensity: 12,
  traceLength: 2,
  traceSpeed: 1,
  flickering: 60,
  autoresize: true,
  hue: {
    min: 0,
    max: 360,
  },
  brightness: {
    min: 100,
    max: 100,
  },
  delay: {
    min: 30,
    max: 60,
  },
  decay: {
    min: 0.02,
    max: 0.04,
  },
  rocketsPoint: {
    min: 35,
    max: 65,
  },
  lineWidth: {
    explosion: {
      min: 4,
      max: 8,
    },
    trace: {
      min: 2,
      max: 4,
    },
  },
  mouse: {
    click: false,
    move: false,
    max: 0,
  },
  sound: {
    enabled: false,
  },
} satisfies FireworksOptions

const isActive = useIsSlideActive()
const container = ref<HTMLElement | null>(null)

let activeFireworks: FireworksAnimation | null = null

function startFireworks() {
  if (typeof window === 'undefined' || activeFireworks || !unref(container))
    return

  activeFireworks = new FireworksAnimation(unref(container)!, FIREWORKS_OPTIONS)
  activeFireworks.start()
}

function stopFireworks() {
  if (!activeFireworks)
    return

  activeFireworks.stop(true)
  activeFireworks = null
}

onMounted(() => {
  if (unref(isActive))
    startFireworks()
})

watch(isActive, (active) => {
  if (active)
    startFireworks()
  else
    stopFireworks()
})

onUnmounted(() => {
  stopFireworks()
})
</script>

<template>
  <div
    ref="container"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
  />
</template>
