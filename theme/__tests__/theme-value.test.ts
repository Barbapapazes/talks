import { beforeEach, describe, expect, it } from 'vitest'
import { useCurrentTheme } from '../composables/useCurrentTheme'
import { useThemeValue } from '../composables/useThemeValue'

describe('useThemeValue', () => {
  const theme = useCurrentTheme()
  const themeValue = useThemeValue()

  beforeEach(() => {
    theme.clearCurrentTheme()
  })

  it('returns the exact match for the current theme', () => {
    theme.setCurrentTheme('vite')

    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      vite: 'purple',
    })).toBe('purple')
  })

  it('falls back to default when the theme is cleared', () => {
    expect(themeValue.resolveThemeValue({
      default: 'fallback',
      vite: 'purple',
    })).toBe('fallback')
  })
})
