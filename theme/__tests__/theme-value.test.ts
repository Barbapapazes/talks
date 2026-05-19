import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTheme } from '../composables/useTheme'

const { mockSlideContext } = vi.hoisted(() => ({
  mockSlideContext: {
    value: null as {
      $slidev: {
        configs: Record<string, unknown>
      }
    } | null,
  },
}))

vi.mock('@slidev/client', async () => {
  const { reactive } = await import('vue')
  const slideContext = reactive({
    $slidev: reactive({
      configs: reactive<Record<string, unknown>>({}),
    }),
  })

  mockSlideContext.value = slideContext

  return {
    useSlideContext: () => slideContext,
  }
})

describe('useTheme themed values', () => {
  const theme = useTheme()
  const themeValue = useTheme()

  beforeEach(() => {
    theme.clearCurrentTheme()
    for (const key of Object.keys(mockSlideContext.value!.$slidev.configs))
      delete mockSlideContext.value!.$slidev.configs[key]
  })

  it('returns the exact match for the current theme', () => {
    theme.setCurrentTheme('vite')

    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      vite: 'purple',
    })).toBe('purple')
  })

  it('uses the default entry when no theme is selected', () => {
    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      space: 'starlight',
    })).toBe('fallback')
  })

  it('uses configured defaultTheme when no theme is selected', () => {
    mockSlideContext.value!.$slidev.configs.defaultTheme = 'space'

    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      space: 'starlight',
    })).toBe('starlight')
  })

  it('falls back to the default entry when the active theme has no match', () => {
    theme.setCurrentTheme('space')

    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      vite: 'purple',
    })).toBe('fallback')
  })

  it('treats false as an explicit disable for the active theme', () => {
    theme.setCurrentTheme('brutalism')

    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      brutalism: false,
    })).toBeUndefined()
  })
})
