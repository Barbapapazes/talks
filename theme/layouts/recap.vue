<script lang="ts" setup>
import { useIsSlideActive } from '@slidev/client'
import { onUnmounted, ref, watch } from 'vue'
import Confetti from '../components/Confetti.vue'

const isActive = useIsSlideActive()
const confettiRef = ref<InstanceType<typeof Confetti> | null>(null)

let spaceListener: ((e: KeyboardEvent) => void) | null = null

function addSpaceListener() {
  if (spaceListener)
    return
  spaceListener = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      confettiRef.value?.fire()
    }
  }
  window.addEventListener('keydown', spaceListener)
}

function removeSpaceListener() {
  if (spaceListener) {
    window.removeEventListener('keydown', spaceListener)
    spaceListener = null
  }
}

watch(isActive, (active) => {
  if (active) {
    addSpaceListener()
  }
  else {
    removeSpaceListener()
  }
}, { immediate: true })

onUnmounted(() => {
  removeSpaceListener()
})
</script>

<template>
  <div class="h-full grid slidev-layout recap">
    <Confetti ref="confettiRef" />
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
