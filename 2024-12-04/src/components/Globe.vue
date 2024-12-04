<script lang="ts" setup>
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import _createGlobe from 'cobe'
import { nextTick, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  color?: [number, number, number]
  markerColor?: [number, number, number]
  rotation?: boolean
  size?: number
  phi?: number
  theta?: number
  speed?: number
  markers?: { location: [number, number], size: number }[]
}>(), {
  color: () => [0, 220, 130] as [number, number, number],
  markerColor: () => [255, 255, 255] as [number, number, number],
  phi: 4,
  theta: 0,
  size: 500,
  speed: 0.003,
  markers: () => [],
  rotation: true,
})

const doublePi = Math.PI * 2
const phi = ref(props.phi)
const theta = ref(props.theta)

const canvas = ref<HTMLCanvasElement | null>(null)

const point = ref<[number, number] | null>(null)

const globe = ref<ReturnType<typeof _createGlobe> | null>(null)

onUnmounted(() => {
  destroyGlobe()
})

onSlideEnter(() => {
  nextTick(createGlobe)
})

onSlideLeave(() => {
  globe.value!.toggle(false) // Stop animation to minimize CPU usage
})

function createGlobe() {
  if (!canvas.value)
    return

  if (globe.value) {
    globe.value!.toggle(true) // Restart animation if it's already created
    return
  }

  globe.value = _createGlobe(canvas.value!, {
    devicePixelRatio: 2,
    width: props.size * 2,
    height: props.size * 2,
    phi: 0,
    theta: theta.value,
    dark: 1,
    diffuse: 0.6,
    mapSamples: 24_000,
    mapBrightness: 2.6,
    mapBaseBrightness: 0,
    baseColor: props.color.map(c => c / 255) as [number, number, number],
    markerColor: props.markerColor.map(c => c / 255) as [number, number, number],
    markers: props.markers,
    glowColor: [15 / 255, 23 / 255, 42 / 255],
    onRender: (state) => {
      state.phi = phi.value
      state.theta = theta.value

      if (props.rotation) {
        phi.value += props.speed
      }

      if (point.value) {
        const [focusPhi, focusTheta] = point.value

        const distPositive = (focusPhi - phi.value + doublePi) % doublePi
        const distNegative = (phi.value - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          phi.value += distPositive * props.speed
        }
        else {
          phi.value -= distNegative * props.speed
        }
        theta.value = theta.value * (1 - props.speed) + focusTheta * props.speed
      }

      state.width = props.size * 2
      state.height = props.size * 2
    },
  })
}

function destroyGlobe() {
  globe.value?.destroy()
}

function focus(lat: number, long: number) {
  const [phi, theta] = locationToAngles(lat, long)

  point.value = [phi, theta]
}

function locationToAngles(lat: number, long: number) {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

defineExpose({ focus })
</script>

<template>
  <canvas ref="canvas" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>
