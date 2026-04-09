<script lang="ts" setup>
import { onSlideEnter, onSlideLeave, useNav } from '@slidev/client'
import { InaliaQR, useInaliaQuestion } from 'slidev-addon-inalia'
import { computed, ref } from 'vue'

const initialDelay = 8_000
const textRevealDuration = 4_000
const expandDuration = 6_000
const collapseDuration = 1_000
const expandedScale = 2

const isQrExpanded = ref(false)
const isTextVisible = ref(false)

let animationTimeouts: number[] = []
let cycleInterval: number | undefined
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

const { currentSlideRoute } = useNav()
const show = computed(() => (currentSlideRoute.value.meta.slide as any)?.frontmatter?.chooseNextSlide)
const { isStatic, question } = useInaliaQuestion(() => (currentSlideRoute.value.meta.slide as any)?.frontmatter.inalia?.questionId)
</script>

<template>
  <div v-if="show && !isStatic && question">
    <div
      class="absolute left-2 top-2 z-50 flex flex-row items-center origin-top-left transition-transform ease-in-out"
      :style="{ transitionDuration: `${isQrExpanded ? expandDuration : collapseDuration}ms`, transform: `scale(${isQrExpanded ? expandedScale : 1})` }"
    >
      <div
        class="qr overflow-hidden size-12 z-10 relative"
      >
        <InaliaQR :url="question?.tiny_url" />
      </div>

      <div
        class="overflow-hidden transition-[opacity,transform,margin] ease-in-out"
        :class="isTextVisible ? 'ml-2 opacity-100 translate-x-0' : 'ml-0 opacity-0 -translate-x-12 pointer-events-none'"
        :style="{ transitionDuration: `${isTextVisible ? textRevealDuration : collapseDuration}ms` }"
      >
        <div
          class="badge rounded-sm px-2 py-1 flex flex-col text-xs transition-shadow duration-700 ease-in-out"
          :class="isQrExpanded ? 'shadow-xl' : ''"
        >
          <span>Choose the next slide</span>
          <span class="meta">{{ question?.tiny_url }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html[data-theme='default'] {
  .qr {
    --at-apply: rounded-sm;
  }
  .badge {
    --at-apply: bg-white rounded-sm shadow-lg text-neutral-700 text-xs;
  }
  .meta {
    --at-apply: text-neutral-500;
  }
}
</style>
