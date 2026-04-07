import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockIsSlideActive, mockFireworks, mockStart, mockStop } = vi.hoisted(() => ({
  mockIsSlideActive: { ref: null as { value: boolean } | null },
  mockFireworks: vi.fn(),
  mockStart: vi.fn(),
  mockStop: vi.fn(),
}))

vi.mock('@slidev/client', async () => {
  const { ref } = await import('vue')
  const isSlideActive = ref(false)

  mockIsSlideActive.ref = isSlideActive

  return {
    useIsSlideActive: () => isSlideActive,
  }
})

vi.mock('fireworks-js', () => ({
  Fireworks: mockFireworks,
}))

import { nextTick } from 'vue'
import SlideFireworks from '../components/Fireworks.vue'

describe('fireworks', () => {
  beforeEach(() => {
    mockIsSlideActive.ref!.value = false
    mockStart.mockReset()
    mockStop.mockReset()
    mockFireworks.mockReset()
    mockFireworks.mockImplementation(function MockFireworks() {
      this.start = mockStart
      this.stop = mockStop
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('starts only when the slide becomes active and stops when it becomes inactive', async () => {
    const wrapper = mount(SlideFireworks)

    expect(mockFireworks).not.toHaveBeenCalled()

    mockIsSlideActive.ref!.value = true
    await nextTick()
    await flushPromises()

    expect(mockFireworks).toHaveBeenCalledTimes(1)
    expect(mockStart).toHaveBeenCalledTimes(1)
    expect(mockFireworks).toHaveBeenCalledWith(expect.any(HTMLDivElement), expect.objectContaining({
      intensity: 12,
      delay: {
        min: 30,
        max: 60,
      },
      sound: {
        enabled: false,
      },
    }))

    mockIsSlideActive.ref!.value = false
    await nextTick()

    expect(mockStop).toHaveBeenCalledWith(true)

    wrapper.unmount()
  })

  it('disposes the fireworks when the component unmounts', async () => {
    mockIsSlideActive.ref!.value = true

    const wrapper = mount(SlideFireworks)
    await flushPromises()

    expect(mockStart).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    expect(mockStop).toHaveBeenCalledWith(true)
  })
})
