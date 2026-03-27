<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let lastFireTime = 0
const FIRE_COOLDOWN_MS = 300

const COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#4caf50',
  '#ffeb3b',
  '#ff9800',
  '#ff5722',
]

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  width: number
  height: number
  color: string
  angle: number
  angularVelocity: number
  opacity: number
}

function createParticle(x: number, y: number, angle: number): Particle {
  const speed = 12 + Math.random() * 10
  const spread = (Math.random() - 0.5) * 60
  const radians = ((angle + spread) * Math.PI) / 180
  return {
    x,
    y,
    vx: Math.cos(radians) * speed,
    vy: -Math.sin(radians) * speed,
    width: 8 + Math.random() * 6,
    height: 4 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * 360,
    angularVelocity: (Math.random() - 0.5) * 10,
    opacity: 1,
  }
}

function fire() {
  const now = Date.now()
  if (now - lastFireTime < FIRE_COOLDOWN_MS)
    return
  lastFireTime = now

  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  // Only resize when dimensions actually changed to avoid unnecessary clears
  if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  const particles: Particle[] = []
  const count = 80

  // Left cannon: bottom-left corner, shooting up-right (~70 degrees from horizontal)
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(0, canvas.height, 70))
  }
  // Right cannon: bottom-right corner, shooting up-left (~110 degrees from horizontal)
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(canvas.width, canvas.height, 110))
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  function animate() {
    if (!canvas || !ctx)
      return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let alive = 0

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.4 // gravity
      p.vx *= 0.99 // air resistance
      p.angle += p.angularVelocity
      p.opacity -= 0.012

      if (p.opacity <= 0)
        continue

      alive++

      ctx.save()
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.translate(p.x, p.y)
      ctx.rotate((p.angle * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height)
      ctx.restore()
    }

    if (alive > 0) {
      animationFrameId = requestAnimationFrame(animate)
    }
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animationFrameId = null
    }
  }

  animate()
}

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
})

defineExpose({ fire })
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none w-full h-full" />
</template>
