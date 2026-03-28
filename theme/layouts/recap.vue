<script lang="ts" setup>
import { useIsSlideActive } from '@slidev/client'
import { onUnmounted, ref, watch } from 'vue'
import Confetti from '../components/Confetti.vue'
import BackgroundImage from '../components/BackgroundImage.vue'

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
  <div class="h-full grid slidev-layout recap bg-black text-white">
    <BackgroundImage
      img="https://images.unsplash.com/photo-1756741881446-9755957d2d68?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      class="opacity-10 bg-blend-multiply"
    />
    <Confetti ref="confettiRef" />
    <div class="my-auto">
      <slot />
    </div>

    <div class="absolute top-10 right-10 rotate-20 flex flex-col items-center opacity-80 text-yellow-500">
      <div class="i-ph-lightbulb-light size-14" />
      <span>Recap Time</span>
    </div>
  </div>
</template>
