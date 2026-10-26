import { ref } from 'vue'

export const isSlideActive = ref(true)

export function useIsSlideActive() {
  return isSlideActive
}

export const slideEnterCallbacks: Array<() => void> = []

export function onSlideEnter(callback: () => void) {
  slideEnterCallbacks.push(callback)
}

export function resetSlideEnterCallbacks() {
  slideEnterCallbacks.splice(0)
}
