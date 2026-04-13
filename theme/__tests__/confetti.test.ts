import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { nextTick } from 'vue'
import Confetti from '../components/Confetti.vue'
import { useTheme } from '../composables/useTheme'

const { mockIsSlideActive, mockSlideContext, mockConfetti } = vi.hoisted(() => ({
  mockIsSlideActive: { ref: null as { value: boolean } | null },
  mockSlideContext: {
    value: null as {
      $frontmatter: Record<string, unknown>
      $clicks: number
      $slidev: {
        configs: Record<string, unknown>
      }
    } | null,
  },
  mockConfetti: vi.fn(),
}))

vi.mock('@slidev/client', async () => {
  const { reactive, ref } = await import('vue')
  const isSlideActive = ref(false)
  const slideContext = reactive({
    $frontmatter: reactive<Record<string, unknown>>({}),
    $clicks: 0,
    $slidev: reactive({
      configs: reactive<Record<string, unknown>>({}),
    }),
  })

  mockIsSlideActive.ref = isSlideActive
  mockSlideContext.value = slideContext

  return {
    useIsSlideActive: () => isSlideActive,
    useSlideContext: () => slideContext,
  }
})

vi.mock('@tsparticles/confetti', () => ({
  confetti: mockConfetti,
}))

function flushMicrotasks() {
  return Promise.resolve()
}

describe('confetti', () => {
  beforeEach(() => {
    mockIsSlideActive.ref!.value = false
    mockSlideContext.value!.$clicks = 0
    for (const key of Object.keys(mockSlideContext.value!.$frontmatter))
      delete mockSlideContext.value!.$frontmatter[key]
    for (const key of Object.keys(mockSlideContext.value!.$slidev.configs))
      delete mockSlideContext.value!.$slidev.configs[key]

    useTheme().clearCurrentTheme()
    mockConfetti.mockReset()
    mockConfetti.mockResolvedValue({ destroy: vi.fn() })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('fires only when the slide is active', async () => {
    mount(Confetti)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()

    expect(mockConfetti).not.toHaveBeenCalled()

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenCalledTimes(2)
  })

  it('fires automatically when active clicks reach the configured threshold', async () => {
    mount(Confetti)

    mockSlideContext.value!.$frontmatter.confettiClicks = 2
    mockSlideContext.value!.$clicks = 2
    await nextTick()

    expect(mockConfetti).not.toHaveBeenCalled()

    mockIsSlideActive.ref!.value = true
    await nextTick()
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenCalledTimes(2)

    mockSlideContext.value!.$clicks = 3
    await nextTick()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenCalledTimes(2)
  })

  it('uses the current theme confetti palette', async () => {
    useTheme().setCurrentTheme('flowers')

    mount(Confetti)

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenNthCalledWith(1, 'recap-confetti', expect.objectContaining({
      colors: ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722'],
    }))
    expect(mockConfetti).toHaveBeenNthCalledWith(2, 'recap-confetti', expect.objectContaining({
      colors: ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722'],
    }))
  })

  it('uses the default theme palette when no current theme is selected', async () => {
    mount(Confetti)

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenNthCalledWith(1, 'recap-confetti', expect.objectContaining({
      colors: ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ffeb3b', '#ff9800', '#ff5722'],
    }))
  })
})
