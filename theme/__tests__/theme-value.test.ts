import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useCurrentTheme } from '../composables/useCurrentTheme'
import { useThemeValue } from '../composables/useThemeValue'

const { mockSlideContext } = vi.hoisted(() => ({
  mockSlideContext: {
    value: null as {
      $frontmatter: Record<string, unknown>
    } | null,
  },
}))

vi.mock('@slidev/client', async () => {
  const { reactive } = await import('vue')
  const slideContext = reactive({
    $frontmatter: reactive<Record<string, unknown>>({}),
  })

  mockSlideContext.value = slideContext

  return {
    useSlideContext: () => slideContext,
  }
})

describe('useThemeValue', () => {
  const theme = useCurrentTheme()
  const themeValue = useThemeValue()

  beforeEach(() => {
    theme.clearCurrentTheme()
    for (const key of Object.keys(mockSlideContext.value!.$frontmatter))
      delete mockSlideContext.value!.$frontmatter[key]
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

  it('uses frontmatter defaultTheme when no theme is selected', () => {
    mockSlideContext.value!.$frontmatter.defaultTheme = 'space'

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
})
