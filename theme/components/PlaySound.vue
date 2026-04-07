<script lang="ts" setup>
import { useIsSlideActive } from '@slidev/client'
import { onScopeDispose, ref, watch } from 'vue'

const props = defineProps<{
  path: string
}>()

const isActive = useIsSlideActive()
const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

let enterListener: ((event: KeyboardEvent) => void) | null = null

function stopAudio() {
  if (!audio.value)
    return

  if (!isPlaying.value && audio.value.currentTime === 0)
    return

  audio.value.pause()
  audio.value.currentTime = 0
  isPlaying.value = false
}

async function toggleAudio() {
  if (!isActive.value || !audio.value)
    return

  if (isPlaying.value) {
    stopAudio()
    return
  }

  try {
    await audio.value.play()
    isPlaying.value = true
  }
  catch {
    isPlaying.value = false
  }
}

function addEnterListener() {
  if (enterListener || typeof window === 'undefined')
    return

  enterListener = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault()
      void toggleAudio()
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

watch(() => props.path, (path, _, onCleanup) => {
  stopAudio()

  if (typeof Audio === 'undefined' || !path) {
    audio.value = null
    return
  }

  const nextAudio = new Audio(path)
  nextAudio.preload = 'auto'
  nextAudio.onended = () => {
    nextAudio.currentTime = 0
    isPlaying.value = false
  }
  nextAudio.load()

  audio.value = nextAudio

  onCleanup(() => {
    nextAudio.onended = null
    nextAudio.pause()
    nextAudio.currentTime = 0
    if (audio.value === nextAudio)
      audio.value = null

    isPlaying.value = false
  })
}, { immediate: true })

watch(isActive, (active) => {
  if (active)
    addEnterListener()
  else {
    removeEnterListener()
    stopAudio()
  }
}, { immediate: true })

onScopeDispose(() => {
  removeEnterListener()
  stopAudio()
})
</script>

<template>
  <div aria-hidden="true" class="hidden" />
</template>
