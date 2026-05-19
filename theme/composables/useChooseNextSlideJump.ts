import { useTimeoutFn } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useChooseNextSlide } from './useChooseNextSlide'

export function useChooseNextSlideJump() {
  const { canJumpToNextSlideChoice, goToSlideChoice, singleChoiceName } = useChooseNextSlide()

  const nextJumpTo = ref('')
  const hasJumped = ref(false)

  const timeout = useTimeoutFn(() => {
    hasJumped.value = false
  }, 2_000, { immediate: false })

  function jumpToNextSlideChoice() {
    if (!nextJumpTo.value) {
      return
    }

    goToSlideChoice(nextJumpTo.value)
    nextJumpTo.value = ''
    hasJumped.value = true
    timeout.start()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight') {
      return
    }

    if (nextJumpTo.value) {
      jumpToNextSlideChoice()
      return
    }

    if (!canJumpToNextSlideChoice.value || !singleChoiceName.value) {
      return
    }

    nextJumpTo.value = singleChoiceName.value
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)

    handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    hasJumped,
  }
}
