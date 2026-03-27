<script lang="ts" setup>
import { confetti } from '@tsparticles/confetti'
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let confettiFn: ((opts: Parameters<typeof confetti>[1]) => Promise<unknown>) | null = null

const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722']

onMounted(async () => {
  if (!canvasRef.value)
    return
  confettiFn = await confetti.create(canvasRef.value, {})
})

onUnmounted(() => {
  confettiFn = null
})

async function fire() {
  if (!confettiFn)
    return

  const shared = {
    colors: COLORS,
    shapes: ['square', 'circle'],
    count: 80,
    startVelocity: 45,
    spread: 55,
    decay: 0.9,
    gravity: 1,
    ticks: 200,
  } as const

  await Promise.all([
    // Left cannon: bottom-left corner, shooting up-right
    confettiFn({ ...shared, angle: 60, position: { x: 0, y: 100 } }),
    // Right cannon: bottom-right corner, shooting up-left
    confettiFn({ ...shared, angle: 120, position: { x: 100, y: 100 } }),
  ])
}

defineExpose({ fire })
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none w-full h-full" />
</template>
