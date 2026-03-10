<script lang="ts" setup>
import { onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { computed, ref } from 'vue'

interface ChoicesProps {
  img?: string
}
const props = defineProps<ChoicesProps>()

const { $frontmatter } = useSlideContext()
const { slides, go } = useNav()

const choices = computed(() => {
  return slides.value.filter(slide => $frontmatter.choices.includes(slide.meta.name))
})

const INITIAL_TIMER = 20_000

const interval = ref<NodeJS.Timeout | null>(null)
const initialTime = ref<number>(0)
const timer = ref<number>(INITIAL_TIMER)

// vibrate control: toggled when timer hits zero and automatically cleared after 3s
const vibrate = ref(false)
let vibrateTimeout: ReturnType<typeof setTimeout> | null = null
onSlideEnter(() => {
  initialTime.value = Date.now()

  interval.value = setInterval(() => {
    const elapsed = Date.now() - initialTime.value
    timer.value = INITIAL_TIMER - elapsed
    if (timer.value <= 0) {
      timer.value = 0
      clearInterval(interval.value!)
      // start vibrate if not already started, and stop after 3s
      if (!vibrate.value) {
        vibrate.value = true
        vibrateTimeout = setTimeout(() => {
          vibrate.value = false
          vibrateTimeout = null
        }, 3000)
      }
    }
  }, 500)
})
onSlideLeave(() => {
  clearInterval(interval.value!)
  // clear any pending vibrate timeout and stop animation immediately
  if (vibrateTimeout) {
    clearTimeout(vibrateTimeout)
    vibrateTimeout = null
  }
  vibrate.value = false
  setTimeout(() => {
    timer.value = INITIAL_TIMER
  }, 300) // Wait for the slide transition to finish before resetting the timer
})
</script>

<template>
  <div class="h-full slidev-layout grid grid-cols-3 gap-4 items-center choices">
    <!-- TODO: create a dedicated component in the theme -->
    <img v-if="props.img" :src="props.img" alt="Presentation Image" class="absolute top-0 left-0 w-full h-full object-cover">

    <!-- TODO: show the Inalia QR code -->
    <!-- TODO: extract to a component -->
    <div class="absolute top-14 right-14 font-bold text-4xl font-mono timer" :class="{ vibrate }">
      {{ timer !== null ? Math.ceil(timer / 1000) : '' }}
    </div>

    <Card v-for="slide in choices" :key="slide.meta.name" class="relative">
      {{ slide.meta.name }}

      <!-- TODO: add a description in each slide's frontmatter and display it here -->
      <button class="absolute inset-0" @click="go(slide.no)" />
    </Card>
  </div>
</template>

<style scoped>
/* small vibration/shake animation for the timer when it hits zero */
.timer {
  will-change: transform;
}
.vibrate {
  /* fast iterations while active; we stop it from JS after 3s */
  animation: vibrate 0.08s linear infinite;
}
@keyframes vibrate {
  0% { transform: translateX(0) translateY(0) rotate(0); }
  20% { transform: translateX(-3px) translateY(-2px) rotate(-0.5deg); }
  40% { transform: translateX(3px) translateY(1px) rotate(0.5deg); }
  60% { transform: translateX(-2px) translateY(-1px) rotate(-0.4deg); }
  80% { transform: translateX(2px) translateY(2px) rotate(0.4deg); }
  100% { transform: translateX(0) translateY(0) rotate(0); }
}
</style>
