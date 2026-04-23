import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { nextTick } from 'vue'
import PlaySound from '../components/PlaySound.vue'

const { mockIsSlideActive, mockAudioInstances } = vi.hoisted(() => ({
  mockIsSlideActive: { ref: null as { value: boolean } | null },
  mockAudioInstances: [] as MockAudio[],
}))

vi.mock('@slidev/client', async () => {
  const { ref } = await import('vue')
  const isSlideActive = ref(false)
  mockIsSlideActive.ref = isSlideActive

  return {
    useIsSlideActive: () => isSlideActive,
  }
})

class MockAudio {
  src: string
  preload = ''
  currentTime = 0
  onended: (() => void) | null = null
  play = vi.fn<() => Promise<void>>(() => Promise.resolve())
  pause = vi.fn<() => void>(() => {})
  load = vi.fn<() => void>(() => {})

  constructor(src: string) {
    this.src = src
    mockAudioInstances.push(this)
  }
}

vi.stubGlobal('Audio', MockAudio)

describe('playSound', () => {
  beforeEach(() => {
    mockIsSlideActive.ref!.value = false
    mockAudioInstances.length = 0
    vi.clearAllMocks()
  })

  it('preloads the sound immediately', () => {
    mount(PlaySound, {
      props: {
        path: '/sounds/demo.mp3',
      },
    })

    expect(mockAudioInstances).toHaveLength(1)
    expect(mockAudioInstances[0].src).toBe('/sounds/demo.mp3')
    expect(mockAudioInstances[0].preload).toBe('auto')
    expect(mockAudioInstances[0].load).toHaveBeenCalledTimes(1)
  })

  it('toggles playback with Enter only while the slide is active', async () => {
    mount(PlaySound, {
      props: {
        path: '/sounds/demo.mp3',
      },
    })

    const audio = mockAudioInstances[0]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(audio.play).not.toHaveBeenCalled()

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(audio.play).toHaveBeenCalledTimes(1)

    audio.currentTime = 42
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(audio.pause).toHaveBeenCalledTimes(1)
    expect(audio.currentTime).toBe(0)
  })

  it('stops the sound when the slide becomes inactive', async () => {
    mount(PlaySound, {
      props: {
        path: '/sounds/demo.mp3',
      },
    })

    const audio = mockAudioInstances[0]

    mockIsSlideActive.ref!.value = true
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await Promise.resolve()

    expect(audio.play).toHaveBeenCalledTimes(1)

    audio.currentTime = 13
    mockIsSlideActive.ref!.value = false
    await nextTick()

    expect(audio.pause).toHaveBeenCalledTimes(1)
    expect(audio.currentTime).toBe(0)
  })
})
