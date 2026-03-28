<script lang="ts" setup>
import { confetti, type ConfettiOptions } from '@tsparticles/confetti'
import { onUnmounted } from 'vue'

type ConfettiContainer = NonNullable<Awaited<ReturnType<typeof confetti>>>

const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722']
const CONFETTI_ID = 'recap-confetti'
const FIRE_COOLDOWN_MS = 350
const PARTICLE_COUNT = 200
const PARTICLE_TICKS = 120


let activeContainer: ConfettiContainer | null = null
let cleanupTimer: number | null = null
let lastFireAt = 0

function getCleanupDelayMs(ticks: number) {
  return 8_000 + ticks * 16 // 16ms is the default tick duration in tsParticles, adding some extra time to ensure all particles are cleaned up after they disappear
}

function clearPendingConfetti() {
  if (cleanupTimer !== null) {
    window.clearTimeout(cleanupTimer)
    cleanupTimer = null
  }

  if (activeContainer) {
    activeContainer.destroy()
    activeContainer = null
  }
}

async function fire() {
  const now = Date.now()

  if (now - lastFireAt < FIRE_COOLDOWN_MS)
    return

  lastFireAt = now
  clearPendingConfetti()

  const shared: ConfettiOptions = {
    colors: COLORS,
    shapes: ['square', 'circle'],
    count: PARTICLE_COUNT,
    startVelocity: 45,
    spread: 90,
    decay: 0.96,
    gravity: 1.1,
    scalar: 2.4,
    ticks: PARTICLE_TICKS,
    zIndex: 2000,
    drift: 1.2
    ,
    disableForReducedMotion: true,
  }

  const container = await confetti(CONFETTI_ID, {
    ...shared,
    angle: 60,
    position: { x: 0, y: 100 },
  })

  if (!container)
    return

  activeContainer = container

  await confetti(CONFETTI_ID, {
    ...shared,
    angle: 100,
    position: { x: 100, y: 100 },
  })

  cleanupTimer = window.setTimeout(() => {
    activeContainer?.destroy()
    activeContainer = null
    cleanupTimer = null
  }, getCleanupDelayMs(PARTICLE_TICKS))
}

onUnmounted(() => {
  clearPendingConfetti()
})

defineExpose({ fire })
</script>

<template>
  <div aria-hidden="true" class="hidden" />
</template>
