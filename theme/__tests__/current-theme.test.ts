import { beforeEach, describe, expect, it } from 'vitest'
import { useCurrentTheme } from '../composables/useCurrentTheme'

describe('useCurrentTheme', () => {
  const firstConsumer = useCurrentTheme()
  const secondConsumer = useCurrentTheme()

  beforeEach(() => {
    firstConsumer.clearCurrentTheme()
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
})
