import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockIsSlideActive, mockSlideContext, mockConfetti } = vi.hoisted(() => ({
  mockIsSlideActive: { ref: null as { value: boolean } | null },
  mockSlideContext: {
    value: null as {
      $frontmatter: Record<string, unknown>
      $clicks: number
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

import { nextTick } from 'vue'
import Confetti from '../components/Confetti.vue'
import { useCurrentTheme } from '../composables/useCurrentTheme'

function flushMicrotasks() {
  return Promise.resolve()
}

describe('confetti', () => {
  beforeEach(() => {
    mockIsSlideActive.ref!.value = false
    mockSlideContext.value!.$clicks = 0
    for (const key of Object.keys(mockSlideContext.value!.$frontmatter))
      delete mockSlideContext.value!.$frontmatter[key]

    useCurrentTheme().clearCurrentTheme()
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

  it('uses theme-specific confetti colors from frontmatter', async () => {
    mockSlideContext.value!.$frontmatter.confettiColors = {
      default: ['#111111', '#222222'],
      vite: ['#6C1EB9', '#FFD700'],
    }

    useCurrentTheme().setCurrentTheme('vite')

    mount(Confetti)

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenNthCalledWith(1, 'recap-confetti', expect.objectContaining({
      colors: ['#6C1EB9', '#FFD700'],
    }))
    expect(mockConfetti).toHaveBeenNthCalledWith(2, 'recap-confetti', expect.objectContaining({
      colors: ['#6C1EB9', '#FFD700'],
    }))
  })

  it('falls back to default confetti colors when the theme is cleared', async () => {
    mockSlideContext.value!.$frontmatter.confettiColors = {
      default: ['#123456', '#abcdef'],
      vite: ['#6C1EB9', '#FFD700'],
    }

    mount(Confetti)

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushMicrotasks()
    await flushMicrotasks()

    expect(mockConfetti).toHaveBeenNthCalledWith(1, 'recap-confetti', expect.objectContaining({
      colors: ['#123456', '#abcdef'],
    }))
  })
})
