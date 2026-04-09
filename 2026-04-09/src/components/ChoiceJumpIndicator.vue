<script lang="ts" setup>
import { useNav } from '@slidev/client'
import { useTimeoutFn } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface SlideWithChoices {
  frontmatter?: {
    choices?: string[]
  }
}

const { currentSlideRoute, slides, go, clicks, clicksTotal } = useNav()

const nextJumpTo = ref('')
const hasJumped = ref(false)
const timeout = useTimeoutFn(() => {
  hasJumped.value = false
}, 2_000, { immediate: false })

const currentSlide = computed(() => {
  return currentSlideRoute.value?.meta.slide as SlideWithChoices | undefined
})

const shouldJump = computed(() => {
  if (!currentSlide.value?.frontmatter) {
    return false
  }

  return currentSlide.value.frontmatter.choices?.length === 1
})

function jumpToChoice() {
  // Use the stored nextJumpTo value instead of reading from the current slide's frontmatter,
  // to ensure we jump to the intended choice even if the user has already moved to the next slide.
  const target = slides.value.find(slide => slide.meta.name === nextJumpTo.value)

  if (!target) {
    throw new Error(`Target slide "${nextJumpTo.value}" not found`)
  }

  go(target.no)
  nextJumpTo.value = ''
  hasJumped.value = true
  timeout.start()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight') {
    return
  }

  if (nextJumpTo.value) {
    jumpToChoice()
    return
  }

  if (!shouldJump.value) {
    return
  }

  // Only set the next jump on the latest click to trigger the jump on the next keydown,
  // when going to the next slide.
  if (clicks.value === clicksTotal.value) {
    nextJumpTo.value = currentSlide.value!.frontmatter!.choices![0]
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  // In case the user is already on a slide with a single choice and presses the right arrow key,
  // we want to jump to the next slide immediately.
  handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="absolute z-100 bottom-2 right-2 rounded-full border border-neutral-200 p-1 transition duration-300"
    :class="{
      'opacity-100': hasJumped,
      'opacity-0': !hasJumped,
    }"
  >
    <div class="i-ph-flow-arrow-light size-4 text-neutral-400" />
  </div>
</template>
