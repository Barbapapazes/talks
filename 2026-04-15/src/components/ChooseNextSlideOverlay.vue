<script lang="ts" setup>
import { ref } from 'vue'
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { InaliaQR } from 'slidev-addon-inalia'

const url = 'https://example.com'

const initialDelay = 8_000
const textRevealDuration = 4_000
const expandDuration = 6_000
const collapseDuration = 1_000
const expandedScale = 2

const isQrExpanded = ref(false)
const isTextVisible = ref(false)

let animationTimeouts: ReturnType<typeof window.setTimeout>[] = []
let cycleInterval: ReturnType<typeof window.setInterval> | undefined
let cycleCount = 0

function queueTimeout(callback: () => void, delay: number) {
  const timeout = window.setTimeout(callback, delay)
  animationTimeouts.push(timeout)
}

function clearAnimationTimeouts() {
  animationTimeouts.forEach(timeout => window.clearTimeout(timeout))
  animationTimeouts = []
}

function resetAnimationState() {
  isTextVisible.value = false
  isQrExpanded.value = false
}

function scheduleQrAnimation() {
  clearAnimationTimeouts()
  resetAnimationState()

  const shouldExpandThisCycle = cycleCount % 2 === 1
  cycleCount += 1

  queueTimeout(() => {
    isTextVisible.value = true
  }, initialDelay)

  if (shouldExpandThisCycle) {
    queueTimeout(() => {
      isQrExpanded.value = true
    }, initialDelay + textRevealDuration)
  }

  queueTimeout(() => {
    isQrExpanded.value = false
    isTextVisible.value = false
  }, initialDelay + textRevealDuration + expandDuration)
}

onSlideEnter(() => {
  if (cycleInterval)
    window.clearInterval(cycleInterval)

  cycleCount = 0
  scheduleQrAnimation()
  cycleInterval = window.setInterval(scheduleQrAnimation, initialDelay + textRevealDuration + expandDuration + collapseDuration)
})

onSlideLeave(() => {
  clearAnimationTimeouts()
  resetAnimationState()

  if (cycleInterval)
    window.clearInterval(cycleInterval)

  cycleInterval = undefined
  cycleCount = 0
})
</script>

<template>
  <div>
    <!-- <div
      class="pointer-events-none fixed inset-0 z-40 bg-black/45 transition-opacity duration-700 ease-in-out"
      :class="isQrExpanded ? 'opacity-100' : 'opacity-0'"
    /> -->

    <div
      class="absolute left-2 top-2 z-50 flex flex-row items-center text-neutral-700 origin-top-left transition-transform ease-in-out"
      :style="{ transitionDuration: `${isQrExpanded ? expandDuration : collapseDuration}ms`, transform: `scale(${isQrExpanded ? expandedScale : 1})` }"
    >
      <div
        class="rounded-sm overflow-hidden size-12 z-10 relative"
      >
        <InaliaQR :url="url" />
      </div>

      <div
        class="overflow-hidden transition-[opacity,transform,margin] ease-in-out"
        :class="isTextVisible ? 'ml-2 opacity-100 translate-x-0' : 'ml-0 opacity-0 -translate-x-12 pointer-events-none'"
        :style="{ transitionDuration: `${isTextVisible ? textRevealDuration : collapseDuration}ms` }"
      >
        <div
          class="bg-white rounded-sm px-2 py-1 flex flex-col text-xs transition-shadow duration-700 ease-in-out"
          :class="isQrExpanded ? 'shadow-xl' : ''"
        >
          <span>Choose the next slide</span>
          <span>{{ url }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
