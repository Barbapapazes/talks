<script lang="ts" setup>
import type { ConfettiOptions } from '@tsparticles/confetti'
import type { SupportedSlideTheme } from '../composables/useSlideTheme'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { confetti } from '@tsparticles/confetti'
import { computed, onUnmounted, unref, watch } from 'vue'
import { useSlideTheme } from '../composables/useSlideTheme'

type ConfettiContainer = NonNullable<Awaited<ReturnType<typeof confetti>>>

const DEFAULT_COLORS = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722']
const THEME_CONFETTI_COLORS: Record<SupportedSlideTheme, string[]> = {
  default: DEFAULT_COLORS,
  brutalism: ['#0f0f0f', '#f5f5f4', '#facc15', '#ef4444'],
  futuristic: ['#22d3ee', '#818cf8', '#f472b6', '#34d399'],
}
const CONFETTI_ID = 'recap-confetti'
const FIRE_COOLDOWN_MS = 350
const PARTICLE_COUNT = 200
const PARTICLE_TICKS = 120

const isActive = useIsSlideActive()
const slideContext = useSlideContext()
const { visualTheme } = useSlideTheme()
const autoFireClicks = computed(() => resolveAutoFireClicks(unref(slideContext.$frontmatter)?.confettiClicks))
const confettiColors = computed(() => THEME_CONFETTI_COLORS[visualTheme.value] ?? DEFAULT_COLORS)

let activeContainer: ConfettiContainer | null = null
let cleanupTimer: number | null = null
let lastFireAt = 0
let lastAutoFireClicks: number | null = null
let enterListener: ((event: KeyboardEvent) => void) | null = null

function resolveAutoFireClicks(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 1)
    return Math.floor(value)

  if (typeof value !== 'string')
    return null

  const normalizedValue = value.trim()

  if (!normalizedValue)
    return null

  const parsedValue = Number(normalizedValue)

  if (!Number.isFinite(parsedValue) || parsedValue < 1)
    return null

  return Math.floor(parsedValue)
}

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

function addEnterListener() {
  if (enterListener || typeof window === 'undefined')
    return

  enterListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      void fire()
    }
  }

  window.addEventListener('keydown', enterListener)
}

function removeEnterListener() {
  if (!enterListener || typeof window === 'undefined')
    return

  window.removeEventListener('keydown', enterListener)
  enterListener = null
}

async function fire() {
  const now = Date.now()

  if (now - lastFireAt < FIRE_COOLDOWN_MS)
    return

  lastFireAt = now
  clearPendingConfetti()

  const shared: ConfettiOptions = {
    colors: confettiColors.value,
    shapes: ['square', 'circle'],
    count: PARTICLE_COUNT,
    startVelocity: 45,
    spread: 90,
    decay: 0.96,
    gravity: 1.1,
    scalar: 2.4,
    ticks: PARTICLE_TICKS,
    zIndex: 2000,
    drift: 1.2,
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

watch(isActive, (active) => {
  if (active) {
    addEnterListener()
  }
  else {
    removeEnterListener()
    lastAutoFireClicks = null
  }
}, { immediate: true })

watch([
  isActive,
  () => unref(slideContext.$clicks),
  autoFireClicks,
], ([active, clicks, threshold]) => {
  if (!active || threshold === null) {
    lastAutoFireClicks = null
    return
  }

  if (clicks < threshold) {
    if (lastAutoFireClicks === threshold)
      lastAutoFireClicks = null

    return
  }

  if (lastAutoFireClicks === threshold)
    return

  lastAutoFireClicks = threshold
  void fire()
}, { immediate: true })

onUnmounted(() => {
  removeEnterListener()
  clearPendingConfetti()
})
</script>

<template>
  <div aria-hidden="true" class="hidden" />
</template>
