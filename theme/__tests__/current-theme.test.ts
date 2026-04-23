import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '../composables/useTheme'

vi.mock('@slidev/client', () => ({
  useSlideContext: () => ({
    $slidev: {
      configs: {},
    },
  }),
}))

describe('useTheme current theme state', () => {
  const firstConsumer = useTheme()
  const secondConsumer = useTheme()

  beforeEach(() => {
    firstConsumer.clearCurrentTheme()
    firstConsumer.unblockThemeSelection()
    document.documentElement.removeAttribute('data-theme')
  })

  it('shares the current theme across consumers', () => {
    firstConsumer.setCurrentTheme('vite-core')

    expect(firstConsumer.currentTheme.value).toBe('vite-core')
    expect(secondConsumer.currentTheme.value).toBe('vite-core')
  })

  it('normalizes empty values when clearing the theme', () => {
    firstConsumer.setCurrentTheme('   ')

    expect(firstConsumer.currentTheme.value).toBeUndefined()
  })

  it('can temporarily force the default theme and then restore the selected one', () => {
    firstConsumer.setCurrentTheme('brutalism')

    expect(firstConsumer.activeTheme.value).toBe('brutalism')

    firstConsumer.blockThemeSelection()
    firstConsumer.syncThemeDocument()

    expect(firstConsumer.isThemeSelectionBlocked.value).toBe(true)
    expect(firstConsumer.activeTheme.value).toBe('default')
    expect(document.documentElement.getAttribute('data-theme')).toBe('default')

    firstConsumer.unblockThemeSelection()
    firstConsumer.syncThemeDocument()

    expect(firstConsumer.isThemeSelectionBlocked.value).toBe(false)
    expect(firstConsumer.activeTheme.value).toBe('brutalism')
    expect(document.documentElement.getAttribute('data-theme')).toBe('brutalism')
  })
})
