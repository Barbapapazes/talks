import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useChooseNextSlide } from '../composables/useChooseNextSlide'

const { mockNavState } = vi.hoisted(() => ({
  mockNavState: {
    value: null as null | {
      clicks: { value: number }
      clicksTotal: { value: number }
      currentSlideRoute: {
        value: {
          meta: {
            slide: {
              frontmatter: Record<string, unknown>
            }
          }
        }
      }
      go: ReturnType<typeof vi.fn>
      slides: { value: Array<{ no: number, meta: { name: string } }> }
    },
  },
}))

vi.mock('@slidev/client', async () => {
  const { ref } = await import('vue')

  const mockNav = {
    clicks: ref(0),
    clicksTotal: ref(0),
    currentSlideRoute: ref({
      meta: {
        slide: {
          frontmatter: {},
        },
      },
    }),
    go: vi.fn(),
    slides: ref([] as Array<{ no: number, meta: { name: string } }>),
  }

  mockNavState.value = mockNav

  return {
    useNav: () => mockNav,
  }
})

describe('useChooseNextSlide', () => {
  beforeEach(() => {
    mockNavState.value!.clicks.value = 0
    mockNavState.value!.clicksTotal.value = 0
    mockNavState.value!.currentSlideRoute.value = {
      meta: {
        slide: {
          frontmatter: {},
        },
      },
    }
    mockNavState.value!.go.mockReset()
    mockNavState.value!.slides.value = []
  })

  it('exposes the current choose-next-slide state from frontmatter', () => {
    mockNavState.value!.currentSlideRoute.value = {
      meta: {
        slide: {
          frontmatter: {
            chooseNextSlide: true,
            inalia: {
              questionId: 'vite-choices',
            },
          },
        },
      },
    }

    const chooseNextSlide = useChooseNextSlide()

    expect(chooseNextSlide.showChooseNextSlide.value).toBe(true)
    expect(chooseNextSlide.questionId.value).toBe('vite-choices')
  })

  it('only enables the automatic jump for a single fully-clicked choice', () => {
    mockNavState.value!.currentSlideRoute.value = {
      meta: {
        slide: {
          frontmatter: {
            choices: ['Virtual Module'],
          },
        },
      },
    }

    const chooseNextSlide = useChooseNextSlide()

    mockNavState.value!.clicks.value = 1
    mockNavState.value!.clicksTotal.value = 2

    expect(chooseNextSlide.canJumpToNextSlideChoice.value).toBe(false)

    mockNavState.value!.clicks.value = 2

    expect(chooseNextSlide.canJumpToNextSlideChoice.value).toBe(true)
    expect(chooseNextSlide.singleChoiceName.value).toBe('Virtual Module')
  })

  it('navigates to the matching slide when asked', () => {
    mockNavState.value!.slides.value = [
      {
        no: 42,
        meta: {
          name: 'Virtual Module',
        },
      },
    ]

    const chooseNextSlide = useChooseNextSlide()

    chooseNextSlide.goToSlideChoice('Virtual Module')

    expect(mockNavState.value!.go).toHaveBeenCalledWith(42)
  })

  it('throws when the target slide does not exist', () => {
    const chooseNextSlide = useChooseNextSlide()

    expect(() => chooseNextSlide.goToSlideChoice('Missing slide')).toThrowError('Target slide "Missing slide" not found')
  })
})
