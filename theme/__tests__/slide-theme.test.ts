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

describe('useTheme slide theme state', () => {
  const theme = useTheme()
  const slideTheme = useTheme()

  beforeEach(() => {
    theme.clearCurrentTheme()
    for (const key of Object.keys(mockSlideContext.value!.$slidev.configs))
      delete mockSlideContext.value!.$slidev.configs[key]
  })

  it('uses the default theme when no current theme is selected', () => {
    expect(slideTheme.defaultTheme.value).toBe('default')
    expect(slideTheme.activeTheme.value).toBe('default')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('uses configured defaultTheme when no current theme is selected', () => {
    mockSlideContext.value!.$slidev.configs.defaultTheme = 'space'

    expect(slideTheme.defaultTheme.value).toBe('space')
    expect(slideTheme.activeTheme.value).toBe('space')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('uses the current theme when one is selected', () => {
    mockSlideContext.value!.$slidev.configs.defaultTheme = 'space'
    theme.setCurrentTheme('space')

    expect(slideTheme.activeTheme.value).toBe('space')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('prefers the current theme over configured defaultTheme', () => {
    mockSlideContext.value!.$slidev.configs.defaultTheme = 'space'
    theme.setCurrentTheme('futuristic')

    expect(slideTheme.defaultTheme.value).toBe('space')
    expect(slideTheme.activeTheme.value).toBe('futuristic')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('falls back to the default visual theme for unsupported theme ids', () => {
    theme.setCurrentTheme('mystery-theme')

    expect(slideTheme.activeTheme.value).toBe('mystery-theme')
    expect(slideTheme.visualTheme.value).toBe('default')
  })

  it('supports brutalism as a visual theme', () => {
    theme.setCurrentTheme('brutalism')

    expect(slideTheme.activeTheme.value).toBe('brutalism')
    expect(slideTheme.visualTheme.value).toBe('brutalism')
  })

  it('falls back to default when configured defaultTheme is not defined or empty', () => {
    mockSlideContext.value!.$slidev.configs.defaultTheme = '   '

    expect(slideTheme.defaultTheme.value).toBe('default')
    expect(slideTheme.activeTheme.value).toBe('default')
    expect(slideTheme.visualTheme.value).toBe('default')
  })
})
