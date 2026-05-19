export const slideEnterCallbacks: Array<() => void> = []

export function onSlideEnter(callback: () => void) {
  slideEnterCallbacks.push(callback)
}

export function resetSlideEnterCallbacks() {
  slideEnterCallbacks.length = 0
}
